import React, { useEffect, useState } from 'react'
import { Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
export default function CompraBasic(props){
    const {compra, openConfirm, editCompra, verCompra} = props
    const [compraLocal, setCompraLocal] = useState(null)

    useEffect(() => {
        if(compra !== null){
            setCompraLocal(compra)
        }
        return () => setCompraLocal(null)
    },[compra])

    const handleVerCompra = (compra) => {
        verCompra(compra)
    }
    return (
        <Card>
            <CardContent>
            {compraLocal === null ? null :
            <Grid item container xs={12}>
                <Grid item xs={12} sm={2}>
                    <Typography>#{compraLocal.folio} {compraLocal.fecha}</Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography>{compraLocal.provedor.nombre} | {compraLocal.clave} </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Typography align="right">{compraLocal.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align="right">
                        <IconButton
                            size="small"
                            disabled
                            >
                            <CompareArrowsIcon />
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
                        <IconButton
                            size="small"
                            disabled={compra.status === "CANCELADO" ? true : false}
                            aria-label="delete"
                            onClick={() => openConfirm(compra)}
                            >
                            <DeleteIcon />
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>
            }
            </CardContent>
        </Card>
    )
}