import React, {useEffect, useState} from 'react'
import { Grid, CircularProgress, Card, CardContent, Typography } from '@material-ui/core'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import {sumStock, sumEmpStock, formatNumber} from "../Tools"
import useInventario from './useInventario'
export default function GraficaInventario(){
    const Inventario = useInventario()
    const [inventario, setInventario] = useState(false)
    const [barData, setBarData] = useState(null)
    
    useEffect(() => {
        Inventario.getInventarioXUbic().then(res=>{
            setInventario(res.inventario)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
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
    },[inventario]) // eslint-disable-line react-hooks/exhaustive-deps
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
                                label="Empaques"
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
                                // label="Sucursales"
                                style={{
                                    tickLabels:{fontSize: 6, fill: "#524656"},
                                    axis: { stroke: "#524656", strokeWidth: 3 },
                                }}    
                                tickLabelComponent={<VictoryLabel 
                                    angle={90}
                                    textAnchor="start"
                                    dx={-5}
                                />}                            
                            />
                            <VictoryBar
                                labelComponent={<VictoryLabel
                                    />}
                                name="Inventario"
                                data={barData}
                                labels={({ datum }) => `
                                    ${formatNumber(datum.totalEmpaques,1)} Cajas \n 
                                    ${formatNumber(datum.totalStock,1)} Kg \n`}
                                x="ubicacion"
                                y="totalEmpaques"
                                style={{
                                    data: {fill: "#ffd369", fillOpacity: 0.8},
                                    labels: {fontSize: 6, fill: "#524656"},
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