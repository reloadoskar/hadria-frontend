import React, { useState } from 'react'
import {
    TextField,
    MenuItem,
    Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function Buscador() {
    const [searchText, setSearchText] = useState('')
    const [searchField, setSearchField] = useState('Clave')
    const fields = ['Clave', 'Folio', 'Proveedor', 'Remision', 'Ubicacion']
    const handleChange = (field, value) => {
        switch(field){
            case 'field':
                return setSearchField(value)
            case 'text':
                return setSearchText(value)
            default:
                return null
        }
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
                    onChange={(e) => handleChange('field', e.target.value)}
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
                    onChange={(e) => handleChange('text', e.target.value)}
                />
            </Grid>

        </Grid>
    )
}