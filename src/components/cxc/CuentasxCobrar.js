import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, 
    Grid, 
    Typography,
    LinearProgress, 
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo} from '../Tools'
import EstadoDeCuenta from './EstadoDeCuenta'
export default function CuentasxCobrar(props) {
    const {cuentas, total} = props
    return (
        <Card>
            <CardHeader title="Créditos" />
                {cuentas === undefined ?
                    <LinearProgress variant="query" />
                    :
                    <CardContent>
                        <div >                        
                        {cuentas.map((cliente,i) =>{
                            return cliente.cuentas.length > 0 ?
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
                                                {cliente.nombre}
                                            </Typography>
                                            <Typography align="right" variant="subtitle2">
                                                ${formatNumber(sumSaldo(cliente.cuentas),2)}
                                            </Typography>
                                        </Grid>                                
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <EstadoDeCuenta cuentas={cliente.cuentas}/>                                    
                                </AccordionDetails> 
                            </Accordion>
                            : null
                        })} 
                    </div>
                    <Typography align="right" variant="h6" children={"$" + formatNumber(total,2)} />
                </CardContent>
                }
        </Card>
    )
}