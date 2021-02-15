import React from 'react'
import { Card, CardActions, CardHeader, Grid, IconButton } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Compra(props){
    const {compra, openConfirm, editCompra, verCompra} = props
    return (
        <Card>
            {compra === null ? null :
                <React.Fragment>
                    <CardHeader
                        title={compra.folio + " " + compra.provedor.nombre}
                        subheader={compra.clave + " | " + compra.fecha}
                    />
                    <CardActions>
                        <Grid container justify="flex-end">

                            <IconButton
                                size="small"
                                disabled
                            >
                                <CompareArrowsIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                disabled
                                // onClick={() => verCompra(compra)}
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
                        </Grid>
                    </CardActions>

                </React.Fragment>
            }
        </Card>
    )
}