import React, { useEffect, useState, useContext } from 'react'
import { Badge, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit'
import { useSnackbar } from 'notistack';
import CancelIcon from '@material-ui/icons/Cancel';
import Confirm from '../dialogs/Confirm';
import { formatNumber, sumImporte, sumStock, sumEmpStock } from '../Tools';
import useStyles from '../hooks/useStyles';
import {ComprasContext} from '../compras/CompraContext'
export default function CompraBasic(props){
    const {compra, 
        editCompra, 
        verCompra, 
        // recuperarVentas, 
        // recuperarGastos
    } = props

    const {removeCompra} = useContext(ComprasContext)

    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const [compraLocal, setCompraLocal] = useState(null)
    const [totalVenta, setTotalVenta] = useState(0)
    const [totalGastos, setTotalGastos] = useState(0)
    const [totalPagos, setTotalPagos] = useState(0)
    const [resultado, setResultado] = useState(0)
    const [tEmpaques, setEmpaques] = useState(0)
    const [tCantidad, setCantidad] = useState(0)

    const [confirm, setConfirm] = useState(false)

    const classes = useStyles()
    useEffect(() => {
        if(compra !== null){
            setCompraLocal(compra)
        }
        return () => setCompraLocal(null)
    },[compra])

    useEffect(() => {
        if(compraLocal){
            let tv = sumImporte(compraLocal.ventaItems)
            compraLocal.totalVenta = tv
            let tg = sumImporte(compraLocal.gastos)
            compraLocal.totalGastos = tg
            let tp = sumImporte(compraLocal.pagos)
            compraLocal.totalPagos = tp
            let tc = compraLocal.importe
            setTotalVenta(tv) 
            setTotalGastos(tg)
            setTotalPagos(tp)
            if(compraLocal.tipoCompra.tipo === 'COMPRAS' ||compraLocal.tipoCompra.tipo === 'COMPRA' ){
                let re = tv-tc-tg
                setResultado(re)
                compraLocal.resultado = re
            }else{
                let re = tv-tg-tp
                setResultado(re)
                compraLocal.resultado = re
            }
            setEmpaques(sumEmpStock(compraLocal.items))
            setCantidad(sumStock(compraLocal.items))
        }
        return () => setTotalVenta(0) 
    },[compraLocal])

    const handleVerCompra = (compra) => {
        verCompra(compra)
    }

    const onConfirm = () => {
        removeCompra(compra._id).then(res => {
            showMessage(res.message, res.status)
        })
    }

    // const handleRecuperarVentas = (compraId) => {
    //     recuperarVentas(compraId).then(res=>{
    //         setCompraLocal(res.compra)
    //     })
    // }

    // const handleRecuperarGastos = (compraId) => {
    //     recuperarGastos(compraId).then(res=>{
    //         setCompraLocal(res.compra)
    //     })
    // }
    return (
        <React.Fragment>
            {compraLocal === null ? null :
            <Grid container justifyContent="center" alignItems="baseline" spacing={1} className={classes.paperContorno}>
                <Grid item xs={12}>
                    <Typography align="right">
                        <Badge variant="dot" color="secondary">
                        <IconButton
                            size="small"
                            onClick={() => handleVerCompra(compra)}
                            >
                            <VisibilityIcon />
                        </IconButton>
                        </Badge>
                        <IconButton
                            size="small"
                            onClick={() => editCompra(compra)}
                            >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setConfirm(true)}
                            >
                            <CancelIcon />
                            <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
                        </IconButton>
                    </Typography>
                </Grid>
                <Divider />
                <Grid item xs={3} sm={1}>
                    <Typography className={classes.textoMirame} >#{compraLocal.folio}</Typography>
                    <Typography 
                        align="center" 
                        className={ ` ${classes.textoMiniFacheron}  ${tEmpaques < 1 && tCantidad < 1 ? classes.suspended : classes.pro }` }>
                            {tEmpaques < 1 && tCantidad < 1 ? "TERMINADO" : compraLocal.status}
                    </Typography>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.fecha}</Typography>
                </Grid>
                <Grid item xs={9} sm={3}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.clave} | {compraLocal.tipoCompra.tipo} </Typography>
                    <Typography>{compraLocal.provedor.nombre}</Typography>
                </Grid>
                {compraLocal.tipoCompra.tipo === "COMPRAS" || compraLocal.tipoCompra.tipo === "COMPRA"  ?
                    <React.Fragment>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Venta:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalVenta,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Costo:</Typography>
                            <Typography align="right">$ {formatNumber(compraLocal.importe,2)}</Typography>
                            <Typography align="right" className={classes.textoMiniFacheron}>Pagado:</Typography>
                            <Typography align="right">${formatNumber(totalPagos,2)}</Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Gastos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalGastos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography className={classes.textoMiniFacheron} align="right">Resultado:</Typography>
                            <Typography align="right" className={resultado<0 ? classes.textoMirameSangron : classes.textoMirameExito}>
                                ${formatNumber(resultado,2)} 
                            </Typography>
                        </Grid>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Venta:</Typography>
                            <Typography align="right">${formatNumber(totalVenta,2)} </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Pagos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalPagos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Gastos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalGastos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography className={classes.textoMiniFacheron} align="right">Resultado:</Typography>
                            <Typography align="right" className={resultado<0 ? classes.textoMirameSangron : classes.textoMirameExito}>
                                ${formatNumber(resultado,2)} 
                            </Typography>
                        </Grid>
                    </React.Fragment>
                }                
            </Grid>
            }
        </React.Fragment>
    )
}