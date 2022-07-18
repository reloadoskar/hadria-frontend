import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CoolProgressWtLabel from '../tools/CoolProgressWtLabel'
import { formatNumber } from '../Tools'
import {danger, blue} from '../hooks/useStyles'

export default function InventarioCompraItem({item}){
    return (
        <Grid item container>
                    <Grid item xs={8} sm={3}>
                        <Typography>{item.compra.folio}-{item.producto.descripcion}</Typography>
                    </Grid>                       
                    <Grid item xs={4} sm={2}>
                        <Typography>{item.clasificacion}</Typography>
                    </Grid>                       
                    <Grid item xs={12} sm={3}>
                        <Typography>
                        { formatNumber(item.empaquesStock,1) } de {formatNumber(item.empaques,1)}{item.producto.empaque.abr}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography>
                        { formatNumber(item.stock,1) } de {formatNumber(item.cantidad,1)}{item.producto.unidad.abr}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography align="right">
                            {formatNumber( item.empaquesStock * 100 / item.empaques,1)}%
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CoolProgressWtLabel 
                            variant="determinate" 
                            style={item.stock * 100 / item.cantidad < 30 ? danger : blue} 
                            value={
                                ( item.stock * 100 / item.cantidad)
                            } 
                        />
                    </Grid>         
                </Grid>
    )
}