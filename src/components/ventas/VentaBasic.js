import React, { useEffect, useState } from 'react'
import { Grid, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@material-ui/core'
import { formatNumber, sumCantidad, sumEmpaques } from '../Tools'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VentaItem from './VentaItem';
import {ticketVenta } from "../api"
import { useSnackbar } from 'notistack';
export default function VentaBasic(props){
    const [venta, setVenta] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    useEffect(()=>{
        setVenta(props.venta)
        return () => {
            setVenta(null)
        }
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
        <Grid item xs ={12}>
            {venta === null ? null :
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}                        
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <Typography>{venta.folio} : {venta.tipoPago}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography>{venta.cliente.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography align="right">
                                    ${formatNumber(venta.importe,2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography align="right">
                                    <IconButton size="small" onClick={() => printTicket(venta)}>
                                        <ReceiptIcon fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>                    
                            {venta.items.length <= 0 ? null :
                                venta.items.map((item, i) =>(
                                    <VentaItem item={item} index={i} key={i}/>                                                                         
                                ))
                            }
                            <Grid item xs={12}>
                                <Typography variant ="body1" align="center">TOTALES</Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={3}>{formatNumber(sumEmpaques(venta.items),1)}</Grid>
                            <Grid item xs={3}>{formatNumber(sumCantidad(venta.items),1)}</Grid>
                            <Grid item xs={3} align="center"> -- </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body2" align="right">
                                    {formatNumber(venta.importe,2)}
                                </Typography>
                            </Grid>                        
                        </Grid>                    
                    </AccordionDetails>
                </Accordion>
            }
        </Grid>
    )
}