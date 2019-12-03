import React from 'react';
import ProductosDialog from './dialogs/ProductosDialog';

import { SnackbarProvider, } from 'notistack';
import { Container, Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

// HOOKS
import useProducts from './hooks/useProducts';
import useModal from './hooks/useModal';

function Productos() {
    const {products, add, del} = useProducts([])
    const { isShowing, toggle } = useModal();

    function addProducto(producto) {
        add(producto)
        toggle()
    }

    function removeProduct(index, id) {
        del(index, id)
    }

    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container justify="flex-end">
                    <Button variant="contained" color="secondary" onClick={toggle}>
                        + Agregar un producto
      		        </Button>
                    <ProductosDialog addProducto={addProducto} isShowing={isShowing} toggle={toggle} />
                </Grid>

                <Grid container>

                    { products.length === 0  ? 
                        <Typography variant="h6" align="center" gutterBottom>No hay productos registrados.</Typography>
                    :
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Clave</TableCell>
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
                                        <TableCell component="th" scope="row">{row.descripcion}</TableCell>
                                        <TableCell >{row.clave}</TableCell>
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
        </Paper>
    )
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
            <Productos />
        </SnackbarProvider>
    );
}