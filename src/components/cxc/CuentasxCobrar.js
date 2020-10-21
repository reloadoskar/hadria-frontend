import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, Divider, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo} from '../Tools'
export default function CuentasxCobrar(props) {
    const {cuentas} = props
    const handleClick = (cuenta) => {
        console.log(cuenta)
    }
    return (
        <Card>
            <CardHeader title="Créditos" />
            <CardContent>
                {cuentas === null || cuentas.length === 0 ?
                    <LinearProgress variant="query" />
                    :
                    <div >                        
                        {cuentas.map((cuenta,i) =>(
                            <Accordion key={i}>
                                <AccordionSummary>
                                    <Grid container >
                                        <Grid item xs={2}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography variant="h6">
                                                {cuenta._id[0]}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                ${formatNumber(cuenta.saldo,2)}
                                            </Typography>
                                        </Grid>                                
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {
                                                cuenta.ventas.map((venta, i) => (   
                                                    <div key={i}>
                                                    <Grid container >
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" children="Fecha" />
                                                            <Typography variant="subtitle2" children={venta.fecha} />                                                    
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" children="Folio" />
                                                            <Typography variant="subtitle2" children={venta.folio} />
                                                            
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle2" children={venta.items.producto[0].descripcion} />
                                                            <Typography variant="caption" children={venta.items.cantidad + " X $" + venta.items.precio} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="right" children="Importe" />
                                                            <Typography variant="subtitle2" align="right" children={"$"+formatNumber(venta.importe,2)} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="right" children="Saldo" />
                                                            <Typography variant="subtitle2" align="right" children={"$"+formatNumber(venta.saldo,2)} />
                                                        </Grid>
                                                    </Grid>
                                                    <Divider />
                                                    </div>                                         
                                                ))
                                            }

                                        </Grid>

                                        <Grid item xs={12}>
                                            {                                                                        
                                                cuenta.pagos.map((pago,i) => {
                                                    if(pago.length !== 0) {
                                                        return (
                                                            <div>
                                                                <Typography children="Pagos:" />
                                                                <Grid container key={i}>
                                                                    <Grid item xs={12}>
                                                                        <Typography variant="caption" align="right" children={pago[0].fecha} />
                                                                        <Typography variant="subtitle2" align="right" children={"-$"+formatNumber(pago[0].importe,2)} />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                            )
                                                    }else{
                                                        return null
                                                    }
                                                })                                                                                            
                                            }
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))} 
                    </div>
                }
                <Typography align="center" variant="h6" children={"$" + formatNumber(sumSaldo(cuentas),2)} />
            </CardContent>
        </Card>
    )
}