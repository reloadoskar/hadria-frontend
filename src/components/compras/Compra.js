import React, {useEffect, useState} from 'react'
import { Card, CardActions, CardHeader, CircularProgress, Dialog, DialogContent, Divider, Grid, IconButton, LinearProgress, Slide, Typography } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../hooks/useStyles'
import ResumenVentas from '../ventas/ResumenVentas'
import CompraItem from './CompraItem'
import EgresoBasic from '../egresos/EgresoBasic'
import {sumImporte, formatNumber} from '../Tools'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export default function Compra({open, close, compra, openConfirm, editCompra, compras}){
    const [laCompra, setLaCompra] = useState(null)
    const [ventaItems, setVentaItems] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [total, setTotal] = useState(0)
    const [comision, setComision] = useState(0)
    const classes = useStyles()

    const filtraVentaItems = (ventas) => {
        let items = []
        if(ventas.length > 0){
            ventas.forEach(venta => {
                venta.items.map(item => items.push(item))
            });
        }
        return items
    }
    useEffect(() => {
        if(compra){
            compras.findCompra(compra._id)
                .then(res => {
                    setLaCompra(res.data)
                    let tot = calculaTotal(res.data)
                    setTotal(tot)

                    if(res.data.compra.tipoCompra.tipo === "CONSIGNACION"){
                        let com = 0
                        com = ( res.data.compra.provedor.comision / 100 ) * tot
                        setComision(com)

                        let sal = 0
                        sal = tot - com
                        setSaldo(sal)
                    }
                })
            setVentaItems(filtraVentaItems(compra.ventas))
        }
        return () => setLaCompra(null)
    },[compra, compras])

    const calculaTotal = (data) => {
        let s = 0
        s = sumImporte(data.ventas) - sumImporte(data.egresos)
        return s
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
                        </Grid>
                        <Grid item xs={12} sm={6} container justify="flex-end">
                            <IconButton
                                size="small"
                                disabled
                            >
                                <CompareArrowsIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => editCompra(laCompra)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                disabled={laCompra.status === "CANCELADO" ? true : false}
                                aria-label="delete"
                                onClick={() => openConfirm(laCompra)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="close"
                                onClick={close}
                            >
                                <CloseIcon />
                            </IconButton>
                            
                        </Grid>
                        <Grid item xs={12}>
                            {/* {laCompra.items.map((item,i) =>(
                                <CompraItem elitem={item} key={i} />
                            ))} */}
                        </Grid>
                        <Grid item xs={12}>
                            <ResumenVentas items={laCompra.ventasGroup}/>
                        </Grid>

                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography align="center" className={classes.textoMirame} >Gastos</Typography>
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