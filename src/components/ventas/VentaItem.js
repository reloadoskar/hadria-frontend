import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Grid, Typography, Divider, IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { formatNumber } from '../Tools'
export default function VentaItem(props){
    const {basic=false, eliminar, index} = props
    const [item, setItem] = useState(null)
    useEffect(() => {
        if(props.item !== null){
            setItem(props.item)
        }
        return () => setItem(null)
    }, [props])
    
    function borrar(index){
        eliminar(index, item)
    }
    return (
        <Grid item xs={12}>
            {item === null ? null :
            <React.Fragment>
                <Grid container spacing={2}>
                    { basic ? null :
                        <Grid item xs={12} sm={3}>
                            <Typography variant="body2">
                                {item.ventaFolio} : {moment(item.venta.createdAt).format("hh:mm:ss A")}
                            </Typography>
                        </Grid>                                        
                    }
                    <Grid item xs={12} sm={basic ? 6 : 5}>
                        <Typography variant="body2">
                            #{item.compra.folio} - {item.producto.descripcion}
                        </Typography>
                    </Grid>                                        
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right" >
                            {item.empaques}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right" >
                            {item.cantidad}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right" >
                            x {item.precio}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right">
                            ${formatNumber(item.importe,2)}
                        </Typography>
                    </Grid>
                    { basic ? 
                        <Grid item xs={12} sm={1}>
                            <Typography align="right">
                                <IconButton size="small" onClick={() => borrar(index)}>
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                            </Typography>
                        </Grid>
                        :
                        null
                    }
                </Grid>
                <Divider />
            </React.Fragment>
            }
        </Grid>
    )
}