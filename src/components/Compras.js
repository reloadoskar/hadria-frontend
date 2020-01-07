import React from 'react';
import ComprasDialog from './dialogs/ComprasDialog';
import moment from 'moment'

import { SnackbarProvider } from 'notistack';
import { useSnackbar } from 'notistack';
import { IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Card, CardHeader, CardContent, LinearProgress, } from '@material-ui/core';

import useModal from './hooks/useModal';
import useCompras from './hooks/useCompras';

import DeleteIcon from '@material-ui/icons/Delete';

function Compras() {
    const { enqueueSnackbar } = useSnackbar()
    const {compras, addCompra, del} = useCompras();
    const { isShowing, toggle } = useModal();

    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    
    function removeCompra(index, id) {
        del(id)
    }

    return (
        <Card>
            <CardHeader 
                title="Compras"
                action={
                    <ComprasDialog 
                        toggle={toggle} 
                        isShowing={isShowing} 
                        showMessage={showMessage}
                        addCompra={addCompra}
                        />
                }/>
            <CardContent>
                    {
                    compras === null ?
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
                                        {/* <TableCell >Agregado {moment(compra.createdAt).fromNow()}</TableCell> */}
                                        <TableCell >{compra.provedor.nombre}</TableCell>
                                        <TableCell >{compra.ubicacion.nombre}</TableCell>
                                        <TableCell >{compra.tipoCompra.tipo}</TableCell>
                                        <TableCell >{compra.status}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete"
                                                onClick={() => removeCompra(compra._id)}
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

            </CardContent>
        </Card>
    )
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={1} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}>
            <Compras />
        </SnackbarProvider>
    );
}