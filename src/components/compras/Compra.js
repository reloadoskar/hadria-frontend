import React, {useEffect, useState} from 'react'
import { Dialog, DialogContent, Divider, Grid, IconButton, LinearProgress, Slide, 
    Typography, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from '../hooks/useStyles'
import ResumenVentas from '../ventas/ResumenVentas'
import EgresoBasic from '../egresos/EgresoBasic'
import {sumImporte, formatNumber} from '../Tools'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export default function Compra({open, close, compra, 
    compras}){
    const [laCompra, setLaCompra] = useState(null)
    const [saldo, setSaldo] = useState(0)
    const [total, setTotal] = useState(0)
    const [comision, setComision] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        if(compra){
            compras.findCompra(compra._id)
                .then(res => {
                    setLaCompra(res.data)
                    let tot = sumImporte(res.data.ventas)
                    if(res.data.compra.tipoCompra.tipo === "CONSIGNACION"){
                        let com = 0
                        com = ( res.data.compra.provedor.comision / 100 ) * tot
                        setComision(com)
                        let sal = 0
                        sal = tot - com
                        setSaldo(sal)
                    }
                    setTotal(calculaTotal(res.data))
                })
        }
        return () => setLaCompra(null)
    },[compra, compras])

    const calculaTotal = (data) => {
        let s = 0
        s = sumImporte(data.ventas) - sumImporte(data.egresos)
        return s
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
                            <Typography className={classes.textoMiniFacheron} >{laCompra.compra.fecha}</Typography>
                            <Typography variant ="h6">#{laCompra.compra.folio} {laCompra.compra.clave} | {laCompra.compra.provedor.nombre} | {laCompra.compra.tipoCompra.tipo}</Typography>
                            <Typography className={classes.textoMiniFacheron} >Remision: {laCompra.compra.remision}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} container justifyContent="flex-end">
                            <Tooltip title="Cerrar" >
                                <IconButton
                                    size="small"
                                    aria-label="Cerrar"
                                    onClick={()=>cerrarComp(laCompra.compra._id)}
                                >
                                    <LockIcon />
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                size="small"
                                aria-label="close"
                                onClick={close}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <ResumenVentas items={laCompra.ventasGroup} compra={laCompra.compra}/>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography align="center" className={classes.textoMirame} >Gastos</Typography>
                                <Divider />
                            {laCompra.egresos.filter(gasto=> gasto.tipo=== "GASTO A COMPRA").map((gasto, i) => (
                                <EgresoBasic egreso={gasto} key={i} />
                            ))}
                                <Divider />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography align="right" className={classes.textoMiniFacheron} >
                                    TOTAL GASTOS:
                                </Typography>
                                <Typography align="right" className={classes.textoSangron} >
                                    ${formatNumber(sumImporte(laCompra.egresos.filter(gasto=> gasto.tipo=== "GASTO A COMPRA")),2)}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography align="center" className={classes.textoMirame} >Pagos</Typography>
                                <Divider />
                            {laCompra.egresos.filter(gasto=> gasto.tipo === "PAGO").map((gasto, i) => (
                                <EgresoBasic egreso={gasto} key={i} />
                            ))}
                                <Divider />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography align="right" className={classes.textoMiniFacheron} >
                                    TOTAL GASTOS:
                                </Typography>
                                <Typography align="right" className={classes.textoSangron} >
                                    ${formatNumber(sumImporte(laCompra.egresos.filter(gasto=> gasto.tipo === "PAGO")),2)}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography align="right" className={classes.textoMiniFacheron}>TOTAL:</Typography>
                            <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(total,2)}</Typography>
                            {laCompra.compra.tipoCompra.tipo === "CONSIGNACION" ?
                                <React.Fragment>
                                    <Divider />
                                    <Typography className={classes.textoMiniFacheron} align="right">COMISIÓN:</Typography>
                                    <Typography className={classes.textoSangron} variant="h6" align="right" >-${formatNumber(comision,2)}</Typography>
                                    <Divider />
                                    <Typography className={classes.textoMiniFacheron} align="right">SALDO:</Typography>
                                    <Typography className={classes.textoMirame} variant="h6" align="right" >${formatNumber(saldo,2)}</Typography>
                                </React.Fragment>
                                :
                                null
                            }
                        </Grid>
                        
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    )
}