import React, {useEffect, useState} from 'react'
import { Grid, Typography } from '@material-ui/core'
export default function InventarioPorUbicacion({items}){
    const [inventario, setInventario] = useState([])
    // const {ubicacions} = useContext(UbicacionContext)

    useEffect(()=>{
        if(items){
            setInventario(items.reduce((grupo, item) => {
                (grupo[item.ubicacion._id] = grupo[item.ubicacion._id] || { id: item.ubicacion._id, ubicacion : item.ubicacion, stock:0, cantidad:0, empaques:0, empaquesStock:0, costo: item.costo})
                grupo[item.ubicacion._id].stock += item.stock
                grupo[item.ubicacion._id].cantidad += item.cantidad
                grupo[item.ubicacion._id].empaques += item.empaques
                grupo[item.ubicacion._id].empaquesStock += item.empaquesStock
                return grupo
            },[]))
        }
        return setInventario([])
    },[items])
    return inventario.map((item, i) => (
        <Grid container key={i}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography>{item.ubicacion.nombre}</Typography>
                </Grid>
            </Grid>            
        </Grid>
    ))
}