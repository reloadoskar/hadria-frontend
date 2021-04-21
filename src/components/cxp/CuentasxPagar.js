import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, 
    Grid, 
    Typography,
    LinearProgress,
} from '@material-ui/core'
import EstadoDeCuenta from '../cxp/EstadoDeCuenta'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo} from '../Tools'
export default function CuentasxPagar(props) {
    const {cuentas=null, total} = props

    return (
        <Card>
            <CardHeader title="Deudas" />
                {cuentas === null ?
                    <LinearProgress variant="query" />
                    :
                    <CardContent>
                        <div >                        
                        {cuentas.map((prov,i) =>{
                            let sldo = sumSaldo(prov.cuentas)
                            if(sldo>0){
                                return(
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
                                                        {prov.nombre}
                                                    </Typography>
                                                    <Typography align="right" variant="subtitle2">
                                                        ${formatNumber(sumSaldo(prov.cuentas),2)}
                                                    </Typography>
                                                </Grid>                                
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <EstadoDeCuenta cuentas={prov.cuentas}/>
                                        </AccordionDetails> 
                                    </Accordion>
                                )
                            }else{
                                return false
                            }
                        })} 
                    </div>
                    <Typography align="right" variant="h6" children={"$" + formatNumber(total,2)} />
                </CardContent>
                }
        </Card>
    )
}