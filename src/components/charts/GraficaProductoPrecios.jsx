import React from 'react'
import { VictoryPie, } from 'victory'

export default function GraficaProductoPrecios({data}){
    return !data ? null :
        <VictoryPie 
            colorScale={["tomato", "orange", "gold", "cyan", "navy", "green" ]}
            innerRadius={50}
            animate={{duration: 2000}}
            data={data}
            x="precio"
            y="tcantidad"
        />

}