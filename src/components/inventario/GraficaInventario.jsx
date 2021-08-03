import React, {useEffect, useState} from 'react'
import { Grid, CircularProgress, Card, CardContent, Typography } from '@material-ui/core'
import { VictoryBar, VictoryChart,VictoryLabel, VictoryAxis } from 'victory';
import {sumStock, sumEmpStock, formatNumber} from "../Tools"
import useInventario from './useInventario'
import useStyles from '../hooks/useStyles';
export default function GraficaInventario({data}){
    const Inventario = useInventario()
    const [inventario, setInventario] = useState(false)
    const [barData, setBarData] = useState(null)
    const classes = useStyles()
    
    useEffect(() => {
        Inventario.getInventarioXUbic().then(res=>{
            setInventario(res.inventario)
        })
    },[])
    
    useEffect(()=>{
        if(inventario){
            let dataf = []
            inventario.forEach(item => {
                dataf.push({
                    ubicacion: item._id.nombre,
                    totalEmpaques: sumEmpStock(item.items),
                    totalStock: sumStock(item.items)
                })
            })
            setBarData(dataf)
        }
    },[inventario])
    return (
        <Card>
            <CardContent>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Inventario Disponible
                    </Typography>
                </Grid>
                <Grid item xs= {12}>        
                    { barData !== null ?
                        <VictoryChart
                            domainPadding={20}
                            height={250}
                            animate={{
                                duration: 1500,
                                easing: "elastic",
                            }}
                        >
                            <VictoryAxis key="x"
                                dependentAxis
                                style={{
                                    axis: { stroke: "#524656", strokeWidth: 2 },
                                    tickLabels:{fontSize:7, fill: "#524656" },
                                    grid: {
                                        stroke: ({ tick }) =>
                                        tick < 10 ? "transparent" : "#C2B6C6",
                                        strokeWidth: 1
                                    },
                                }} 
                            />
                            <VictoryAxis key="y"
                                orientation="bottom"
                                style={{
                                    tickLabels:{fontSize: 7, fill: "#524656"},
                                    axis: { stroke: "#524656", strokeWidth: 3 },
                                }}
                            />
                            <VictoryBar
                                name="Inventario"
                                data={barData}
                                labels={({ datum }) => `${formatNumber(datum.totalStock,1)} Kg \n ${formatNumber(datum.totalEmpaques,1)} Cajas`}
                                x="ubicacion"
                                y="totalStock"
                                style={{
                                    data: {fill: "#ffd369", fillOpacity: 0.8},
                                    labels: {fontSize: 8, fill: "#524656"},
                                    axis: {stroke: "#524656", strokeWidth: 12}
                                }}
                            />
                        </VictoryChart>
                        : 
                        <CircularProgress />
                    }
                </Grid>
            </Grid>
            </CardContent>
        </Card>
    )
}