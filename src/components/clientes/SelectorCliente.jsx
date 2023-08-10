import React, { useEffect, useState } from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import {useClientes} from '../clientes/ClienteContext'
export default function SelectorCliente({value, setValue, ubicacion}) {
    const {clientes} = useClientes()
    const [listaCLientes, setLista] = useState([])
    useEffect(()=>{
        if(ubicacion){
            console.log(ubicacion)
            setLista(clientes.filter(cl=>cl.ubicacion._id===ubicacion._id))
        }
        return ()=>{
            setLista([])
        }
    },[clientes, ubicacion])
    return(
        <TextField
            id="cliente" 
            select
            fullWidth
            value={value}
            setValue={(e)=>setValue(e.target.value)}
            variant='outlined'
            helperText="Selecciona un cliente"
        >
            <MenuItem value={value} key={value._id}>{value.nombre}</MenuItem>
            {listaCLientes.map((cliente,i)=>(
                <MenuItem value={cliente} key={i} >{cliente.nombre}</MenuItem>
            ))}
        </TextField>
    )
}