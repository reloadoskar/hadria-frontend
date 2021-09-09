import React, { useEffect, useState } from 'react'
import { Divider, Grid, IconButton, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit'
// import RefreshIcon from '@material-ui/icons/Refresh'
import { formatNumber, sumImporte, sumStock, sumEmpStock } from '../Tools';
import useStyles from '../hooks/useStyles';
export default function CompraBasic(props){
    const {compra, 
        editCompra, 
        verCompra, 
        // recuperarVentas, 
        // recuperarGastos
    } = props
    const [compraLocal, setCompraLocal] = useState(null)
    const [totalVenta, setTotalVenta] = useState(0)
    const [totalGastos, setTotalGastos] = useState(0)
    const [totalPagos, setTotalPagos] = useState(0)
    const [resultado, setResultado] = useState(0)
    const [tEmpaques, setEmpaques] = useState(0)
    const [tCantidad, setCantidad] = useState(0)
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
            let tg = sumImporte(compraLocal.gastos)
            let tp = sumImporte(compraLocal.pagos)
            let tc = compraLocal.importe
            setTotalVenta(tv) 
            setTotalGastos(tg)
            setTotalPagos(tp)
            if(compraLocal.tipoCompra.tipo === 'COMPRAS' ||compraLocal.tipoCompra.tipo === 'COMPRA' ){
                setResultado(tv-tc-tg)
            }else{
                setResultado(tv-tg-tp)
            }
            setEmpaques(sumEmpStock(compraLocal.items))
            setCantidad(sumStock(compraLocal.items))
        }
        return () => setTotalVenta(0) 
    },[compraLocal])

    const handleVerCompra = (compra) => {
        verCompra(compra)
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
            <Grid item container xs={12} justifyContent="center" alignItems="baseline">
                <Grid item xs={3} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.fecha}</Typography>
                    <Typography className={classes.textoMirame} >#{compraLocal.folio}</Typography>
                </Grid>
                <Grid item xs={9} sm={4}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.clave} | {compraLocal.tipoCompra.tipo} </Typography>
                    <Typography>{compraLocal.provedor.nombre}</Typography>
                </Grid>
                <Grid item xs={12} sm={1} className={tEmpaques < 1 && tCantidad < 1 ? classes.suspended : classes.pro}>
                    <Typography align="center" className={classes.textoMiniFacheron}>{tEmpaques < 1 && tCantidad < 1 ? "TERMINADO" : compraLocal.status}</Typography>
                </Grid>
                {compraLocal.tipoCompra.tipo === "COMPRAS" || compraLocal.tipoCompra.tipo === "COMPRA"  ?
                    <React.Fragment>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Venta:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalVenta,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={1}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Costo:</Typography>
                            <Typography align="right">$ {formatNumber(compraLocal.importe,2)}</Typography>
                            <Typography align="right" className={classes.textoMiniFacheron}>Pagado:</Typography>
                            <Typography align="right">${formatNumber(totalPagos,2)}</Typography>
                        </Grid>
                        <Grid item xs={4} sm={1}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Gastos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalGastos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
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
                        <Grid item xs={4} sm={1}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Pagos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalPagos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={1}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Gastos:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalGastos,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Typography className={classes.textoMiniFacheron} align="right">Resultado:</Typography>
                            <Typography align="right" className={resultado<0 ? classes.textoMirameSangron : classes.textoMirameExito}>
                                ${formatNumber(resultado,2)} 
                            </Typography>
                        </Grid>
                    </React.Fragment>
                }
                <Grid item xs={12} sm={1}>
                    <Typography align="right">
                        {/* <IconButton
                            disabled
                            size="small"
                            onClick={() => handleRecuperarGastos(compra._id)}
                            >
                            <RefreshIcon />
                        </IconButton>
                        <IconButton
                            disabled
                            size="small"
                            onClick={() => handleRecuperarVentas(compra._id)}
                            >
                            <RefreshIcon />
                        </IconButton> */}
                        <IconButton
                            size="small"
                            onClick={() => handleVerCompra(compra)}
                            >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => editCompra(compra)}
                            >
                            <EditIcon />
                        </IconButton>
                        {/* <IconButton
                            size="small"
                            disabled={compra.status === "CANCELADO" ? true : false}
                            aria-label="delete"
                            onClick={() => openConfirm(compra)}
                            >
                            <DeleteIcon />
                        </IconButton> */}
                    </Typography>
                </Grid>
            </Grid>
            }
            <Divider />
        </React.Fragment>
    )
}