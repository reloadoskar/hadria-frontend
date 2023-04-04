import React, { useEffect, useState } from 'react'
import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';
import moment from 'moment';
export default function CompraItemEditable({elitem}) {
    const [item, setItem] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [empaquesStock, setEmpaques] = useState(0)
    const [stock, setStock] = useState(0)
    const classes = useStyles()
    useEffect(() => {
        if (elitem) {
            setItem(elitem)
            setEmpaques(elitem.empaquesStock)
            setStock(elitem.stock)
        }
    }, [elitem])

    const updateCompraItem = async () =>{
        setItem({...item, empaquesStock: empaquesStock, stock: stock})
    }

    return !item ? null :
        <Grid container spacing={2}>
            <Grid item xs>
                {!editMode ?
                    <IconButton size="small" onClick={()=>setEditMode(true)}>
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    :
                    <div>
                    <IconButton size="small" onClick={()=>setEditMode(false)}>
                        <CancelIcon />
                    </IconButton>
                    <IconButton size="small" onClick={()=>updateCompraItem()}>
                        <CheckIcon />
                    </IconButton>

                    </div>
                }
            </Grid>
            <Grid item xs={11} sm={7}>
                <Typography align="left" className={classes.textoMiniFacheron}>{moment(item.createdAt).format("D/MM/YY h:mm a")}</Typography>
                <Typography align="left" style={ item.clasificacion === "S/C" ? {color:"#007cbe"} : null}>
                    {item.producto.descripcion} {item.clasificacion}</Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography align="left" className={classes.textoMiniFacheron}> { item.clasificacion === "S/C" ? "ORIGEN": "ENVIADO:" }</Typography>
                <Typography align="right">
                    {formatNumber(item.empaques, 2)}{item.producto.empaque ? item.producto.empaque.abr : item.productoempaque.abr} | {formatNumber(item.cantidad, 2)}{item.producto.unidad ? item.producto.unidad.abr : item.productounidad.abr}
                </Typography>
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography align="left" className={classes.textoMiniFacheron}>DISPONIBLE: </Typography>
                {!editMode ? 
                    <Typography align="right" className={item.empaquesStock > 0.2 || item.stock > 0.9 ? classes.textoMirame : null}>
                        {formatNumber(item.empaquesStock, 2)}{item.producto.empaque ? item.producto.empaque.abr : item.productoempaque.abr} | {formatNumber(item.stock, 2)}{item.producto.unidad ? item.producto.unidad.abr : item.productounidad.abr}
                    </Typography>
                    :
                    <div>
                    <TextField 
                        id="empaques"
                        label = "Empaques"
                        value={empaquesStock}
                        onChange={(e)=>setEmpaques(e.target.value)}
                    />
                    <TextField 
                        id="cantidad"
                        label = "Cantidad"
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                    />
                    </div>
                }
            </Grid>
        </Grid>
            
}