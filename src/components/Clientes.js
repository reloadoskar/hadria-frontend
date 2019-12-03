import React from 'react';
import ClientesDialog from './dialogs/ClientesDialog'

import { SnackbarProvider,  } from 'notistack';

import { Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import useModal from './hooks/useModal';
import useClientes from './hooks/useClientes'

function Clientes() {
    const {clientes, add, del} = useClientes([])
    const { isShowing, toggle } = useModal();

    function addCliente(cliente) {
        add(cliente)
        toggle()
    }

    function removeCliente(index, id) {
        del(index, id)
    }

    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container justify="flex-end">
                    <ClientesDialog addCliente={addCliente} isShowing={isShowing} toggle={toggle} />
                </Grid>

                <Grid container>

                    { clientes.length === 0  ? 
                        <Typography variant="h6" align="center" gutterBottom>No hay Clientes registrados.</Typography>
                    :
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>RFC</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell align="right">Contacto</TableCell>
                                    <TableCell align="right">Días de Crédito</TableCell>
                                    <TableCell align="right">Límite de Crédito</TableCell>
                                    <TableCell align="right">Crédito Disponible</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                clientes.map((row, index) => (
                                    <TableRow key={index} index={index}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell >{row.rfc}</TableCell>
                                        <TableCell >{row.direccion}</TableCell>
                                        <TableCell align="right">{row.tel1}</TableCell>
                                        <TableCell align="right">{row.dias_de_credito}</TableCell>
                                        <TableCell align="right">{row.limite_de_credito}</TableCell>
                                        <TableCell align="right">{row.credito_disponible}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete"
                                                onClick={() => removeCliente(index, row._id)}
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
            <Clientes />
        </SnackbarProvider>
    );
}