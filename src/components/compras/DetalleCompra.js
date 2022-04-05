import React, { useState, useContext } from 'react';

import { IconButton, MenuItem, Grid, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import CompraAddItemsDialog from './CompraAddItemsDialog'
import { formatNumber, sumImporte } from '../Tools'
import { updateCompra, updateCompraItem, addCompraItem, ticketNuevoItem } from '../api'
import useStyles from '../hooks/useStyles';
import moment from 'moment'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
export default function DetalleCompra({ compra, open, close, showMessage, products, provedors }){
    const classes = useStyles()
    const {ubicacions} = useContext(UbicacionContext)

    const [addItem, setAdditem] = useState(false)
    const [edit, setEdit] = useState({
        item: null,
        index: null,
        cantidad: 0,
        empaques: 0,
        costo: 0,
        importe: 0,
        fecha: false,
        ubicacion: false,
        remision: false,
        fechaEdit: '',
        ubicacionEdit: '',
        remisionEdit: ''
    })

    const saveNewItem = (item) => {
        item.compra = compra
        addCompraItem(item).then(res => {
            if(res.status !== "success" ){
                showMessage("Ups, ocurrió un error: "+res.message, 'error')
            }else{
                closeAddItem()
                showMessage(res.message, res.status)
                addNewItemToList(res.item)
                calculaNuevoImporte()
                updateAndSaveCompra(compra)
                ticketNuevoItem(item)
            }
        })
    }

    const addNewItemToList = item =>{
        compra.items.push(item)
    }

    const closeAddItem = () => {
        setAdditem(false)
    }

    const openAddItem = () => {
        setAdditem(true)
    }

    const saveChanges = (field, value) => {
        switch (field) {
            case 'fecha':
                compra.fecha = edit.fechaEdit
                return updateAndSaveCompra(compra)
            case 'remision':
                compra.remision = edit.remisionEdit
                return updateAndSaveCompra(compra)
            case 'ubicacion':
                compra.ubicacion = edit.ubicacionEdit
                return updateAndSaveCompra(compra)
            default:
                return updateAndSaveCompra(compra)
        }
    }

    const updateAndSaveCompra = (compra) => {
        updateCompra(compra).then(res => {
            if(res.status !== "success" ){
                showMessage("Ups, ocurrió un error: "+res.message, 'error')
            }else{
                showMessage(res.message, res.status)
                cancelEdit()
            }
        })
    }

    const handleChange = (field, value) => {
        var importe = 0
        switch (field) {
            case 'cantidad':
                importe = value * edit.costo
                return setEdit({ ...edit, [field]: value, importe: importe })
            case 'costo':
                importe = value * edit.cantidad
                return setEdit({ ...edit, [field]: value, importe: importe })
            default:
                return setEdit({ ...edit, [field]: value })
        }
    }

    const deleteItem = (item) => {
        showMessage("No es posible eliminar este elemento", 'error')
    }

    const editItem = (item, index) => {
        setEdit({
            index: index,
            item: item,
            cantidad: item.cantidad,
            empaques: item.empaques,
            costo: item.costo,
            importe: item.importe,
            fechaEdit: compra.fecha,
            ubicacionEdit: compra.ubicacion,
            remisionEdit: compra.remision,
        })
    }

    const cancelEdit = () => {
        setEdit({ item: null, index: null, fecha: false, ubicacion: false, remision: false, })
    }

    const saveItemChanges = () => {
        const newItem = {
            item_id: edit.item._id,
            compra: edit.item.compra,
            cantidad: edit.cantidad,
            empaques: edit.empaques,
            costo: edit.costo,
            importe: edit.importe,
        }

        updateCompraItem(newItem).then( res => {
            if(res.status !== "success" ){
                showMessage("Ups, ocurrió un error: "+res.message, 'error')
            }else{
                showMessage(res.message, res.status)
                updateLocalItem(newItem)
                calculaNuevoImporte()
                updateAndSaveCompra(compra)
            }
        }) 
    }

    const calculaNuevoImporte = () => {
        const nuevoImporte = sumImporte(compra.items)
        var diff = nuevoImporte - compra.importe
        compra.importe = nuevoImporte
        compra.saldo += diff
    }

    const updateLocalItem = (newItem) => {
        let cantDiff = newItem.cantidad - compra.items[edit.index].cantidad
        let empDiff = newItem.empaques - compra.items[edit.index].empaques
        compra.items[edit.index].cantidad = newItem.cantidad
        compra.items[edit.index].empaques = newItem.empaques
        compra.items[edit.index].costo = newItem.costo
        compra.items[edit.index].importe = newItem.importe
        compra.items[edit.index].stock += cantDiff
        compra.items[edit.index].empaquesStock += empDiff
        cancelEdit()
    }

    const setEditable = (field) => {
        setEdit({ ...edit, [field]: true })
    }
    return (
        <div>
        <Dialog
            maxWidth="lg"
            fullWidth
            open={open}
            onClose={close}
        >
            {
                !compra ?
                    null
                    :
                    <React.Fragment>

                        <DialogTitle disableTypography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        {compra.folio} | {compra.provedor.nombre} | {compra.clave}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" align="center">{compra.tipoCompra.tipo}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h6"
                                        align="right"
                                        color={compra.status !== 'ACTIVO' ? 'secondary' : 'primary'}>
                                        {compra.status}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    {
                                        edit.fecha === true ?
                                            <React.Fragment>
                                                <TextField id="fecha" type="date" label="Fecha" value={edit.fechaEdit} onChange={(e) => handleChange('fechaEdit', e.target.value)} />
                                                <IconButton onClick={() => saveChanges('fecha')} >
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton onClick={() => cancelEdit()} >
                                                    <CancelIcon />
                                                </IconButton>
                                            </React.Fragment>
                                            :
                                            <Typography >Llegó: {compra.fecha} <IconButton onClick={() => setEditable('fecha')}><EditIcon fontSize="small" /></IconButton> </Typography>
                                    }
                                </Grid>
                                <Grid item xs={4}>
                                    {
                                        edit.ubicacion === true ?
                                            <React.Fragment>
                                                <TextField
                                                    id="ubicacion"
                                                    select
                                                    fullWidth
                                                    label="Ubicación"
                                                    value={edit.ubicacionEdit}
                                                    onChange={(e) => handleChange('ubicacionEdit', e.target.value)}  >
                                                    {ubicacions.map((option, index) => (
                                                        <MenuItem key={index} value={option}>
                                                            {option.nombre}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <IconButton onClick={() => saveChanges('ubicacion')} >
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton onClick={() => cancelEdit()} >
                                                    <CancelIcon />
                                                </IconButton>
                                            </React.Fragment>
                                            :
                                            <Typography >Ubicación: {compra.ubicacion.nombre} <IconButton onClick={() => setEditable('ubicacion')}><EditIcon fontSize="small" /></IconButton> </Typography>
                                    }
                                </Grid>
                                <Grid item xs={4}>
                                    {
                                        edit.remision === true ?
                                            <React.Fragment>
                                                <TextField
                                                    id="remision"
                                                    label="Remision"
                                                    value={edit.remisionEdit}
                                                    onChange={(e) => handleChange('remisionEdit', e.target.value)}  >
                                                </TextField>
                                                <IconButton onClick={() => saveChanges('remision')} >
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton onClick={() => cancelEdit()} >
                                                    <CancelIcon />
                                                </IconButton>
                                            </React.Fragment>
                                            :
                                            <Typography>Remisión: {compra.remision}<IconButton onClick={() => setEditable('remision')}><EditIcon fontSize="small" /></IconButton></Typography>

                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">Productos</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {
                                        compra.status === "ACTIVO" ?
                                            <Box align="right">
                                                <Button
                                                    onClick={openAddItem}
                                                    startIcon={<AddBoxIcon />}
                                                >
                                                    Agregar producto
                                                </Button>
                                            </Box>
                                            :
                                            null

                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        compra.items.length > 0 ?
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Descripción</TableCell>
                                                        <TableCell align="right">Cantidad | Disponible</TableCell>
                                                        <TableCell align="right">Empaques | Disponible</TableCell>
                                                        <TableCell align="right">Costo</TableCell>
                                                        <TableCell align="right">Importe</TableCell>
                                                        {
                                                            compra.status === "ACTIVO" ?
                                                                <TableCell></TableCell>
                                                                :
                                                                null
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        compra.items.map((item, index) => (
                                                            <TableRow key={index}>
                                                                {
                                                                    edit.index === index ?
                                                                        <React.Fragment>

                                                                            <TableCell>
                                                                                <Typography className={classes.sobreTexto}>{item.ubicacion.nombre} - {moment(item.createdAt).format("YYYY-MM-DD")}</Typography>
                                                                                <Typography>{item.producto.descripcion}</Typography>
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <TextField type="number" id="cantidad" label="Cantidad" value={edit.cantidad} onChange={(e) => handleChange('cantidad', e.target.value)} />
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <TextField type="number" id="empaques" label="Empaques" value={edit.empaques} onChange={(e) => handleChange('empaques', e.target.value)} />
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <TextField type="number" id="costo" label="Costo" value={edit.costo} onChange={(e) => handleChange('costo', e.target.value)} />
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <TextField InputProps={{ readOnly: true, }} id="importe" label="Importe" value={edit.importe} onChange={(e) => handleChange('importe', e.target.value)} />
                                                                            </TableCell>
                                                                            {
                                                                                compra.status !== 'ACTIVO' ?
                                                                                    null
                                                                                    :

                                                                                    <TableCell align="right">
                                                                                        <IconButton
                                                                                            onClick={() => saveItemChanges(edit)}
                                                                                        >
                                                                                            <CheckIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                        <IconButton
                                                                                            onClick={() => cancelEdit()}
                                                                                        >
                                                                                            <CancelIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </TableCell>
                                                                            }
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <TableCell>
                                                                        <Typography className={classes.sobreTexto}>{item.ubicacion.nombre} - {moment(item.createdAt).format("YYYY-MM-DD")}</Typography>
                                                                                <Typography>{item.producto.descripcion}</Typography>
                                                                            </TableCell>
                                                                            <TableCell align="right">{formatNumber(item.cantidad,1) + '|' + formatNumber(item.stock,2)}</TableCell>
                                                                            <TableCell align="right">{item.empaques + '|' + item.empaquesStock}</TableCell>
                                                                            <TableCell align="right">{item.costo}</TableCell>
                                                                            <TableCell align="right">{formatNumber(item.importe,2)}</TableCell>
                                                                            {
                                                                                compra.status !== 'ACTIVO' ?
                                                                                    null
                                                                                    :

                                                                                    <TableCell align="right">
                                                                                        <IconButton
                                                                                            onClick={() => editItem(item, index)}
                                                                                        >
                                                                                            <EditIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                        <IconButton
                                                                                            onClick={() => deleteItem(item)}
                                                                                        >
                                                                                            <ClearIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </TableCell>
                                                                            }
                                                                        </React.Fragment>
                                                                }
                                                            </TableRow>
                                                        )
                                                        )
                                                    }
                                                </TableBody>
                                            </Table>
                                            :
                                            null
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" align="right">Importe</Typography>
                                    <Typography variant="h6" align="right">{formatNumber(compra.importe, 2)}</Typography>
                                </Grid>

                            </Grid>

                        </DialogContent>
                    </React.Fragment>
            }
            <DialogActions>
                
                <Button onClick={close} color="primary">
                    Salir
                </Button>

            </DialogActions>
        </Dialog>
        <CompraAddItemsDialog 
            open={addItem}
            handleClose={closeAddItem}
            showMessage={showMessage}
            addItemToList={saveNewItem}
            products={products}
            provedors={provedors}
        />
        </div>
    )
}