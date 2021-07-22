import React from 'react'
import { Card, CardContent, CardHeader,
    Typography,
    LinearProgress, 
} from '@material-ui/core'
import {formatNumber} from '../Tools'
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
                        {cuentas.filter(cliente => cliente.cuentas.length >0 )
                            .map((cliente, i) => (
                                <CuentasxcCliente  cliente={cliente} key={i} />  
                            )
                        )}
                    <Typography align="right" variant="h6" children={"$" + formatNumber(total,2)} />
                </CardContent>
                }
        </Card>
    )
}