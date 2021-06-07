import { Divider, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../Tools'

export default function CxcBasic(props){
    const [cxc, setCxc] = useState(null)
    useEffect(()=>{
        setCxc(props.cxc)
        return () => {
            setCxc(null)
        }
    }, [props])
    return (
        <div>
            {cxc === null ? null :
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <Typography>{cxc.folio}: {cxc.tipoPago}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{cxc.cliente.nombre}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography align="right">{formatNumber(cxc.importe,2)}</Typography>
                        {cxc.acuenta > 0 ?
                            <Typography align="right" color="primary">a/c: {formatNumber(cxc.acuenta,2)}</Typography>
                            : null
                        }
                    </Grid>
                </Grid>
            }
        </div>
    )
}