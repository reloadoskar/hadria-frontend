import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory'
export default function GraficaVentas(props){
    const [data, setData] = useState(null)
    useEffect(() => {
        if(props.data){
            setData(props.data)
        }
    },[props.data]) 
    return (
        <React.Fragment>
        { data ===  null || data === [] ?
            <CircularProgress />
            :
            <VictoryChart key="chart"
                height={250}
                // animate={{
                //     duration: 1500,
                //     easing: "elastic",
                // }}
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
                        tickLabels:{fontSize: 8, fill: "#524656"},
                        axis: { stroke: "#524656", strokeWidth: 1 },
                    }}
                    /> 

                <VictoryBar key="bar"
                    barRatio={0.9}
                    alignment="middle"
                    data={data}
                    x="ubicacion.nombre"
                    y="total"
                    style={{
                        data: {fill: "#ffd369", fillOpacity: 0.8},                        
                        // labels: { fill: "#524656" }
                    }}
                />
              </VictoryChart> 
        }
        </React.Fragment>
    )
}