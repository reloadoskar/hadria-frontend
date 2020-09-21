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
                                <TableCell>Folio</TableCell>
                                <TableCell>Clave</TableCell>
                                <TableCell>Remisión</TableCell>
                                <TableCell>Proveedor</TableCell>
                                <TableCell>Ubicación</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                    compras.map((compra) => (
                                        <TableRow key={compra._id}>
                                            <TableCell >{compra.folio}</TableCell>
                                            <TableCell >{compra.clave}</TableCell>
                                            <TableCell >{compra.remision}</TableCell>
                                            <TableCell >{compra.provedor.nombre}</TableCell>
                                            <TableCell >{compra.ubicacion.nombre}</TableCell>
                                            <TableCell >{compra.tipoCompra.tipo}</TableCell>
                                            <TableCell >{compra.status}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={() => editCompra(compra)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton
                                                    disabled={compra.status === "CANCELADO" ? true : false}
                                                    aria-label="delete"
                                                    onClick={() => openConfirm(compra)}
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
        </TableContainer>
    )
}