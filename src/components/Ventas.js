import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Container, Card, CardContent, TextField, Button, Typography, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Box, } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './hooks/useStyles'
import { getVenta, cancelVenta, existCorte } from './api'

const Venta = (props) => {
    const venta = props.data[0]
    const showMessage = props.showMessage
    const classes= useStyles()

    const handleClick = (action, venta) => {
        switch (action) {
            case 'edit':
                return showMessage('No disponoble por el momento', 'error')
            case 'delete':
                existCorte(venta.ubicacion._id, venta.fecha).then(res => {
                    if (res.status === "success") {
                        showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
                    }
                    else {
                        deleteVenta(venta.id).then(res => {
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
                                    <Typography align="center" variant="h6">{venta.tipoPago}</Typography>
                                </Grid>
                            {/* </Box> */}
                            <Grid item xs={12} md={6}>
                                <Typography align="center" variant="h4">{venta.folio} | {venta.cliente.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} md>
                                {
                                    !venta.ubicacion ?
                                        null
                                        :

                                        <Typography align="center" variant="h4">{venta.ubicacion.nombre} | {venta.fecha}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md>
                                <Typography align="right" variant="h4">${venta.importe}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box bgcolor={venta.tipoPago === 'CANCELADO' ? "secondary.main" : null}>
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
                                                                <Typography>{item.compra.clave}</Typography>
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
                                </Box>
                            </Grid>

                        </React.Fragment>

                        :
                        null

                }
            </Grid>


        </React.Fragment>
    )
}

const Ventas = (props) => {
    // const { auth } = props
    // let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    // const classes = useStyles()
    const [loadingSomething, setLoadingSomething] = useState(false)

    const [data, setData] = useState({ folio: '', venta: false })

    const showMessage = (text, type) => {
        enqueueSnackbar(
            text,
            {
                variant: type,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
    }

    const handleChange = (field, value) => {
        switch (field) {
            case "folio":

                return setData({ ...data, [field]: value })

            default:
                return setData({ ...data, [field]: value })
        }
        // setData({ ...data, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let dataSend = {
            folio: data.folio
        }
        setLoadingSomething(true)
        getVenta(dataSend).then(res => {
            if (res.status === 'success') {
                setData({ ...data, venta: res.venta })
            }
            setLoadingSomething(false)
        })

    }

    return (
        <React.Fragment>
            <Container>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="folio"
                                        label="Buscar Folio:"
                                        variant="outlined"
                                        type="number"
                                        value={data.folio}
                                        onChange={(e) => handleChange('folio', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button fullWidth color="primary" type="submit" variant="contained" disabled={loadingSomething}>Buscar</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>

                {
                    loadingSomething
                        ?
                        <Typography children="Buscando ... " />
                        :
                        <Container>
                        <Card>
                            <CardContent>
                                <Venta data={data.venta} showMessage={showMessage} />
                            </CardContent>
                        </Card>
                        </Container>
                }

            
        </React.Fragment>
    )
}

export default Ventas