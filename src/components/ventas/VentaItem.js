import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Grid, Typography, Divider, IconButton } from '@material-ui/core'
import ReceiptIcon from '@material-ui/icons/Receipt';
import { formatNumber } from '../Tools'
import {ticketVenta } from "../api"
import { useSnackbar } from 'notistack';
export default function VentaItem(props){
    const { enqueueSnackbar } = useSnackbar()
    const [item, setItem] = useState(null)
    useEffect(() => {
        if(props.item !== null){
            setItem(props.item)
        }
        return () => setItem(null)
    }, [props])

    function printTicket(venta){
		ticketVenta(venta).then(res=>{
			if(res.status === 'warning'){
                enqueueSnackbar(res.message, {variant: res.status} )
            }
            else{
                enqueueSnackbar("Se imprimió la venta.", {variant: "success"})
            }
		})
	}
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
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2">
                            {/* #{item.compra.folio} - {item.producto.descripcion} */}
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
                        <Typography variant="body2" align="right" >
                            x {item.precio}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                        <Typography variant="body2" align="right">
                            ${formatNumber(item.importe,2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography align="right">
                            <IconButton size="small" onClick={() => printTicket(item.venta)}>
                                <ReceiptIcon fontSize="small" />
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
            </React.Fragment>
            }
        </Grid>
    )
}