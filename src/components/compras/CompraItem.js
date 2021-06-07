import React, { useEffect, useState } from 'react'
import { Divider, Grid, MenuItem, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';
export default function CompraItem(props){
    const {verUbicacion = false} =props
    const [item, setItem] = useState(null)
    const classes = useStyles()
    useEffect(()=>{
        if(props.elitem){
            setItem(props.elitem)
        }
    },[props.elitem])

    function selectItem(item){
        props.action(item)
    }
    return(
        <React.Fragment>
        { item === null ? null : 
            <Grid container alignItems="center">
                <Grid item xs={12} sm={12}>
                    <MenuItem onClick={()=> selectItem(item)} >
                        <Grid container spacing={2} alignItems="flex-end">
                            {item.compra === undefined ?
                                null
                                :
                                <Grid item xs={2} sm={1}>
                                    <Typography>{item.compra.folio}</Typography>
                                </Grid>
                            }
                            {verUbicacion ? 
                                <Grid item xs={2} sm={1} >
                                    <Typography >{item.ubicacion.nombre}</Typography>
                                </Grid>
                                : null
                            }
                            <Grid item xs={10} sm={7}>
                                <Typography align="left">{item.producto.descripcion}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="right" className={classes.textoMiniFacheron} >{item.producto.empaque.abr}:</Typography>
                                <Typography align="right">{formatNumber(item.empaquesStock,2)}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography align="right" className={classes.textoMiniFacheron} >{item.producto.unidad.abr}:</Typography>
                                <Typography align="right">{formatNumber(item.stock,2)}</Typography>
                            </Grid>
                        </Grid>
                    </MenuItem>
                </Grid>
            </Grid>
        }
        <Divider />
        </React.Fragment>
    )   
}