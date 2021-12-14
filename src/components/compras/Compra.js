import React, {useEffect, useState} from 'react'
import { Dialog, DialogContent, Divider, Grid, IconButton, LinearProgress, Slide, 
    Typography, Tooltip, Badge } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListIcon from '@material-ui/icons/List';
import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from '../hooks/useStyles'
import ResumenVentas from '../ventas/ResumenVentas'
import EgresoBasic from '../egresos/EgresoBasic'
import {sumImporte, formatNumber} from '../Tools'
import ListaVentas from '../ventas/ListaVentas';
import Liquidacion from '../liquidacion/Liquidacion';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export default function Compra({open, close, compra, compras}){
    const classes = useStyles()
    const [dialogListaVentas, setDialog] = useState(false)
    const [liquidacionDialog, setLiquidacionDialog] = useState(false)
    const [laCompra, setLaCompra] = useState(null)
    const [totalVenta, setTotalVenta] = useState(0)
    const [totalGastos, setTotalGastos] = useState(0)
    const [totalPagos, setTotalPagos] = useState(0)
    const [resultado, setResultado] = useState(0)

    useEffect(() => {
        if(compra){
            setLaCompra(compra)
        }
        return () => setLaCompra(null)
    },[compra, compras])

    useEffect(()=>{
        if(laCompra){
            let tv = sumImporte(laCompra.ventaItems)
            let tg = sumImporte(laCompra.gastos)
            let tp = sumImporte(laCompra.pagos)
            let tc = laCompra.importe
            setTotalVenta(tv) 
            setTotalGastos(tg)
            setTotalPagos(tp)
            if(laCompra.tipoCompra.tipo === 'COMPRAS' ||laCompra.tipoCompra.tipo === 'COMPRA' ){
                setResultado(tv-tc-tg)
            }else{
                setResultado(tv-tg-tp)
            }
        }
        return () => resetValues()
    },[laCompra])

    const resetValues = () => {
        setTotalVenta(0)
        setTotalPagos(0)
        setTotalGastos(0)
        setResultado(0)
    }

    const cerrarComp = (id) => {
        compras.cerrarCompra(id)
        close()
    }
    return (
        <Dialog
            fullScreen
            TransitionComponent={Transition}
            open={open}
            onClose={close}
        >
            <DialogContent>
                {laCompra===null ? <LinearProgress variant="query" /> :
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.textoMiniFacheron} >{laCompra.fecha}</Typography>
                            <Typography variant ="h6">#{laCompra.folio} {laCompra.clave} | {laCompra.provedor.nombre} | {laCompra.tipoCompra.tipo}</Typography>
                            <Typography className={classes.textoMiniFacheron} >Remision: {laCompra.remision}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} container justifyContent="flex-end">

                            <Tooltip title="Crear Liquidaci&oacute;n" arrow>
                                <IconButton
                                    onClick={()=>setLiquidacionDialog(true)}>
                                    <Badge color="secondary" variant="dot">
                                        <DescriptionIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Liquidacion open={liquidacionDialog} close={()=>{setLiquidacionDialog(false)}} compra={laCompra}/>
                            
                            <Tooltip title="Ver ventas" arrow >
                                <IconButton
                                    aria-label="Ver ventas"
                                    onClick={()=>setDialog(true)}
                                >
                                    <Badge color="secondary" variant="dot">
                                        <ListIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Cerrar" arrow>
                                <IconButton
                                    aria-label="Cerrar"
                                    onClick={()=>cerrarComp(laCompra._id)}
                                >
                                   { laCompra.status === "ACTIVO" ?  <LockOpenIcon /> : <LockIcon /> }
                                </IconButton>
                            </Tooltip>

                            <IconButton
                                aria-label="close"
                                onClick={close}
                            >
                                <CloseIcon />
                            </IconButton>

                        </Grid>
                        <Grid item xs={12}>
                            <ResumenVentas items={laCompra.items} ventas={laCompra.ventaItems}/>
                        </Grid>
                        {laCompra.gastos.length > 0 ?
                            <Grid item xs={12} container>
                                <Grid item xs={12}>
                                    <Typography align="center" className={classes.textoMirame} >Gastos</Typography>
                                    <Divider />
                                {laCompra.gastos.filter(gasto => gasto.importe > 0).map((gasto, i) => (
                                    <EgresoBasic data={gasto} key={i} />
                                ))}
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography align="right" className={classes.textoMiniFacheron} >
                                        TOTAL GASTOS:
                                    </Typography>
                                    <Typography align="right" className={classes.textoSangron} >
                                        ${formatNumber(sumImporte(laCompra.gastos),2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            : null
                        }

                        {laCompra.pagos.length > 0 ?
                            <Grid item xs={12} container>
                                <Grid item xs={12}>
                                    <Typography align="center" className={classes.textoMirame} >Pagos</Typography>
                                    <Divider />
                                {laCompra.pagos.filter(gasto => gasto.importe > 0).map((gasto, i) => (
                                    <EgresoBasic data={gasto} key={i} />
                                ))}
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography align="right" className={classes.textoMiniFacheron} >
                                        TOTAL PAGOS:
                                    </Typography>
                                    <Typography align="right" className={classes.textoSangron} >
                                        ${formatNumber(sumImporte(laCompra.pagos,2))}
                                    </Typography>
                                </Grid>
                            </Grid>
                            : null
                        }

                        <Grid item xs={12}>
                            { laCompra.tipoCompra.tipo === "COMPRAS" || laCompra.tipoCompra.tipo === "COMPRA"  ?
                                <React.Fragment>
                                    <Typography align="right" className={classes.textoMiniFacheron}>TOTAL VENTAS:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(totalVenta,1)}</Typography>
                                    <Typography className={classes.textoMiniFacheron}align="right" >COSTO: $ {formatNumber(laCompra.importe,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>PAGADO:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >-${formatNumber(totalPagos,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>TOTAL GASTOS:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >-${formatNumber(totalGastos,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>RESULTADO:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(resultado,1)}</Typography>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Typography align="right" className={classes.textoMiniFacheron}>TOTAL VENTAS:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(totalVenta,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>COMISIÓN:</Typography>
                                    {/* <Typography className={classes.textoMirame} variant="h6" align="right" >-${formatNumber(totalComision,1)}</Typography> */}
                                    <Typography align="right" className={classes.textoMiniFacheron}>TOTAL GASTOS:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >-${formatNumber(totalGastos,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>TOTAL PAGOS:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >-${formatNumber(totalPagos,1)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>SALDO PRODUCTOR:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(resultado,1)}</Typography>
                                </React.Fragment>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <ListaVentas ventas={laCompra.ventaItems} open={dialogListaVentas} close={()=>setDialog(false)} />                            
                        </Grid>
                        
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    )
}