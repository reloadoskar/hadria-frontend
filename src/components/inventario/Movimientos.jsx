import React, { useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Movimiento from './Movimiento'
import SelectorFecha from '../tools/SelectorFecha'
import {InventarioContext} from '../inventario/InventarioContext'
export default function Movimientos(){
    const {movimientos, loadMovimientos} = useContext(InventarioContext)
    return (
        <React.Fragment>
            <SelectorFecha action={loadMovimientos}/>
            { movimientos.length > 0 ?
                <Grid container spacing={2}  >
                    {movimientos.map((mov,i)=>(
                        <Movimiento mov={mov} key={i}  />
                    ))}
                </Grid>
                :
                <Grid item xs>
                    <Typography align="center">👻</Typography>
                </Grid>
            }
        </React.Fragment>
    )
}