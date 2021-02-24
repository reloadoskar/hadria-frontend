import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button, IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import VentaBasic from '../ventas/VentaBasic'
import EgresoBasic from '../egresos/EgresoBasic'
import IngresoBasic from '../ingresos/IngresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'
import moment from 'moment'
import VentaItem from '../ventas/VentaItem'
import useStyles from '../hooks/useStyles'
export default function Corte(props){
    const classes = useStyles()
    const {open, close, corte, fecha, onChangeFecha} = props
    const [elcorte, setElcorte] = useState(null)
    const [lafecha, setLafecha] = useState("")
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

    useEffect(()=>{
        if(fecha){
            setLafecha(fecha)
        }
        return () => setLafecha("")
    }, [fecha])

    function handleChange(value){
        setLafecha(value)
        onChangeFecha(value)
    }

    function fechaSig(){
        let sig = moment(lafecha)
        sig.add(1, "days")
        handleChange(sig.format("YYYY-MM-DD"))
    }

    function fechaAnt(){
        let ant = moment(lafecha)
        ant.subtract(1,"days")
        handleChange(ant.format("YYYY-MM-DD"))
    }
    return(
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
        >   
            {elcorte === null ? <Typography align="center" >Cargando...</Typography> :
            <React.Fragment>
                <DialogTitle disableTypography>
                    <Grid container >
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">{elcorte.ubicacion.nombre}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>         
                            <Typography variant="h6" align="center">               
                                    <IconButton onClick={fechaAnt}>
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    <TextField 
                                        id="date"
                                        // label="Fecha de Corte"
                                        type="date"
                                        value={lafecha}
                                        onChange={(e)=>handleChange(e.target.value)}
                                        />
                                    <IconButton onClick={fechaSig}>
                                        <NavigateNextIcon />
                                    </IconButton>                                    
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" align="right">Total: ${formatNumber(elcorte.total,2)}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {elcorte.resumenVentas.length === 0 ? null :
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
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total cajas
                                        </Typography>
                                        <Typography 
                                            className={classes.textoMirame}
                                            align="right" 
                                            variant="body2" >
                                                {formatNumber(sumEmpaques(elcorte.resumenVentas),1)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total kilos
                                        </Typography>
                                        <Typography 
                                            className={classes.textoMirame}
                                            align="right" 
                                            variant="body2" >
                                                {formatNumber(sumCantidad(elcorte.resumenVentas),2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2}><Typography variant="body2" > </Typography></Grid>
                                    <Grid item xs={3} sm={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total ventas
                                        </Typography>
                                        <Typography 
                                            className={classes.textoMirame}
                                            align="right" 
                                            variant="body2" >
                                                {formatNumber(sumImporte(elcorte.resumenVentas),2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item xs={12}>
                                    <Typography 
                                        className={classes.textoMiniFacheron}
                                        align="right" 
                                        variant="body2" >
                                            Cajas vacías 
                                    </Typography>
                                    <Typography 
                                        className={classes.textoMirame}
                                        align="right" 
                                        variant="body2" >
                                            {formatNumber((mediasCajasCount/2),1)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }

                        {elcorte.ventas.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">DETALLE DE VENTAS</Typography>                                
                                <Divider />
                                <Grid container spacing={1}>
                                    {elcorte.items.map((item, i) => (
                                        <VentaItem item={item} key={i}/>
                                    ))}
                                    <Grid item xs={3} sm={7}>
                                        <Typography align="right">{formatNumber(sumEmpaques(elcorte.items),1)}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2}>
                                        <Typography align="right">{formatNumber(sumCantidad(elcorte.items),2)}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={1}> 
                                        <Typography align="center"> -- </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={1}>
                                        <Typography align="right">${formatNumber(elcorte.tventas,2)}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sm={1}>
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                        }

                        {elcorte.ingresos.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">INGRESOS</Typography>
                                {elcorte.ingresos.map((ingreso, i) => (
                                        <IngresoBasic ingreso={ingreso} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tingresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.egresos.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">EGRESOS</Typography>
                                {elcorte.egresos.map((egreso, i) => (
                                        <EgresoBasic egreso={egreso} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tegresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.creditos.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">CRÉDITOS</Typography>
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
                    <Button onClick={close}>salir</Button>
                </DialogActions>
            </React.Fragment>
            }
        </Dialog>
    )
}