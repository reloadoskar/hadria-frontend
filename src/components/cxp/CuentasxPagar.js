import React, {useContext} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, 
    Grid, 
    Typography,
    LinearProgress,
} from '@material-ui/core'
import EstadoDeCuenta from '../cxp/EstadoDeCuenta'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo} from '../Tools'
import {EgresoContext} from '../egresos/EgresoContext'

export default function CuentasxPagar({cuentas=[], total=0}) {
    const {cuentasPorPagar} = useContext(EgresoContext)
    return (
        <Card>
            <CardHeader title="Deudas" />
                {cuentas === null ?
                    <LinearProgress variant="query" />
                    :
                    <CardContent>
                        {cuentasPorPagar.filter(prov=> sumSaldo(prov.cuentas) > 0)
                        .map((prov,i) =>(
                            <Accordion key={i}>
                                <AccordionSummary>
                                    <Grid container >
                                        <Grid item xs={1}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography align="right">
                                                {prov.nombre}
                                            </Typography>
                                            <Typography align="right" variant="subtitle2">
                                                ${formatNumber(sumSaldo(prov.cuentas),2)}
                                            </Typography>
                                        </Grid>                                
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <EstadoDeCuenta cuentas={prov.cuentas}/>
                                    </Grid>
                                </AccordionDetails> 
                            </Accordion>
                                )
                        )} 
                        <Typography align="right" variant="h6" children={"$" + formatNumber(total,2)} />
                    </CardContent>
                }
        </Card>
    )
}