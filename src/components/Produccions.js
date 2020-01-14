import React from 'react';

import { Container, Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
// HOOKS
import useProduccions from './hooks/useProduccions';

export default function Produccions() {
    const {produccions, add, del} = useProduccions([])

    function createProduccion() {
        add()
    }

    function removeProduccion(index, id) {
        del(index, id)
    }

    function verProduccion(index, id) {

    }

    return (
        <Paper>
            <Container maxWidth="lg">
                <Grid container justify="flex-end">
                    <Button variant="contained" color="secondary" onClick={createProduccion}>
                        + Crear Producción
      		        </Button>
                </Grid>

                <Grid container>

                    { produccions === null || produccions.length === 0  ? 
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" gutterBottom>No hay Producciones registradas.</Typography>
                        </Grid>
                    :

                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producción</TableCell>
                                    <TableCell>Clave</TableCell>
                                    <TableCell align="right">Costo</TableCell>
                                    <TableCell align="right">Valor Producción</TableCell>
                                    <TableCell >Status</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                produccions.map((row, index) => (
                                    <TableRow key={index} index={index}>
                                        <TableCell component="th" scope="row">{row.folio}</TableCell>
                                        <TableCell >{row.clave}</TableCell>
                                        <TableCell align="right">{row.costo}</TableCell>
                                        <TableCell align="right">{row.valor}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="see"
                                                onClick={() => verProduccion(index, row._id)}
                                                >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete"
                                                onClick={() => removeProduccion(index, row._id)}
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