import React from 'react'
import { Grid, TextField, MenuItem, } from '@material-ui/core'
import { useTipoCompras } from '../hooks/useTipoCompras'
import { useProductors } from '../productors/ProductorContext'
export default function DatosGenerales({ provedor, tipoCompra, fecha, remision, ubicacion, ubicacions, handleChange, openDialogProvedor, openDialogTipoCompra }) {
    const { tipoCompras } = useTipoCompras()
    const {productors} = useProductors()
    return (
        <Grid container spacing={2} alignItems="center">

            <Grid item xs={12} md={4}>
                <TextField
                    autoFocus
                    id="provedor"
                    select
                    required
                    fullWidth
                    label="Selecciona un Proveedor"
                    margin="normal"
                    value={provedor}
                    onChange={(e) => handleChange('provedor', e.target.value)}
                    variant="outlined"
                >
                    <MenuItem onClick={(e) => openDialogProvedor()} value="">Nuevo...</MenuItem>
                    {productors.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option.nombre} {option.ref}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
                <TextField
                    id="tipoCompra"
                    select
                    required
                    fullWidth
                    label="Selecciona un Tipo de Compra"
                    value={tipoCompra}
                    onChange={(e) => handleChange('tipoCompra', e.target.value)}
                    margin="normal"
                    variant="outlined"
                >
                    <MenuItem onClick={(e) => openDialogTipoCompra()} value="">Nuevo...</MenuItem>
                    {tipoCompras.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option.tipo}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
                <TextField
                    fullWidth
                    id="remision"
                    type="text"
                    label="Número de remisión"
                    placeholder="Ingresa el Número de Remisión de la compra"
                    margin="normal"
                    value={remision}
                    onChange={(e) => handleChange('remision', e.target.value)}
                    variant="outlined"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    id="fecha"
                    label="Selecciona la fecha"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={fecha}
                    onChange={(e) => handleChange('fecha', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    id="ubicacion"
                    select
                    required
                    fullWidth
                    label="Selecciona una Ubicación"
                    value={ubicacion}
                    onChange={(e) => handleChange('ubicacion', e.target.value)}
                    margin="normal"
                    helperText="Por favor selecciona una Ubicación."
                    variant="outlined"
                >
                    {
                        ubicacions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option.nombre}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Grid>

        </Grid>

    )
}