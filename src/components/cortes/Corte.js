import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button } from '@material-ui/core'
import VentaBasic from '../ventas/VentaBasic'
import EgresoBasic from '../egresos/EgresoBasic'
import IngresoBasic from '../ingresos/IngresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'

export default function Corte(props){
    const {open, close, corte, fecha, onChangeFecha} = props
    const [elcorte, setElcorte] = useState(null)
    const [mediasCajasCount, setMediasCajasCount] = useState(0)
    useEffect(()=>{
        if(corte){
            setElcorte(corte)
        }
        return ()=>setElcorte(null)
    },[corte])

    useEffect(()=>{
        if(elcorte !== null){
            let cuenta = 0
            elcorte.items.map((el)=>{
                if(el.empaques > 0 && el.empaques < 1){
                    return cuenta++
                }
                return false
            })
            setMediasCajasCount(cuenta)
        }
        return () => setMediasCajasCount(0)
    },[elcorte])
    return(
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
        >   
            {elcorte === null ? null :
            <React.Fragment>
                <DialogTitle disableTypography>
                    <Grid container >
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">{elcorte.ubicacion.nombre}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>         
                            <Typography variant="h6" align="center">               
                                    {/* <Button >anterior</Button> */}
                                    <TextField 
                                        id="date"
                                        label="Fecha de Corte"
                                        type="date"
                                        value={fecha}
                                        onChange={(e)=>onChangeFecha(e.target.value)}
                                    />
                                    {/* <Button >siguiente</Button> */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" align="right">Total: ${formatNumber(elcorte.total,2)}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {elcorte.resumenVentas === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">RESUMEN VENTAS</Typography>
                                <Divider />
                                {elcorte.resumenVentas.map((el, i)=>(
                                    <React.Fragment key={i}>
                                    <Grid container >
                                        <Grid item xs={1}><Typography variant="body2" >{el.compra.folio}</Typography></Grid>
                                        <Grid item xs={11} sm={3}>
                                            <Typography variant="body2" >{el.producto.descripcion}</Typography></Grid>
                                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.empaques,2)}</Typography></Grid>
                                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.cantidad,2)}</Typography></Grid>
                                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber((el.importe / el.cantidad),2)}</Typography></Grid>
                                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.importe,2)}</Typography></Grid>
                                    </Grid>
                                    <Divider />
                                    </React.Fragment>
                                ))}
                                <Divider />
                                <Grid container>
                                    <Grid item xs={3} sm={6}>
                                        <Typography align="right" variant="body2" >{formatNumber(sumEmpaques(elcorte.resumenVentas),1)}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(sumCantidad(elcorte.resumenVentas),2)}</Typography></Grid>
                                    <Grid item xs={3} sm={2}><Typography variant="body2" > </Typography></Grid>
                                    <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(sumImporte(elcorte.resumenVentas),2)}</Typography></Grid>
                                </Grid>
                                <Divider />
                                <Grid item xs={12}>
                                    <Typography align="right" variant="body2" >medias cajas: {formatNumber(mediasCajasCount)}</Typography>
                                </Grid>
                            </Grid>
                        }

                        {elcorte.ventas === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">VENTAS</Typography>
                                
                                <Divider />
                                {elcorte.ventas.map((venta, i) => (
                                        <VentaBasic venta={venta} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tventas,2)}</Typography>
                            </Grid>
                        }

                        {elcorte.ingresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">INGRESOS</Typography>
                                {elcorte.ingresos.map((ingreso, i) => (
                                        <IngresoBasic ingreso={ingreso} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tingresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.egresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Egresos:</Typography>
                                {elcorte.egresos.map((egreso, i) => (
                                        <EgresoBasic egreso={egreso} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tegresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.creditos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Créditos:</Typography>
                                {elcorte.creditos.map((credito, i) => (
                                        <CxcBasic cxc={credito} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tcreditos,2)}</Typography>
                            </Grid>
                        }
                    </Grid>

                </DialogContent>
                <DialogActions>                        
                    
                </DialogActions>
            </React.Fragment>
            }
        </Dialog>
    )
}