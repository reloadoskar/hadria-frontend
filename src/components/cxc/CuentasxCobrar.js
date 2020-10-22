import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, Divider, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo, sumImporte} from '../Tools'
export default function CuentasxCobrar(props) {
    const {cuentas} = props
    const handleClick = (cuenta) => {
        console.log(cuenta)
    }
    const getCuentas = (clienteId) => {

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
                                            <Typography align="right" variant="h6">
                                                {cuenta._id[0].nombre}
                                            </Typography>
                                            <Typography align="right" variant="subtitle2">
                                                ${formatNumber(cuenta.saldo,2)}
                                            </Typography>
                                        </Grid>                                
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <EstadoDeCuenta cuentas={getCuentas(cuenta._id[0])}/> */}
                                    {/* <Grid container spacing={2}>
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
                                                            <Typography variant="subtitle2" children={venta.items.producto.descripcion} />
                                                            <Typography variant="caption" children={venta.items.cantidad + " X $" + venta.items.precio} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="right" children="Importe" />
                                                            <Typography variant="subtitle2" align="right" children={"$"+formatNumber(venta.importe,2)} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            {
                                                                venta.pagos.length === 0 ?
                                                                    <Typography variant="caption" children="No se encontraron pagos." />
                                                                    :
                                                                    <div>
                                                                        <Typography variant="caption" children="Pagos:" />
                                                                        {venta.pagos.map((pago,i)=>(
                                                                            <Typography color="error" variant="subtitle2" align="right" key={i} children={pago.fecha + " -$" + formatNumber(pago.importe,2)} />
                                                                        ))}
                                                                        <Divider />
                                                                        <Typography align="right" variant="subtitle2" children={"= $"+ formatNumber(sumImporte(venta.pagos),2)} />
                                                                    </div>
                                                            }
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
                                    </Grid> */}
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