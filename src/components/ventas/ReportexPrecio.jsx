import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@material-ui/core'
import { VictoryPie} from 'victory';
export default function ReportexPrecio({data}){
    const [barData, setBardata] = useState(false)
    useEffect(()=>{
        if(data){
            // console.log(Object.entries(data))
            let dataf = []
            Object.entries(data).forEach((item,i) => {
                if(item[1].precio > 1){
                    dataf.push({
                        precio: item[1].precio,
                        importe: item[1].timporte,
                        cantidad: item[1].tcantidad,
                        empaques: item[1].tempaques
                    })
                }
            })
            setBardata(dataf)
        }
        return ()=> setBardata(false)
    },[data])
    return barData ?
        <Card>
            {/* <CardHeader title="Ventas por Precio" /> */}
            <CardContent>
                {barData ? 
                    <VictoryPie
                        animate={{
                            duration: 2500,
                            easing: "elastic",
                        }}
                            // categories={{x:"precio", y:"empaques"}}
                            name="Ventas x precio"
                            // interpolation="natural"
                            data={barData}
                            x="precio"
                            y="empaques"
                            style={{
                                // data: {fill: "#ffd369", fillOpacity: 0.8},
                                labels: {fontSize: 8, fill: "#524656"},
                                // axis: {stroke: "#524656", strokeWidth: 12}
                            }}
                        /> 
                    : null
                }
            </CardContent>
        </Card>
    : null
}