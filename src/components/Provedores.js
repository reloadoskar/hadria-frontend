import React from 'react';
import ProvedorsDialog from './dialogs/ProvedorsDialog'

import { SnackbarProvider,  } from 'notistack';

import { Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import useModal from './hooks/useModal';
import useProvedors from './hooks/useProvedors'

function Provedors() {
    const {provedors, add, del} = useProvedors([])
    const { isShowing, toggle } = useModal();

    function addProvedor(provedor) {
        add(provedor)
        toggle()
    }

    function removeProvedor(index, id) {
        del(index, id)
    }

    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container justify="flex-end">
                    <ProvedorsDialog addProvedor={addProvedor} isShowing={isShowing} toggle={toggle} />
                </Grid>

                <Grid container>

                    { provedors.length === 0  ? 
                        <Typography variant="h6" align="center" gutterBottom>No hay Proveedores registrados.</Typography>
                    :
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                <TableCell>Proveedor</TableCell>
                                <TableCell>Clave</TableCell>
                                <TableCell>RFC</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Contacto</TableCell>
                                <TableCell>Cuenta(s)</TableCell>
                                <TableCell align="right">Días de Crédito</TableCell>
                                <TableCell align="right">Comisión(%)</TableCell>
                                <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                provedors.map((row, index) => (
                                    <TableRow key={index} index={index}>
                                        <TableCell >{row.nombre}</TableCell>
                                        <TableCell >{row.clave}</TableCell>
                                        <TableCell >{row.rfc}</TableCell>
                                        <TableCell >{row.direccion}</TableCell>
                                        <TableCell align="right">
                                            <p>Teléfono: {row.tel1}</p>
                                            <p>e-mail: {row.email}</p>
                                        </TableCell>
                                        <TableCell >{row.cta1}</TableCell>
                                        <TableCell align="right">{row.diasDeCredito}</TableCell>
                                        <TableCell align="right">{row.comision}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete"
                                                onClick={() => removeProvedor(index, row._id)}
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
            <Provedors />
        </SnackbarProvider>
    );
}