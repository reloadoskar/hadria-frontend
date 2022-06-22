import React, {useEffect, useState} from 'react'
import { Grid, CircularProgress, Card, CardContent, Typography } from '@material-ui/core'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import {sumStock, sumEmpStock, formatNumber} from "../Tools"
import useInventario from './useInventario'
export default function GraficaInventario({inventario}){
    // const Inventario = useInventario()
    // const [inventario, setInventario] = useState(false)
    const [barData, setBarData] = useState(null)
        
    useEffect(()=>{
        if(inventario){           
            setBarData(inventario)
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
                            <VictoryBar
                                horizontal
                                // domain={{y: [0, 180]}}
                                barRatio={0.8}
                                labelComponent={<VictoryLabel
                                    textAnchor="middle"
                                    // dx={-10}
                                    />}
                                name="Inventario"
                                data={barData}
                                labels={({ datum }) => `${formatNumber(datum.empaquesStockGlobal,1)} Cjs`}
                                x="ubicacion.nombre"
                                y="empaquesStockGlobal"
                                style={{
                                    data: {fill: "#ffd369", fillOpacity: 0.8},
                                    labels: {fontSize: 6, fill: "#524656"},
                                    axis: {stroke: "#524656", strokeWidth: 12}
                                }}
                            />
                            <VictoryAxis key=""
                                // orientation="bottom"
                                // label="Sucursales"
                                style={{
                                    tickLabels:{fontSize: 6, fill: "#524656"},
                                    axis: { stroke: "#524656", strokeWidth: 3 },
                                }}    
                                tickLabelComponent={<VictoryLabel 
                                    // angle={-90}
                                    textAnchor="end"
                                    // dx={-2}
                                    // dy={-2}
                                />}                            
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