import React, { useState } from 'react';
import ProductosDialog from './ProductosDialog';
import Loading from '../Loading'

import { Container, Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Divider } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

// HOOKS
import useProducts from '../hooks/useProducts';
import { useSnackbar } from 'notistack';

function Productos() {
    const { products, add, del } = useProducts()
    const [dialog, setDialog] = useState(false)
    const [loading] = useState(true)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const showDialog = () => {
        setDialog(true)
    }

    const closeDialog = () => {
        setDialog(false)
    }

    function addProducto(producto) {
        showMessage("Agregando...", "info")
        closeDialog()
        add(producto).then(res => {
            if(res.status === "success"){
                showMessage(res.message, res.status)
            }
        })
    }

    function removeProduct(index, id) {
        showMessage("Eliminando...", "info")
        del(index, id).then(res => {
            if(res.status === 'success'){
                showMessage(res.message, res.status)
            }
        })
    }

    return (
        <Paper>
            {
                products === null ?
                    <Loading loading={loading} />
                    :
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" children="Productos"/>
                                <Typography variant="subtitle1" children={ products.length + " productos en la lista" } />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container justify="flex-end">
                                    <Button variant="contained" color="secondary" onClick={showDialog}>
                                        + Agregar un producto
                                    </Button>
                                    <ProductosDialog addProducto={addProducto} isShowing={dialog} close={closeDialog} />
                                </Grid>
                            </Grid>

                        </Grid>

                        <Divider />

                        <Grid container>

                            {products.length === 0 ?
                                <Typography variant="h6" align="center" gutterBottom>No hay productos registrados.</Typography>
                                :
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Clave</TableCell>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Costo</TableCell>
                                            <TableCell align="right">Precio Público</TableCell>
                                            <TableCell align="right">Precio Mayoreo</TableCell>
                                            <TableCell align="right">Precio Especial</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            products.map((row, index) => (
                                                <TableRow key={index} index={index}>
                                                    <TableCell >{row.clave}</TableCell>
                                                    <TableCell component="th" scope="row">{row.descripcion}</TableCell>
                                                    <TableCell align="right">{row.costo}</TableCell>
                                                    <TableCell align="right">{row.precio1}</TableCell>
                                                    <TableCell align="right">{row.precio2}</TableCell>
                                                    <TableCell align="right">{row.precio3}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="delete"
                                                            onClick={() => removeProduct(index, row._id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            }
                        </Grid>
                        
                    </Container>

            }
        </Paper>
    )
}

export default Productos