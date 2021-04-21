import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../Tools'

export default function IngresoBasic(props){
    const [ingreso, setIngreso] = useState(null)
    useEffect(()=>{
        setIngreso(props.ingreso)
        return () => {
            setIngreso(null)
        }
    }, [props])
    return (
        <div>
            {ingreso === null ? null :
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <Typography>{ingreso.fecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{ingreso.concepto} | {ingreso.descripcion}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography align="right">{formatNumber(ingreso.importe,2)}</Typography>
                    </Grid>
                </Grid>
            }
        </div>
    )
}