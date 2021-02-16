import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../Tools'

export default function VentaBasic(props){
    const [venta, setVenta] = useState(null)
    useEffect(()=>{
        setVenta(props.venta)
        return () => {
            setVenta(null)
        }
    }, [props])
    return (
        <div>
            {venta === null ? null :
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <Typography>{venta.folio} : {venta.tipoPago}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{venta.cliente.nombre}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography align="right">{formatNumber(venta.importe,2)}</Typography>
                    </Grid>
                </Grid>
            }
        </div>
    )
}