import React, { useState } from 'react';
import Loading from '../Loading'

import { 
    MenuItem, Container, Grid, IconButton, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Divider, TextField, Box } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

// HOOKS
import useProducts from '../hooks/useProducts';
import { useSnackbar } from 'notistack';
import CrearProducto from './CrearProducto';
import {searchBy} from '../Tools'
import useStyles from '../hooks/useStyles';

function Productos() {
    const classes = useStyles()
    const { products, addProduct, del } = useProducts()
    const [dialog, setDialog] = useState(false)
    const [loading] = useState(true)
    const fields = ["clave", "descripcion"]
    const [fieldSelected, setFieldSelected] = useState('descripcion')
    const [searchField, setSearchField] = useState('')
    const [resultado, setResultado] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const showDialog = () => {
        setDialog(true)
    }

    const closeDialog = () => {
        setDialog(false)
    }

    function addProducto(producto) {
        showMessage("Agregando...", "info")
        closeDialog()
        addProduct(producto).then(res => {
            showMessage(res.message, res.status)
        })
    }

    function removeProduct(id) {
        showMessage("Eliminando...", "info")
        setResultado([])
        setSearchField('')
        del(id).then(res => {
            if(res.status === 'success'){
                showMessage(res.message, res.status)
            }
        })
    }

    function handleChange(field, value){
        switch(field)
        {
            case "field":
                return setFieldSelected(value)
            case "search":
                setResultado( searchBy(fieldSelected, value.toUpperCase(), products) )
                return setSearchField(value)
            default: 
                return setSearchField(value)
        }
    }

    return (
        <React.Fragment>
            <Box>
                <Grid container justify="flex-end">
                        <Button className={classes.botonGenerico} onClick={showDialog}>Agregar</Button>
                        <CrearProducto add={addProducto} open={dialog} close={closeDialog} search={searchBy} />
                </Grid>
            </Box>
            <Paper>

            {
                products === null ?
                <Loading loading={loading} />
                :
                <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" children={ products.length + " Productos"}/>
                                        <Typography variant="subtitle1" children="en la lista" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                Buscar por: 
                                {/* <Button children={fieldSelected} />  */}
                                    <TextField 
                                        select 
                                        value={fieldSelected}
                                        onChange={(e) => handleChange('field', e.target.value)}
                                        >

                                                {fields.map((el, index) => (
                                                    <MenuItem key={index} value={el}>{el}</MenuItem>
                                                    ))}
                                    </TextField> 
                                    <TextField helperText="Ingrese un texto de bùsqueda." fullWidth value={searchField} onChange={(e) => handleChange('search', e.target.value)}/>
                            </Grid>

                        </Grid>

                        <Divider />

                        <Grid container>

                            {resultado.length === 0 ?
                                null
                                :
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Clave</TableCell>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Costo</TableCell>
                                            <TableCell align="right">Precio Público</TableCell>
                                            <TableCell align="right">Precio Mayoreo</TableCell>
                                            <TableCell align="right">Precio Especial</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            resultado.map((row, index) => (
                                                <TableRow key={index} index={index}>
                                                    <TableCell >{row.clave}</TableCell>
                                                    <TableCell component="th" scope="row">{row.descripcion}</TableCell>
                                                    <TableCell align="right">{row.costo}</TableCell>
                                                    <TableCell align="right">{row.precio1}</TableCell>
                                                    <TableCell align="right">{row.precio2}</TableCell>
                                                    <TableCell align="right">{row.precio3}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="delete"
                                                            onClick={() => removeProduct(row._id)}
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

}
            </Paper>
        </React.Fragment>
    )
}

export default Productos