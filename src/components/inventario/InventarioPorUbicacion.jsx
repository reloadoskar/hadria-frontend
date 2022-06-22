import React from 'react'
import { Card, CardHeader, Grid, Typography, CardContent } from '@material-ui/core'
import { formatNumber } from '../Tools'
import CoolProgressWtLabel from '../tools/CoolProgressWtLabel'

export default function InventarioPorUbicacion({inventario}){

    return inventario.map((ubicacion, i) => (
        <Grid item xs={12}>
            <Card>
                <CardHeader 
                    title={ubicacion.ubicacion.nombre} 
                    subheader={"Total unidades: " + formatNumber(ubicacion.stockGlobal,1) + " Total empaques: " + formatNumber(ubicacion.empaquesStockGlobal,1)}
                    />
                <CardContent>
                    {ubicacion.items.map((item,i)=>(
                        <div key={i}>
                            <Grid container alignItems='center'>              
                                <Grid item xs={3}>
                                    <Typography>{item.compra.folio}-{item.producto.descripcion}</Typography>
                                </Grid>                       
                                <Grid item xs={2}>
                                    <Typography>{item.clasificacion}</Typography>
                                </Grid>                       
                                <Grid item xs={3}>
                                    <Typography>
                                    { formatNumber(item.empaquesStock,1) } de {formatNumber(item.empaques,1)}{item.producto.empaque.abr}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                    { formatNumber(item.stock,1) } de {formatNumber(item.cantidad,1)}{item.producto.unidad.abr}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography align="right">
                                        {formatNumber( item.empaquesStock * 100 / item.empaques,1)}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <CoolProgressWtLabel variant="determinate" value={
                                       ( item.stock * 100 / item.cantidad)
                                    } />
                                </Grid>         
                            </Grid>
                        </div>
                    ))}

                </CardContent>
                
            </Card>
        </Grid>
    ))
}