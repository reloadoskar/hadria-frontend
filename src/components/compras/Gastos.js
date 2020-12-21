import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, MenuItem, Table, TableRow, TextField, TableCell, TableBody } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import {formatNumber} from '../Tools'
const CrearGasto = (props) => {
    var {crear} = props
    const classes = useStyles()
    const conceptos = ["FLETE", "MANIOBRAS"]
    const [gasto, setGasto] = useState({
        concepto: '',
        descripcion: '',
        importe: 0,        
    })
    const [gastoReady, setGastoReady] = useState(false)

    const handleChange = (field, value) => {
        switch(field){
            case 'descripcion':
                return setGasto({...gasto, [field]: value.toUpperCase()})
            default: 
            setGasto({...gasto, [field]: value})
            return isGastoReady()
        }
    }

    const isGastoReady = () => {
        if(gasto.concepto !== '' && gasto.descripcion !== '' && gasto.importe !== 0){
            return setGastoReady(true)
        }
        else{
            return setGastoReady(false)
        }
    }

    const limpiarTodo = () => {
        setGasto({
            concepto: '',
            descripcion: '',
            importe: 0,        
        })
        setGastoReady(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(gastoReady){
            crear(gasto)
            limpiarTodo()
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    autoFocus
                    fullWidth
                    id="concepto"
                    label="Concepto"
                    select
                    value={gasto.concepto}
                    variant="outlined"
                    onChange={(e) => handleChange('concepto', e.target.value)}
                    >
                    {
                        conceptos.map((concepto, i) => (
                            <MenuItem key={i} value={concepto}>
                                {concepto}
                            </MenuItem>
                        ))
                    }

                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    fullWidth
                    id="descripcion"
                    label="Descripción"
                    type="text"
                    value={gasto.descripcion}
                    variant="outlined"
                    onChange={(e) => handleChange('descripcion', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    fullWidth
                    id="importe"
                    label="Importe"
                    type="number"
                    value={gasto.importe}
                    variant="outlined"
                    onChange={(e) => handleChange('importe', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <Button 
                    fullWidth
                    disabled={ !gastoReady }
                    className={classes.botonGenerico}
                    onClick={(e) => handleSubmit(e)}>
                    Crear
                </Button>
            </Grid>
        </Grid>
    )
}

const ListaGastos = ({gastos, total}) => {
    return (
        <Grid container >
            <Grid item xs={12}>
            {
                gastos.length > 0 ?
                        <Table>
                            <TableBody>

                        {
                            gastos.map((el, i) => (
                                <TableRow key={i}>
                                    <TableCell >{i+1} {el.concepto}</TableCell>
                                    <TableCell >{el.descripcion}</TableCell>
                                    <TableCell align="right">{el.importe}</TableCell>
                                </TableRow>
                            ))
                        }
                            <TableRow>
                                <TableCell colSpan="2" align="right">Total:</TableCell>
                                <TableCell align="right">{formatNumber(total,1)}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                :
                    null
            }
            </Grid>
        </Grid>
    )
}

export default function Gastos(props){
    return(
        <Card>
            <CardContent>
                <Grid container>
                    
                    <CrearGasto {...props} />                    
                    <ListaGastos {...props} />
                </Grid>
            </CardContent>
        </Card>
    )
}