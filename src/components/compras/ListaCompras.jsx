import { CircularProgress, Grid } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import CompraBasic from './CompraBasic'
export default function ListaCompras({compras, editCompra, verCompra}){
    const [lasCompras, setLasCompras] = useState(null)

    useEffect(() => {
        if(compras){
            setLasCompras(compras)
        }
        return () => setLasCompras(null)
    },[compras])

    return(
        <Grid item container xs={12} spacing={2}>
            {lasCompras === null ?
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
                :
                lasCompras.map((compra, i) => (
                    <CompraBasic 
                        key={i} 
                        compra={compra} 
                        editCompra={editCompra}  
                        verCompra={verCompra}
                    />
                ))
            }
        </Grid>
    )
}