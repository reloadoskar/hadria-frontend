import React, { useEffect, useState, useContext } from 'react';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom, Chip, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';
// import { ticketPago } from '../api'
import { formatNumber, sumSaldo } from '../Tools'

import moment from 'moment'
import useStyles from '../hooks/useStyles'

import CuentaPorPagar from '../cxp/CuentaPorPagar';

import {EgresoContext} from '../egresos/EgresoContext'
import { ProductorContext } from '../productors/ProductorContext'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import { CuentasPorPagarContext } from '../cxp/CuentasPorPagarContext';
const init = {
  fecha: moment().format("YYYY-MM-DD"),
  ubicacion: '',
  provedor: '',
  tipoPago: 'EFECTIVO',
  importe: 0,
  referencia: '',
  cuentasSeleccionadas: []
}
export default function Pagar({ open, close }) {
  const {cuentasPorPagar, addEgreso, editEgreso} = useContext(EgresoContext)
  const {cargarCuentas, cuentasProductor} = useContext(CuentasPorPagarContext)
  const {productors} = useContext(ProductorContext)
  const {ubicacions} = useContext(UbicacionContext)
  const classes = useStyles()
  
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

  const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
  const [pago, setPago] = useState(init)
  const [productoresConSaldo, setProductoresSaldo] = useState([])
  const [saldoProductor, setSaldoProductor] = useState(0)
  const [pagando, setPagando] = useState(false)

  useEffect(()=>{
    let conSaldo = []
    productors.forEach(productor => {
      if(cuentasPorPagar.filter(cuenta => cuenta.compra.provedor._id === productor._id).reduce((acc, cta) => acc += cta.saldo, 0) > 0 ){
        conSaldo.push({...productor, cuentas: cuentasPorPagar.filter(cta => cta.compra.provedor._id === productor._id), saldo: cuentasPorPagar.filter(cuenta => cuenta.compra.provedor._id === productor._id).reduce((acc, cta) => acc += cta.saldo, 0) })
      }
    });
    setProductoresSaldo(conSaldo)
  },[productors, cuentasPorPagar])

  useEffect(()=>{
    setSaldoProductor(sumSaldo(cuentasProductor))
  },[cuentasProductor])

  const handleChange = (type, value) => {
    switch (type) {
      case 'importe':
        if (value > pago.provedor.saldo) {
          showMessage("El importe es mayor al saldo de la cuenta.", "warning")
          return setPago({ ...pago, importe: pago.provedor.saldo,  })
        } else {
          return setPago({ ...pago, importe: value })
        }
      case 'provedor':
        cargarCuentas(value.cuentas)
        return setPago({ ...pago, provedor: value, })
      default:
        setPago({ ...pago, [type]: value })
    }
  }

  const handleClose = (dialog) => {
    setPago(init)
    close(dialog)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPagando(true)
    let i = 0
    let cuentas = cuentasProductor
    let importeDePago = pago.importe

    while(importeDePago > 0){
      let saldo = cuentas[i].saldo
      if(saldo>=importeDePago){ 
        addEgreso({
          tipo: 'PAGO',
          concepto: "PAGO",
          descripcion: "PAGO A: " + cuentas[i].concepto + " #"+ cuentas[i].compra.folio,
          fecha: pago.fecha,
          ubicacion: pago.ubicacion,
          importe: importeDePago,
          compra: cuentas[i].compra._id,
          saldo: 0,
        }).then(res=>{
          showMessage(res.message, res.status)
        })
        cuentas[i].saldo-=importeDePago
        editEgreso(cuentas[i]).then(res=>{
          showMessage(res.message, 'info')
        })
        importeDePago=0; 
      }else{
        importeDePago-=cuentas[i].saldo;
        cuentas[i].saldo=0;

        addEgreso({
          tipo: 'PAGO',
          concepto: "PAGO",
          descripcion: "PAGO A: " + cuentas[i].concepto + " #"+ cuentas[i].compra.folio,
          fecha: pago.fecha,
          ubicacion: pago.ubicacion,
          importe: saldo,
          compra: cuentas[i].compra._id,
          saldo: 0,
        }).then(res=>{
          showMessage(res.message, res.status)
        })
        editEgreso(cuentas[i]).then(res=>{
          showMessage(res.message, 'info')
        })

      }
      i++
    }
    setPago(init)
    setPagando(false)
    close('pagarDialog')
    // addPagoCxp(pago).then(res => {
    //   showMessage(res.message, res.status)
    //   ticketPago(pago).then(res => {
    //     if (res.status === 'warning') {
    //       showMessage(res.message, res.status)
    //     }
    //   })
    // })
  }

  return (

    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={() => handleClose('pagarDialog')} >

      <React.Fragment>
        <form onSubmit={handleSubmit}>

          <DialogTitle id="form-dialog-title">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" >Pagar</Typography>
              </Grid>
            </Grid>
          </DialogTitle>

          {pagando === true ?
            <Zoom in={pagando}>
              <DialogContent>
                <Typography variant="h5" align="center">Pagando...</Typography>
              </DialogContent>
            </Zoom>
            :
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="provedor"
                    select
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    label="Selecciona un Produtor"
                    value={pago.provedor}
                    onChange={(e) => handleChange('provedor', e.target.value)}
                  >
                    {productoresConSaldo.map((productor, i) => (
                      <MenuItem key={i} value={productor}>
                        <Grid container alignItems='center'>
                          <Grid item xs={6}>
                            <Typography>{productor.nombre}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" className={classes.textoMiniFacheron}>saldo:</Typography>
                            <Typography align='right'>${formatNumber(productor.saldo, 1)}</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}                  
                  </TextField>
                </Grid>
                { pago.provedor !== '' ?
                  <React.Fragment>
                    <Grid item xs={12}>                      
                          {cuentasProductor.map((cta, i) => (
                            <CuentaPorPagar cuenta={cta} diasDeCredito={pago.provedor.diasDeCredito} index={i} />
                          ))}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="ubicacion"
                        select
                        variant="outlined"
                        required
                        fullWidth
                        label="Pagar desde:"
                        value={pago.ubicacion}
                        onChange={(e) => handleChange('ubicacion', e.target.value)}
                      >
                        {ubicacions.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="fecha"
                        type="date"
                        label="fecha"
                        fullWidth
                        value={pago.fecha}
                        onChange={(e) => handleChange('fecha', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="tipoPago"
                        select
                        variant="outlined"
                        required
                        fullWidth
                        label="Tipo de pago"
                        value={pago.tipoPago}
                        onChange={(e) => handleChange('tipoPago', e.target.value)}
                      >
                        {tipos.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="importe"
                        variant="outlined"
                        label="Importe"
                        required
                        fullWidth
                        type="number"
                        value={pago.importe}
                        onChange={(e) => handleChange('importe', e.target.value)}
                      />
                    </Grid>

                    {pago.tipoPago !== 'EFECTIVO' ?
                      <Grid item xs={12}>
                        <TextField
                          id="referencia"
                          label="referencia"
                          variant="outlined"
                          required
                          fullWidth
                          value={pago.referencia}
                          onChange={(e) => handleChange('referencia', e.target.value)}
                        />
                      </Grid>
                    : null
                    }
                  </React.Fragment>
                  : null
                }
              </Grid>
            </DialogContent>
          }
          <DialogActions>
            <Button className={classes.botonSimplon} onClick={() => handleClose('pagarDialog')} >
              Cancel
            </Button>
            <Button className={classes.botonGenerico} type="submit" disabled={pago.importe > 0 && pagando === false ? false : true}>
              Registrar
            </Button>
          </DialogActions>

        </form>
      </React.Fragment>
    </Dialog>

  );
}
