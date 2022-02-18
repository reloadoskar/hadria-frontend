import React from 'react'
import { VictoryPie } from 'victory'
import { escalaDeColores } from '../hooks/useStyles'
export default function GraficaProductoPrecios({data=[]}){
    return !data ? null :
        <VictoryPie 
            colorScale={escalaDeColores}
            innerRadius={30}
            labelRadius={60}
            style={{ labels: { fontSize: 20, fill: "white" } }}
            animate={{
                duration: 1500,
                delay: 200,
                easing: 'bounce'
            }}
            data={data}
            x="tipo"
            y="total"
        />
}