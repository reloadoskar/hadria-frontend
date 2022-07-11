import React, {useState} from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryBar } from 'victory'
import { agruparPorHora } from '../Tools'
export default function GraficaHorasDeVenta({data}){
    const [datos] = useState(agruparPorHora(data))
    return (
        <Container maxWidth="md">
        <Grid container >
            <Grid item xs={12}>
                {datos.length > 2 ?
                    <VictoryChart 
                        height={200}
                        domainPadding={30}
                        animate={{
                            duration: 1500,
                            easing: "elastic",
                        }}
                        >
                        <VictoryAxis key="x"
                            dependentAxis
                            label="Empaques"
                            style={{
                                fontSize: 12,
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
                            label="Hora"
                            style={{
                                tickLabels:{fontSize: 6, fill: "#524656"},
                                axis: { stroke: "#524656", strokeWidth: 3 },
                            }}    
                            tickLabelComponent={<VictoryLabel 
                                textAnchor="end"
                            />}                            
                        />
                        <VictoryBar
                            name="Empaques por Hora"
                            data={datos.sort((a,b)=>a.hora - b.hora)}
                            x="hora"
                            y="empaques" 
                            style={{
                                data: {fill: "#ffd369", fillOpacity: 0.8},
                                labels: {fontSize: 6, fill: "#524656"},
                                axis: {stroke: "#524656", strokeWidth: 12}
                            }}
                        />
                    </VictoryChart>
                    :
                    <Typography align="center">No hay suficientes datos, deja pasar un poco más de tiempo.⏱️⌛⏰🍔🍟</Typography>
                }
            </Grid>
        </Grid>
        </Container>
    )
}