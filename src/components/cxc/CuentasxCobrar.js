import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, CardHeader, IconButton,
    Grid, 
    Typography,
    LinearProgress, 
} from '@material-ui/core'



import {formatNumber, sumSaldo} from '../Tools'

import CuentasxcCliente from './CuentasxcCliente';
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
                            {cuentas.filter(cliente => cliente.cuentas.length >0 )
                                .map((cliente, i) => (
                                    <CuentasxcCliente  cliente={cliente} key={i} />  
                                )
                            )}
                    </div>
                    <Typography align="right" variant="h6" children={"$" + formatNumber(total,2)} />
                </CardContent>
                }
        </Card>
    )
}