import React from 'react';
import {
    Typography,
    LinearProgress,
    IconButton,
    Card,
    CardContent,
    Grid
} from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
// import {formatNumber, sumImporte, sumSaldo} from '../Tools'
export default function TablaCompras( {compras, editCompra, openConfirm }){
    return (
        <Card>
            <CardContent>
                { compras === null ?
                    <LinearProgress variant="query" /> 
                    :
                    compras.map((compra, index)=>(
                        <Grid container spacing={2} key={index} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" >{compra.folio} | {compra.clave} {compra.status}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" align="right">{compra.provedor.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                            <Typography align="right">
                                <IconButton
                                    size="small"
                                >
                                    <CompareArrowsIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => editCompra(compra)}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    disabled={compra.status === "CANCELADO" ? true : false}
                                    aria-label="delete"
                                    onClick={() => openConfirm(compra, index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Typography>
                            </Grid>
                        </Grid>
                    ))
                }
            </CardContent>
        </Card>
    )
}