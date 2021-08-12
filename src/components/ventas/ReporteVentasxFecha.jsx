import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, CardHeader } from '@material-ui/core'
import { VictoryBar, VictoryChart,VictoryLabel, VictoryAxis, VictoryTooltip, VictoryLine } from 'victory';
import {sumStock, sumEmpStock, formatNumber, sumImporte, sumCantidad, sumEmpaques} from "../Tools"
import moment from 'moment'
export default function ReportexFecha({data}){
    const [barData, setBardata] = useState(false)
    useEffect(()=>{
        if(data){
            // console.log(Object.entries(data))
            let dataf = []
            Object.entries(data).forEach((item,i) => {
                dataf.push({
                    fecha: item[1].fecha,
                    importe: item[1].timporte,
                    cantidad: item[1].tcantidad,
                    empaques: item[1].tempaques
                })
            })
            setBardata(dataf)
        }
        return ()=> setBardata(false)
    },[data])
    return barData ? 
        <VictoryChart
            domainPadding={40}
            height={300}
            // width={600}
            animate={{
                duration: 2500,
                easing: "elastic",
            }}
        >
            <VictoryLabel x={20} y={25} text={"Ventas del "+moment(barData[0].fecha).format("DD-MMMM")+" al "+moment(barData[barData.length-1].fecha).format("DD-MMMM")} />
            <VictoryLabel angle={-90} x={10} y={150} text="Cajas" />
            <VictoryAxis key="x"
                dependentAxis
                style={{
                    axis: { stroke: "#524656", strokeWidth: 2 },
                    tickLabels:{fontSize:10, fill: "#524656" },
                    grid: {
                        stroke: ({ tick }) =>
                        tick < 10 ? "transparent" : "#C2B6C6",
                        strokeWidth: 1
                    },
                }} 
            />
            <VictoryLine
                name="Ventas x fecha"
                // labelComponent={<VictoryTooltip />}
                // width={2500}
                labels={({ datum }) => `${moment(datum.fecha).format("DD-MMM")} \n$${formatNumber(datum.importe)}`}
                data={barData}
                x="fecha"
                y="empaques"
                style={{
                    data: {stroke: "#ffd369", strokeWidth: 10, fillOpacity: 0.8},
                    labels: {fontSize: 10, fill: "#524656"},
                    axis: {stroke: "#524656", strokeWidth: 12}
                }}
            /> 
        </VictoryChart>
        : null
}