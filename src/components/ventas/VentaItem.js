import React, { useEffect, useState } from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import { formatNumber } from '../Tools'
import moment from 'moment'
export default function VentaItem(props){
    const [item, setItem] = useState(null)
    useEffect(() => {
        if(props.item !== null){
            setItem(props.item)
        }
        return () => setItem(null)
    }, [props])
    return (
        <Grid item xs={12}>
            {item === null ? null :
            <React.Fragment>
                <Grid container >
                    <Grid item xs={12} sm={2}>
                        <Typography variant="body2">
                            {item.venta.folio} : {moment(item.venta.createdAt).format("hh:mm:ss A")}
                        </Typography>
                    </Grid>                                        
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                            #{item.compra.folio} - {item.producto.descripcion}
                        </Typography>
                    </Grid>                                        
                    <Grid item xs={3} sm={2}>
                        <Typography variant="body2" align="right" >
                            {item.empaques}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Typography variant="body2" align="right" >
                            {item.cantidad}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="center" >
                            x {item.precio}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right">
                            ${formatNumber(item.importe,2)}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
            </React.Fragment>
            }
        </Grid>
    )
}