import React, { useState } from 'react'
import {
    TextField,
    MenuItem,
    Grid,
    Button,
    Paper,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function Buscador() {
    const [searchText, setSearchText] = useState('')
    const [searchField, setSearchField] = useState('Clave')
    const fields = ['Clave', 'Folio', 'Proveedor', 'Remision', 'Ubicacion']
    const handleChange = (value) => {
        setSearchText(value)
    }
    return (
        <Grid container>
            
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    id="field"
                    label="Columna"
                    select
                    value={searchField}
                    margin="none"
                >
                    {fields.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            
            <Grid item xs>
                <TextField
                    fullWidth
                    id="search-text"
                    label="Buscar"
                    InputProps={{
                        endAdornment: (
                            <SearchIcon />
                        ),
                    }}
                    value={searchText}
                    margin="none"
                    onChange={(e) => handleChange(e.target.value)}
                />
            </Grid>

        </Grid>
    )
}