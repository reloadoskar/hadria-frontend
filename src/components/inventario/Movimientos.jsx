import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import Movimiento from './Movimiento'

export default function Movimientos({movimientos=[]}){
    
    return movimientos.length > 0 ?
        <Grid container spacing={2}  >
            {movimientos.map((mov,i)=>(
                <Movimiento mov={mov} key={i}  />
            ))}
        </Grid>
    :
        <Grid item xs>
            <Typography align="center">No hay movimientos. 👻</Typography>
        </Grid>
}