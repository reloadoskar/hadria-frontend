import React, {useState, useContext} from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import {agrupaVentas, agrupaItems, formatNumber, sumImporte, sumCantidad, sumEmpaques} from '../Tools'
import VentaItemPrecios from './VentaItemPrecios'
import VentaUbicacionPrecios from './VentaUbicacionPrecios'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
export default function VentasReportes({productos, ventas}){
    const [tabSelected, setTab] = useState(1)
    const {ubicacions} = useContext(UbicacionContext)
    const handleChange =(event, value) => {
        setTab(value)
    }
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Tabs
                    value={tabSelected}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Ventas Producto\Precios" value={1}/>
                    <Tab label="Ventas por Sucursal" value={2} />
                </Tabs>
            </Grid>

            <Grid item xs={12} value={tabSelected} role="tabpanel" hidden={tabSelected!== 1} container spacing={2}>
                { productos.map((producto, index) => (
                    <VentaItemPrecios 
                        item={producto} 
                        precios={agrupaVentas( ventas.filter(vta => vta.producto._id === producto.id ), "precio")} 
                        key={index}
                        />
                ))}
            </Grid>

            <Grid item xs={12} value={tabSelected} role="tabpanel" hidden={tabSelected!== 2} container spacing={2}>
                { ubicacions.filter(ubicacion => ubicacion.tipo === 'SUCURSAL').map((ubicacion, i) => (
                    <VentaUbicacionPrecios 
                        ubicacion={ubicacion}
                        precios={agrupaVentas( ventas.filter(vta => vta.ubicacion._id === ubicacion._id ), "precio")} 
                        key={i}
                    />

                ))}
            </Grid>

        </Grid>
    )
}