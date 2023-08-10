import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'
import { useUbicacion } from './UbicacionContext'
export default function SelectorUbicacion({value, setValue}) {
    const {ubicacions} = useUbicacion()
    return(
        <TextField
            id="ubicacion"
            select
            fullWidth
            variant='outlined'
            helperText="Selecciona una ubicación destino"
            value={value}
            onClick={(e)=>setValue(e.target.value)}
        >
            <MenuItem value={value}>{value.nombre}</MenuItem>
            {!ubicacions ? null :
                ubicacions.filter((ub=>ub.tipo==="SUCURSAL")).sort((a,b)=>a.nombre < b.nombre ? -1 : 1).map((ub,i)=>(
                    <MenuItem value={ub}>{ub.nombre}</MenuItem>
                ))
            }
        </TextField>
    )
}