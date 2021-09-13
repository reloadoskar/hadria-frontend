import React, { useEffect, useState } from 'react'
// import { CircularProgress } from '@material-ui/core'
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory'
export default function GraficaVentas(props){
    const [data, setData] = useState(null)
    useEffect(() => {
        if(props.data){
            let ubics = props.data.filter(ubic => ubic.total > 1)
            if(ubics.length > 0){
                setData(ubics)
            }
        }
    },[props.data]) 
    return (
        <React.Fragment>
        { data ===  null || data === [] ?
            null
            :
            <VictoryChart key="chart"
                domainPadding={20}
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
                    tickLabels:{fontSize:5, fill: "#524656" },
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
                        tickLabels:{fontSize: 5, fill: "#524656"},
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