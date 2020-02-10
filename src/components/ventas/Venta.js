import React from 'react'

import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../hooks/useStyles'
import { Grid, Typography, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Box, } from '@material-ui/core';

import { cancelVenta, existCorte } from '../api'

const Venta = (props) => {
    const venta = props.data[0]
    const showMessage = props.showMessage
    const classes = useStyles()

    const handleClick = (action, venta) => {
        switch (action) {
            case 'edit':
                return showMessage('No disponoble por el momento', 'error')
            case 'delete':
                existCorte(venta.ubicacion._id, venta.fecha).then(res => {
                    if (res.corte.length > 0) {
                        showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
                    }
                    else {
                        deleteVenta(venta._id).then(res => {
                            return showMessage(res.message, res.status)
                        })
                    }
                })
                break
            default:
                return null

        }
    }

    const deleteVenta = (id) => {
        return cancelVenta(id)
    }
    return (
        <React.Fragment>

            <Grid container spacing={2}>
                {
                    venta ?
                        <React.Fragment>
                            {/* <Box bgcolor={venta.tipoPago === "CANCELADO" ? "secondary.main" : null}> */}
                            {
                                venta.tipoPago === "CANCELADO"
                                    ?
                                    null
                                    :
                                    <Grid item xs={12}>
                                        <IconButton onClick={() => handleClick('edit', venta._id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleClick('delete', venta)}>
                                            <BlockIcon />
                                        </IconButton>
                                    </Grid>

                            }
                            <Grid item xs={12}>
                                <Box bgcolor={venta.tipoPago === "CANCELADO" ? "secondary.main" : null}>
                                    <Typography align="center" variant="h6">{venta.tipoPago}</Typography>
                                </Box>
                            </Grid>
                            {/* </Box> */}
                            <Grid item xs={12} md={6}>
                                <Typography align="center" variant="h5">{venta.folio} | {venta.cliente.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} md>
                                {
                                    !venta.ubicacion ?
                                        null
                                        :

                                        <Typography align="center" variant="h5">{venta.ubicacion.nombre} | {venta.fecha}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md>
                                <Typography align="right" variant="h5">${venta.importe}</Typography>
                            </Grid>
                            <Grid item xs={12}>

                                <Grid container spacing={2}>
                                    <Table size="small" className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Clave de Compra</TableCell>
                                                <TableCell>Descripción</TableCell>
                                                <TableCell align="right">Cantidad</TableCell>
                                                <TableCell align="right">Empaques</TableCell>
                                                <TableCell align="right">Precio</TableCell>
                                                <TableCell align="right">Importe</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                venta.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <Typography>{item.compra.folio}:{item.compra.clave}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography>{item.producto.descripcion}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>{item.cantidad}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>{item.empaques}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>{item.precio}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography>{item.importe}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </Grid>

                            </Grid>

                        </React.Fragment>

                        :
                        null

                }
            </Grid>


        </React.Fragment>
    )
}

export default Venta