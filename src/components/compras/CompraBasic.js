import React, { useEffect, useState } from 'react'
import { Divider, Grid, IconButton, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit'
import { formatNumber, sumImporte } from '../Tools';
import useStyles from '../hooks/useStyles';
export default function CompraBasic(props){
    const {compra, 
        // openConfirm, 
        editCompra, verCompra} = props
    const [compraLocal, setCompraLocal] = useState(null)
    const [totalVenta, setTotalVenta] = useState(0)
    const [resultado, setResultado] = useState(0)
    const classes = useStyles()
    useEffect(() => {
        if(compra !== null){
            setCompraLocal(compra)
            setTotalVenta(sumImporte(compra.ventaItems))
            setResultado(  (sumImporte(compra.ventaItems) - compra.importe))
        }
        return () => setCompraLocal(null)
    },[compra])

    const handleVerCompra = (compra) => {
        verCompra(compra)
    }
    return (
        <React.Fragment>
            {compraLocal === null ? null :
            <Grid item container xs={12} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.fecha}</Typography>
                    <Typography className={classes.textoMirame} >#{compraLocal.folio}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography className={classes.textoMiniFacheron}>{compraLocal.clave}</Typography>
                    <Typography>{compraLocal.provedor.nombre}</Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Typography align="right">{compraLocal.status}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Typography align="right" className={classes.textoMiniFacheron}>Costo:</Typography>
                    <Typography align="right">${formatNumber(compraLocal.importe,2)}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Typography align="right" className={classes.textoMiniFacheron}>Venta:</Typography>
                    <Typography align="right">
                        ${formatNumber(totalVenta,2)} 
                    </Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Typography className={classes.textoMiniFacheron} align="right">Resultado:</Typography>
                    <Typography align="right" color={resultado<0 ? "secondary" : "primary"}>
                        ${formatNumber(resultado,2)} 
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography align="right">
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