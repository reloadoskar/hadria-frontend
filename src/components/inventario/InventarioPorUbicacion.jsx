import React from 'react'
import { Card, CardHeader, Grid, Typography, CardContent } from '@material-ui/core'
import { formatNumber } from '../Tools'
import CoolProgressWtLabel from '../tools/CoolProgressWtLabel'
import { useEffect } from 'react';
const blue = {
    '--background-start': '#2196F3',
    '--background-end': '#21CBF3',
    '--box-shadow': 'rgba(33, 203, 243, .3)',
  };
  
const danger = {
'--background-start': '#9A031E',
'--background-end': '#FF8E53',
'--box-shadow': 'rgba(255, 105, 135, .3)',
};
export default function InventarioPorUbicacion({inventario}){
    // const [color, setColor] = React.useState(blue);
    useEffect(()=>{

    },[inventario])
    return inventario.map((ubicacion, i) => (
        <Grid item xs={12} key={i}>
            <Card>
                <CardHeader 
                    title={ubicacion.ubicacion.nombre} 
                    subheader={"Total unidades: " + formatNumber(ubicacion.stockGlobal,1) + " Total empaques: " + formatNumber(ubicacion.empaquesStockGlobal,1)}
                    />
                <CardContent>
                    {ubicacion.items.map((item,i)=>(
                        <div key={i}>
                            <Grid container alignItems='center'>              
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
                        </div>
                    ))}

                </CardContent>
                
            </Card>
        </Grid>
    ))
}