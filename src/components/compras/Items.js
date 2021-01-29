import React from 'react'
import { Typography } from '@material-ui/core'
import AgregarItem from './AgregarItem'
import ListaItems from './ListaItems'

export default function Items(props){
    var {items} = props
    return(
        <div>
            <AgregarItem {...props} />                
            { 
                items.length === 0 ?
                    <Typography>No se encontraron productos.</Typography>
                    :
                    <ListaItems {...props} />
            }
            
        </div>
    )
}