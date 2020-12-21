import React from 'react';
import {
    Typography,
    LinearProgress,
    IconButton,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {formatNumber, sumImporte, sumSaldo} from '../Tools'
export default function TablaCompras( {compras, editCompra, openConfirm }){
    return (
        <TableContainer component={Paper}>
            { compras === null ?
                <LinearProgress variant="query" />
                :
                compras.length === 0 ?
                    <Typography variant="h6" align="center" gutterBottom>No hay Compras registradas.</Typography>
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Importe</TableCell>
                                <TableCell align="right">Saldo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                    compras.map((compra, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{compra.folio} | {compra.clave} {compra.provedor.nombre}</TableCell>
                                            <TableCell >{compra.status}</TableCell>
                                            <TableCell align="right">{formatNumber(compra.importe,1)}</TableCell>
                                            <TableCell align="right">{formatNumber(compra.saldo,1)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => editCompra(compra)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    disabled={compra.status === "CANCELADO" ? true : false}
                                                    aria-label="delete"
                                                    onClick={() => openConfirm(compra, index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                   
                            }
                            <TableRow>
                                <TableCell colSpan={2} align="right">TOTAL</TableCell>
                                <TableCell align="right">{ formatNumber(sumImporte(compras),1) }</TableCell>
                                <TableCell align="right">{ formatNumber(sumSaldo(compras),1) }</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

            }
        </TableContainer>
    )
}