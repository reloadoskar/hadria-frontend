import React from 'react';
import UbicacionesDialog from './dialogs/UbicacionesDialog';

import { SnackbarProvider, } from 'notistack';
import { Container, Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

// HOOKS
import useUbicacions from './hooks/useUbicacions';
import useModal from './hooks/useModal';

function Ubicaciones() {
    const {ubicacions, add, del} = useUbicacions([])
    const { isShowing, toggle } = useModal();

    function addUbicacion(ubicacion) {
        add(ubicacion)
        toggle()
    }

    function removeUbicacion(index, id) {
        del(index, id)
    }

    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container justify="flex-end">
                    <UbicacionesDialog addUbicacion={addUbicacion} isShowing={isShowing} toggle={toggle} />
                </Grid>

                <Grid container>

                    { ubicacions.length === 0  ? 
                        <Typography variant="h6" align="center" gutterBottom>No hay Ubicaciones registradas.</Typography>
                    :
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ubicacion</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                ubicacions.map((row, index) => (
                                    <TableRow key={index} index={index}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete"
                                                onClick={() => removeUbicacion(index, row._id)}
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
            <Ubicaciones />
        </SnackbarProvider>
    );
}