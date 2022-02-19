import React, { useState, useContext, useEffect} from 'react';

import {ticketPago} from '../api'
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';
import {EgresoContext} from '../egresos/EgresoContext'
import { ProductorContext } from '../productors/ProductorContext'
export default function PagarDialog({ubicacion, isOpen, close, showMessage, fecha}) {
    const {cuentasPorPagar, addEgreso, editEgreso} = useContext(EgresoContext)
    const {productors} = useContext(ProductorContext)
    const [productoresConSaldo, setProductoresSaldo] = useState([])
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const classes = useStyles()
    const [pago, setPago] = useState({
        fecha: moment().format("YYYY-MM-DD"),
        ubicacion: ubicacion,
        provedor: '',
        tipoPago: 'EFECTIVO',
        importe: 0,
        referencia: '',
        cuentasSeleccionadas: []
    })
    const [guardando, setGuardando] = useState(false)

    useEffect(()=>{
        let conSaldo = []
        productors.forEach(productor => {
          if(cuentasPorPagar.filter(cuenta => cuenta.compra.provedor._id === productor._id).reduce((acc, cta) => acc += cta.saldo, 0) > 0 ){
            conSaldo.push({...productor, cuentas: cuentasPorPagar.filter(cta => cta.compra.provedor._id === productor._id), saldo: cuentasPorPagar.filter(cuenta => cuenta.compra.provedor._id === productor._id).reduce((acc, cta) => acc += cta.saldo, 0) })
          }
        });
        setProductoresSaldo(conSaldo)
      },[productors, cuentasPorPagar])

    const handleChange = (type, value) => {
        switch(type){
            case 'importe':             
                if(value > pago.provedor.saldo){
                    showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                    setPago({...pago, importe: pago.provedor.saldo})
                    return false
                }else{
                    return setPago({...pago, [type]: value})    
                }

            default:
                return setPago({...pago, [type]: value})
        }        
    }

    const handleClose = (dialog) => {
        setPago({...pago, cuenta: '', importe: '', referencia: ''})
        close(dialog)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        let i = 0
        let cuentas = pago.provedor.cuentas
        let importeDePago = pago.importe

        while(importeDePago > 0){
            let saldo = cuentas[i].saldo
            if(saldo>=importeDePago){ 
                addEgreso({
                  tipo: 'PAGO',
                  concepto: "PAGO",
                  descripcion: "PAGO A: " + cuentas[i].concepto + " #"+ cuentas[i].compra.folio,
                  fecha: fecha,
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
        }
        
        // addPagoCxp(pago).then(res =>{
        //     setGuardando(false)
        //     showMessage(res.message, res.status)
        //     setPago({
        //         provedor: '',
        //         cuenta: '',
        //         tipoPago: 'EFECTIVO',
        //         importe: '',
        //     })
        //     ticketPago(pago).then(res => {
        //         if(res.status === 'warning'){
        //             showMessage(res.message, res.status)
        //         }
        //     })
        //     close('pagarDialog')
        // })
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={isOpen} 
            onClose={() => handleClose('pagarDialog')} >
                {
                    cuentasPorPagar.length > 0 &&
                    <form onSubmit={handleSubmit}>
                
                    <DialogTitle id="form-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Nuevo Pago en:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="flex-end">
                                <Typography variant="h6" >{ubicacion.nombre}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    </DialogTitle>
                    {
                        guardando === true ?
                            <Zoom in={guardando}>
                                <Typography variant="h5" align="center">Guardando...</Typography>
                            </Zoom>
                            :
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            id="provedor"
                                            variant="outlined"
                                            autoFocus
                                            required
                                            fullWidth
                                            label="Selecciona una Proveedor"
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
                                    {
                                    pago.provedor !== '' ?
                                        <Grid item xs={12}>
                                            <TextField
                                                id="cuenta"
                                                label="Selecciona una cuenta"
                                                select
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={pago.cuenta}
                                                onChange={(e) => handleChange('cuenta', e.target.value)}
                                            >
                                                {
                                                    pago.provedor.cuentas.map((cta,index)=>(
                                                        <MenuItem key={index} value={cta}>
                                                            <Grid container>
                                                                <Grid item xs={6}>
                                                    <Typography>{cta.concepto} {cta.compra.folio}:{cta.compra.clave}</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography align="right">{formatNumber(cta.saldo)}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        </Grid>
                                    : null
                                }
                                    <Grid item xs={6}>
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
            
            
            
                                        <Grid item xs={6}>
                                            <TextField 
                                                disabled={pago.compra !== null ? false : true}
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
                                        {pago.tipoPago !== 'EFECTIVO' &&
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
                                        }
            
                                </Grid>
            
                                
                            </DialogContent>
                    }
                    <DialogActions>
                        <Button className={classes.botonSimplon} onClick={() => handleClose('pagarDialog')}>
                            Cancel
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" disabled={pago.importe === 0 || guardando === true ? true : false}>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
                }

        </Dialog>
        
    );
}
