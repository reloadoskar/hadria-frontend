import React from 'react';
import { 
    Typography, 
    Card,
    CardContent, 
    Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core';
import { formatNumber } from '../Tools'

export default function TablaIngresos({ data }) {
    return (
            <Card>
                <CardContent>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ubicación</TableCell>
                                <TableCell>Concepto</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell align="right">Importe</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography variant="body2" children={row.ubicacion.nombre} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" children={row.concepto} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" children={row.descripcion} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography align="right" variant="body2" children={"$" + formatNumber(row.importe)} />
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
    );
}
