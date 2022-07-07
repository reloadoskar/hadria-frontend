import React, {useState} from 'react'
import { Grid, Typography } from '@material-ui/core'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory'
import { agruparPorHora } from '../Tools'
export default function GraficaHorasDeVenta({data}){
    const [datos] = useState(agruparPorHora(data))
    return (
        <Grid container >
            <Grid item xs={12}>
                {datos.length > 2 ?
                    <VictoryChart 
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
                            label="Hora"
                            style={{
                                tickLabels:{fontSize: 6, fill: "#524656"},
                                axis: { stroke: "#524656", strokeWidth: 3 },
                            }}    
                            tickLabelComponent={<VictoryLabel 
                                textAnchor="end"
                            />}                            
                        />
                        <VictoryLine
                            data={datos.sort((a,b)=>a.hora - b.hora)}
                            interpolation="natural"
                            x="hora"
                            y="empaques" 
                        />
                    </VictoryChart>
                    :
                    <Typography align="center">No hay suficientes datos, deja pasar un poco más de tiempo.⏱️⌛⏰🍔🍟</Typography>
                }
            </Grid>
        </Grid>
    )
}