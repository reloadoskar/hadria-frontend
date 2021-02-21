import React, { useEffect, useState } from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import { formatNumber, sumCantidad, sumEmpaques } from '../Tools'

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
                    <Grid item xs={12} sm={2}>
                        <Typography>{venta.folio} : {venta.tipoPago}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography>{venta.cliente.nombre}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        {venta.items.length <= 0 ? null :
                            venta.items.map((item, i) =>(
                            <Grid container spacing={1} key={i}>

                                    <Grid item xs={1}>
                                        <Typography variant="body2" align="right">
                                            {item.compra.folio}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>{item.producto.descripcion}</Grid>
                                    <Grid item xs={1}>{item.empaques}</Grid>
                                    <Grid item xs={1}>{item.cantidad}</Grid>
                                    <Grid item xs={1}>{item.precio}</Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" align="right">
                                            {formatNumber(item.importe,2)}
                                        </Typography>
                                    </Grid>
                            </Grid>

                            ))
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="right">
                            Total: {sumEmpaques(venta.items)}/{formatNumber(sumCantidad(venta.items),2)} = {formatNumber(venta.importe,2)}
                        </Typography>
                    <Divider />
                    </Grid>
                </Grid>
            }
        </div>
    )
}