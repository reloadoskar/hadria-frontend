import React, { useEffect, useState } from 'react'
import { Grid, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { formatNumber, sumCantidad, sumEmpaques } from '../Tools'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VentaItem from './VentaItem';
export default function VentaBasic(props){
    const [venta, setVenta] = useState(null)
    useEffect(()=>{
        setVenta(props.venta)
        return () => {
            setVenta(null)
        }
    }, [props])
    return (
        <Grid item xs ={12}>
            {venta === null ? null :
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}                        
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <Typography>{venta.folio} : {venta.tipoPago}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography>{venta.cliente.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography align="right">
                                    ${formatNumber(venta.importe,2)}
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