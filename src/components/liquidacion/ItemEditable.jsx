import { Typography, Grid, TextField, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from '../hooks/useStyles'
import {formatNumber} from '../Tools'
export default function ItemEditable ({elItem, editMode, sumar, eliminar, id}){
    const [item, setItem] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        if(elItem){
            elItem.id = id
            setItem(elItem)
        }
        return () => {
            setItem(null)
        }
    }, [elItem, id])
    const handleChange = (field, value) => {
        let newImporte = 0
        newImporte = item.cantidad * value
        elItem.importe = newImporte
        setItem({...item, [field]:value, importe: newImporte })
        sumar()
    }

    const handleDelete = (idx) => {
        eliminar(idx)
        sumar()
    }
    return !item ? null :
        <Grid container alignItems="center" spacing={2}>
            {editMode ? 
                <Grid item xs={1}>
                    <IconButton onClick={()=>handleDelete(item.id)}>
                        <CancelIcon />
                    </IconButton>
                </Grid>
                : null 
            }
            <Grid item xs={ editMode ? 4 : 5}>
                <Typography>
                    {item.producto.descripcion}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography className={classes.textoMiniFacheron} align="right">Cant. | Emp.</Typography>
                <Typography align="right">
                    {formatNumber(item.cantidad,2)} {item.producto.unidad.abr} | {formatNumber(item.empaques)} {item.producto.empaque.abr}
                </Typography>
            </Grid>                                                            
            <Grid item xs={2}>
                <Typography className={classes.textoMiniFacheron} align="right">Precio</Typography>
                
                {editMode ? 
                    // <Typography align="right" >
                        <TextField
                            fullWidth
                            type="number" 
                            value={formatNumber(item.precio)} 
                            onChange={(e)=> handleChange('precio',e.target.value)}
                            variant="outlined"
                            />
                    // {/* </Typography> */}
                    :
                    <Typography align="right" >$
                        {item.precio ? formatNumber(item.precio,1) : 0}
                    </Typography>
                }
            </Grid>
            <Grid item xs={2}>
                <Typography className={classes.textoMiniFacheron} align="right">Importe</Typography>
                <Typography align="right" >$
                    {formatNumber(item.importe,1)}
                </Typography>
            </Grid>
        </Grid>    
}
