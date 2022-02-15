import React from 'react'
import { VictoryPie } from 'victory'
import { escalaDeColores } from '../hooks/useStyles'
export default function GraficaProductoPrecios({data=[]}){
    return !data ? null :
        <VictoryPie 
            colorScale={escalaDeColores}
            innerRadius={50}
            animate={{
                duration: 2000,
                delay: 200,
                easing: 'bounce'
            }}
            data={data}
            x="precio"
            y="tcantidad"
        />

}