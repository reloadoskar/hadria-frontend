import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
export default function VentaBasic(props){
    const [egreso, setEgreso] = useState(null)
    const classes = useStyles()
    useEffect(()=>{
        setEgreso(props.egreso)
        return () => {
            setEgreso(null)
        }
    }, [props])
    return (
        <div>
            {egreso === null ? null :
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={2}>
                        <Typography>{egreso.fecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{egreso.concepto}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{egreso.descripcion}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography className={classes.textoSangron} align="right">-{formatNumber(egreso.importe,2)}</Typography>
                    </Grid>
                </Grid>
            }
        </div>
    )
}