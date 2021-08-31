import React, { useEffect, useState } from 'react'
import { Divider, Grid, IconButton, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit'
import RefreshIcon from '@material-ui/icons/Refresh'
import { formatNumber, sumImporte } from '../Tools';
import useStyles from '../hooks/useStyles';
export default function CompraBasic(props){
    const {compra, 
        // openConfirm, 
        editCompra, verCompra, recuperarVentas, recuperarGastos} = props
    const [compraLocal, setCompraLocal] = useState(null)
    const [totalVenta, setTotalVenta] = useState(0)
    const [totalGastos, setTotalGastos] = useState(0)
    const [totalPagos, setTotalPagos] = useState(0)
    const [resultado, setResultado] = useState(0)
    const classes = useStyles()
    useEffect(() => {
        if(compra !== null){
            setCompraLocal(compra)
            // setTotalVenta(sumImporte(compra.ventaItems))
            // setResultado(  (sumImporte(compra.ventaItems) - compra.importe))
        }
        return () => setCompraLocal(null)
    },[compra])

    useEffect(() => {
        if(compraLocal){
            let tv = sumImporte(compraLocal.ventaItems)
            let tg = sumImporte(compraLocal.gastos)
            let tp = sumImporte(compraLocal.pagos)
            let costo = compraLocal.importe
            setTotalVenta(tv) 
            setTotalGastos(tg)
            setTotalPagos(tp)
            if(compraLocal.tipoCompra.tipo === 'COMPRAS'){
                setResultado(tv-tp-tg)
            }else{
                setResultado(tv-tg-tp)
            }
        }
        return () => setTotalVenta(0) 
    },[compraLocal])

    const handleVerCompra = (compra) => {
        verCompra(compra)
    }

    const handleRecuperarVentas = (compraId) => {
        recuperarVentas(compraId).then(res=>{
            setCompraLocal(res.compra)
        })
    }

    const handleRecuperarGastos = (compraId) => {
        recuperarGastos(compraId).then(res=>{
            setCompraLocal(res.compra)
        })
    }
    return (
        <React.Fragment>
            {compraLocal === null ? null :
            <Grid item container xs={12} justifyContent="center" alignItems="center">
                <Grid item xs={6} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.fecha}</Typography>
                    <Typography className={classes.textoMirame} >#{compraLocal.folio}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.clave} | {compraLocal.tipoCompra.tipo}</Typography>
                    <Typography>{compraLocal.provedor.nombre}</Typography>
                </Grid>
                {compraLocal.tipoCompra.tipo === "COMPRAS" ?
                    <React.Fragment>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Venta:</Typography>
                            <Typography align="right">
                                ${formatNumber(totalVenta,2)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Pagos:</Typography>
                            <Typography align="right">${formatNumber(totalPagos,2)}</Typography>
                            <Typography align="right" className={classes.textoMiniFacheron}>Costo: $ {formatNumber(compraLocal.importe,2)}</Typography>
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
                <Grid item xs={12} sm={1}>
                    <Typography align="right">
                        <IconButton
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
                        </IconButton>
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