import React from 'react'
import { Typography } from '@material-ui/core'
import CompraItem from './CompraItem'
export default function Items({inventario, selectItem}){
    return (
        <React.Fragment>
            {
                inventario.length === 0 ?
                    <Typography align="center" >No hay productos</Typography>
                    :
                    inventario.filter(item => item.empaquesStock > 0 ).map( (item, i) => (
                        <CompraItem elitem={item} key={i} action={selectItem} />
                    ))
            }
        </React.Fragment>
    )
}