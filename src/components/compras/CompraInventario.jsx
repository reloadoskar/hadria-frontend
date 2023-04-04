import React, { useEffect, useState } from 'react'
import { Card, CardContent, Divider, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import CompraItemEditable from './CompraItemEditable'
import { agruparPorObjeto, formatNumber } from '../Tools'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import { useContext } from 'react'
import useStyles from '../hooks/useStyles'

export default function CompraInventario({items}){
    const {ubicacions} = useContext(UbicacionContext)
    const [inventario, setInventario] = useState(null)
    const [filtro, setFiltro] = useState("")
    const classes = useStyles()
    useEffect(()=>{
        if(items){
            setInventario(agruparPorObjeto(items, 'ubicacion'))
        }
    },[items])

    useEffect(()=>{
        if(filtro===""){
            setInventario(agruparPorObjeto(items, 'ubicacion'))
        }else{
            setInventario(agruparPorObjeto(items.filter(itm=>itm.ubicacion._id===filtro._id), 'ubicacion'))
        }
    },[items, filtro])

    return (
        <Card>
            <CardContent>
                {!inventario ? "no hay datos":
<div>
                    <Grid container style={{background:"#c4d4cb", borderRadius: 3,}}>
                        <Grid item xs={12}>
                            <Typography align="center">Filtros </Typography>
                        </Grid>
                        <Grid item xs={4}>                            
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="ubicacion"
                                label="Selecciona una ubicacion"
                                select
                                value={filtro}
                                onChange={(e)=>setFiltro(e.target.value)}
                            >
                                <MenuItem value={""} key="todo">TODO</MenuItem>
                                {ubicacions.map((itm,i)=>(
                                    <MenuItem value={itm} key={i}>{itm.nombre}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12}>
                            { inventario.map((el, i)=>(
                                <div key={i}>
                                    <Typography variant="h6">{el.ubicacion.nombre}</Typography>                                       
                                    {el.items.length > 0 ? 
                                        el.items.map((item,i)=>(
                                            <CompraItemEditable elitem={item} key={i} />
                                        ))
                                    : null}
                                    <Divider />
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item xs={8}><Typography align="right" className={classes.textoMiniFacheron}>TOTALES</Typography></Grid>
                                        <Grid item xs={1}>
                                            <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc,el)=>acc+=el.empaques,0),2)}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc,el)=>acc+=el.cantidad,0),2)}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc,el)=>acc+=el.empaquesStock,0),2)}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc,el)=>acc+=el.stock,0),2)}</Typography>
                                        </Grid>
                                    </Grid>
                                    
                                </div>
                            ))
                            }
                        </Grid>
                    </Grid>
                    </div>
            }
            </CardContent>
        </Card>
    )
}