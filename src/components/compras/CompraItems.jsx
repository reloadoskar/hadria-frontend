import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core'
import CompraItem from './CompraItem'

export default function Items({inventario, selectItem}){
    const [items, setItems] = useState([])
    
    useEffect(()=>{
        setItems(inventario)
    },[inventario])
    
    return (
        <Grid item container spacing={2} >
            {items
            // .filter(item => item.stock > 1 ) se solicito remover este filtro, veremos despues si se vuelve a implementar
            .map( (item, i) => (
                <CompraItem elitem={item} key={i} action={selectItem} />
            ))}
        </Grid>
    )
}