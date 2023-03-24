import React, { useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Movimiento from './Movimiento'
import SelectorFecha from '../tools/SelectorFecha'
import {InventarioContext} from '../inventario/InventarioContext'
export default function Movimientos(){
    const {movimientos} = useContext(InventarioContext)
    return (
        <div>
            <SelectorFecha />
                <Grid container spacing={2}  >
                    { movimientos.length === 0 ? 
                        <Grid item xs>
                            <Typography align="center">No hay resultados. 👻</Typography>
                        </Grid>
                        :
                        movimientos.map((mov,i)=>(
                        <Movimiento mov={mov} key={i}  />
                    ))}
                </Grid>
        </div>
    )
}