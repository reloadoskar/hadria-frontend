import React, {useState, useEffect} from 'react'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import {formatNumber} from '../Tools'
export default function GraficaBarras({losDatos}){
    const [data, setData] = useState(null)
    useEffect(()=>{
        setData(losDatos)
    },[losDatos])
    return !data ? null :
        <VictoryChart
            domainPadding={20}
            height={280}
            animate={{
                duration: 1850,
                easing: "elastic",
            }}>
            <VictoryAxis key="x" dependentAxis
                style={{
                    axis: { stroke: "#524656", strokeWidth: 2 },
                    tickLabels:{fontSize:7, fill: "#524656" },
                    grid: {
                        stroke: ({ tick }) =>
                        tick < 10 ? "transparent" : "#C2B6C6",
                        strokeWidth: 1
                    },
                }} />
            <VictoryAxis key="y"
                orientation="bottom"
                style={{
                    tickLabels:{fontSize: 6, fill: "#524656"},
                    axis: { stroke: "#524656", strokeWidth: 3 },
                }}
            />
            <VictoryBar 
                name="ComprasMes"
                data={data}
                labels={({ datum }) => `${formatNumber(datum.importe)} `}
                x="provedor.clave"
                y="importe"
                style={{
                    data: {fill: "#ffd369", fillOpacity: 0.8},
                    labels: {fontSize: 6, fill: "#524656"},
                    axis: {stroke: "#524656", strokeWidth: 12}
                }}
            />
        </VictoryChart>
}