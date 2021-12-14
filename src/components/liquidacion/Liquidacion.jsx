import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, Grid, Typography, CircularProgress, Divider, Paper, TextField, Box, IconButton, Container, DialogActions, Button } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { formatNumber, sumImporte, agrupaItems, sumCantidad, sumEmpaques } from '../Tools'
import useEmpresa from '../config/useEmpresa'
import useStyles from '../hooks/useStyles'
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import RestoreIcon from '@material-ui/icons/Restore';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ItemEditable from './ItemEditable'
import GastoEditable from './GastoEditable'
export default function Liquidacion({ open, close, items, ventas, compra }) {
  const Empresa = useEmpresa()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const [empresa, setEmpresa] = useState(null)
  const [laCompra, setLaCompra] = useState(null)

  const [losItems, setLosItems] = useState(null)
  const [lasVentas, setLasVentas] = useState(null)
  const [losGastos, setLosGastos] = useState([])
  const [losPagos, setLosPagos] = useState([])

  const [tVentas, setTventas] = useState(0)
  const [tPagos, setTpagos] = useState(0)
  const [tGastos, setTgastos] = useState(0)

  const [descom, setDescom] = useState(false)
  const [comProd, setComProd] = useState(10)
  const [comision, setComision] = useState(0)
  const [desgas, setDesgas] = useState(false)
  const [despag, setDespag] = useState(false)
  const [saldo, setSaldo] = useState()

  const isMobile = useMediaQuery('(max-width: 720px)')
  const [editMode, setEditMode] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    Empresa.get().then(res => {
      setEmpresa(res.empresa)
    })
    return () => {
      setEmpresa(null)
    }
  }, [])

  useEffect(() => {
    if (compra) {
      setLaCompra(compra)
    }
    return () => setLaCompra(null)
  }, [compra])

  useEffect(() => {
    if (laCompra) {
      let grupo = agrupaItems(laCompra.items, "producto")
      grupo.forEach(item => {
        item.importe = sumImporte(laCompra.ventaItems.filter(vnta => vnta.producto._id === item.id))
        item.precio = item.importe / (item.cantidad - item.stock)
      });
      setLosItems(grupo)
      setLasVentas(laCompra.ventaItems)
      setTventas(sumImporte(laCompra.ventaItems))
      setLosPagos(laCompra.pagos)
      setLosGastos(laCompra.gastos)
      setComProd(laCompra.provedor.comision)
    }
    return () => {
      limpiarLiquidacion()
    }
  }, [laCompra])

  useEffect(() => {
    if (descom) {
      let com = (tVentas * comProd) / 100
      setComision(com)
    }
    return () => setComision(0)
  }, [descom, tVentas, comProd])

  useEffect(() => {
    if (despag) {
      setTpagos(sumImporte(losPagos))
    }
    return () => setTpagos(0)
  }, [despag, losPagos])

  useEffect(() => {
    if (desgas) {
      setTgastos(sumImporte(losGastos))
    }
    return () => setTgastos(0)
  }, [desgas, losGastos])

  useEffect(() => {
    let saldo = tVentas - comision - tGastos - tPagos
    setSaldo(saldo)
    return () => {
      setSaldo(0)
    }
  }, [comision, tVentas, tGastos, tPagos])

  const handleClose = () => close()
  const sumarTotalItems = () => setTventas(sumImporte(losItems))
  const sumarTotalGastos = () => setTgastos(sumImporte(losGastos))
  const sumarTotalPagos = () => setTpagos(sumImporte(losPagos))
  const aplicar = () => {
    sumarTotalItems()
    setEditMode(false)
  }

  const cancelar = () => {
    setComision(0)
    setDescom(false)
    setDesgas(false)
    setDespag(false)
    setEditMode(false)

    let grupo = agrupaItems(compra.items, "producto")
    setLosItems(grupo)
    setLosGastos(compra.gastos)
    setLosPagos(compra.pagos)
  }

  const limpiarLiquidacion = () => {
    setComision(0)
    setDescom(false)
    setDesgas(false)
    setDespag(false)
    setEditMode(false)
    setTgastos(0)
    setTpagos(0)
    setTventas(0)
    setLosItems(null)
    setLosGastos(null)
    setLosPagos(null)
    setLasVentas(null)
    setSaldo(0)
  }
  const removeGasto = (gastoIndex) => {
    let nGastos = [...losGastos]
    nGastos.splice(gastoIndex, 1)
    setLosGastos(nGastos)

  }

  const removePago = (ind) => {
    let nPagos = [...losPagos]
    nPagos.splice(ind, 1)
    setLosPagos(nPagos)
  }

  const handleDeleteItem = (index) => {
    let nItems = [...losItems]
    nItems.splice(index, 1)
    setLosItems(nItems)
  }
  return (
    <Dialog open={open} fullScreen onClose={handleClose}>
      {!empresa ? null :
        <DialogContent ref={componentRef}>
          <Grid container spacing={2}>
            {editMode ?
              <Paper elevation={3} classes={{ root: classes.paperAmarillo }} displayPrint="none">
                <Grid container spacing={2}>
                  <Grid item xs={3} >
                    <FormControlLabel
                      value={descom}
                      control={<Switch color="primary" checked={descom}/>}
                      label="Descontar comisi&oacute;n"
                      onChange={() => setDescom(!descom)}
                    />
                    {descom ?
                      <TextField
                        name="comProd"
                        value={comProd}
                        variant="outlined"
                        onChange={(e) => setComProd(e.target.value)}
                      />
                      : null
                    }
                  </Grid>
                  <Grid item xs={3} >
                    <FormControlLabel
                      control={<Switch color="primary" checked={desgas}/>}
                      label="Descontar Gastos"
                      onChange={() => setDesgas(!desgas)}
                    />
                  </Grid>
                  <Grid item xs={3} >
                    <FormControlLabel
                      value="values"
                      control={<Switch color="primary" checked={despag}/>}
                      label="Descontar pagos"
                      onChange={() => setDespag(!despag)}
                    />
                  </Grid>
                  <Grid item xs={3} >
                    <Typography align="right" component="div">
                      <IconButton onClick={() => cancelar()}>
                        <RestoreIcon />
                      </IconButton>
                      <IconButton onClick={() => aplicar()}>
                        <DoneIcon />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              :
              <Grid item xs={12}>
                <Box displayPrint="none">
                  <Typography align="right" component="div" >
                    <IconButton onClick={handlePrint}>
                      <PrintIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditMode(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClose()}>
                      <CloseIcon />
                    </IconButton>
                  </Typography>
                </Box>
              </Grid>
            }

            {!losItems ?
              <CircularProgress />
              :
              <Grid container spacing={2}>
                {losItems.length === 0 ?
                  <Typography align="center">No se han registrado ventas.</Typography>
                  :
                  <React.Fragment>
                    <Grid item xs={10} >
                      <Typography variant="h4">{empresa.nombre}</Typography>
                      <Typography>{empresa.calle} {empresa.numero + ", "} {empresa.colonia}</Typography>
                      <Typography>{empresa.municipio} CP:{empresa.cp}</Typography>
                      <Typography>{empresa.tel1} {empresa.email}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography align="right" variant="h4">#{compra.folio}</Typography>
                    </Grid>
                    <Divider />
                    <Grid item container classes={{ root: classes.paperGris }}>
                      <Grid item xs={12}>
                        <Typography className={classes.textoMiniFacheron} >PRUDUCTOR</Typography>
                        <Typography variant="h6">{compra.provedor.nombre}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography >FOLIO: #{compra.folio}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography >CLAVE: {compra.clave}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography >FECHA: {compra.fecha}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography >REMISI&Oacute;N : {compra.remision}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" align="center">PRODUCTOS</Typography>
                      <Divider />
                    </Grid>

                    {losItems.map((item, i) => (
                      <ItemEditable elItem={item} key={i} editMode={editMode} sumar={sumarTotalItems} eliminar={handleDeleteItem} id={i} />
                    ))}

                    <Divider />
                    {!isMobile ?
                      <React.Fragment>
                        <Grid container >
                          <Grid item xs={5}>
                            <Divider />
                            <Typography className={classes.textoMirame} align="right" >Totales:</Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Divider />
                            <Typography className={classes.textoMirame} align="right">{formatNumber(sumCantidad(losItems), 2)} | {formatNumber(sumEmpaques(losItems), 1)}</Typography>
                          </Grid>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={3} classes={{ root: classes.paperVerde }}>
                            <Typography align="right" className={classes.textoMiniFacheron} >Total Venta</Typography>
                            <Typography className={classes.textoMirame} align="right">${formatNumber(tVentas, 2)}</Typography>
                          </Grid>
                        </Grid>

                        <Grid item container>

                          <Grid item xs={8}>
                            {desgas ?
                              losGastos.length > 0 ?
                                <React.Fragment>
                                  <Grid item xs={12} classes={{ root: classes.paperGris }}>
                                    <Typography align="center" className={classes.textoMirame} >Gastos</Typography>
                                    <Divider />
                                  </Grid>
                                  {losGastos.map((gasto, i) => (
                                    <GastoEditable gasto={gasto} editMode={editMode} key={i} del={removeGasto} index={i} sumar={sumarTotalGastos} />
                                  ))}
                                  <Grid item xs={12}>
                                    <Typography align="right" className={classes.textoMiniFacheron} >Total Gastos</Typography>
                                    <Typography align="right" className={classes.textoMirameSangron}>-$ {formatNumber(tGastos, 2)}</Typography>
                                  </Grid>

                                </React.Fragment>
                                : null
                              : null
                            }

                            {despag ?
                              <React.Fragment>
                                <Grid item xs={12} classes={{ root: classes.paperGris }}>
                                  <Typography align="center" className={classes.textoMirame} >Pagos</Typography>
                                </Grid>
                                {losPagos.map((pago, i) => (
                                  <GastoEditable gasto={pago} editMode={editMode} key={i} del={removePago} index={i} sumar={sumarTotalPagos} />
                                ))}
                                <Grid item xs={12}>
                                  <Typography align="right" className={classes.textoMiniFacheron} >Total Pagos</Typography>
                                  <Typography align="right" className={classes.textoMirameSangron}>-$ {formatNumber(tPagos, 2)}</Typography>
                                </Grid>
                              </React.Fragment>
                              : null
                            }
                          </Grid>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={3}>
                            {descom ?
                              <Grid item xs={12}>
                                <Typography align="right" className={classes.textoMiniFacheron} >Comisi&oacute;n</Typography>
                                <Typography align="right">({comProd}%) -$ {formatNumber(comision, 2)}</Typography>
                              </Grid>
                              : null
                            }

                            {desgas ?
                              <Grid item xs={12}>
                                <Typography align="right" className={classes.textoMiniFacheron} >Gastos</Typography>
                                <Typography align="right">-$ {formatNumber(tGastos, 2)}</Typography>
                              </Grid>
                              : null
                            }
                            {despag ?
                              <Grid item xs={12}>
                                <Typography align="right" className={classes.textoMiniFacheron} >Pagos</Typography>
                                <Typography align="right">-$ {formatNumber(tPagos, 2)}</Typography>
                              </Grid>
                              : null
                            }
                            <Grid item xs={12} classes={{ root: classes.paperAmarillo }}>
                              <Typography align="right" className={classes.textoMiniFacheron} >Saldo</Typography>
                              <Typography align="right" className={classes.textoMirame} >{formatNumber(saldo, 2)}</Typography>
                            </Grid>

                          </Grid>

                        </Grid>



                      </React.Fragment>
                      : null
                    }
                  </React.Fragment>
                }
              </Grid>
            }
          </Grid>
        </DialogContent>
      }
      {/* <DialogActions>
        <Button className={classes.botonGenerico}>guardar</Button>
      </DialogActions> */}
    </Dialog>
  )
}