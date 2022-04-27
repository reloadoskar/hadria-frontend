import React, {useContext} from 'react'
import { Card, CardContent, CardHeader,
    LinearProgress, 
} from '@material-ui/core'
import {IngresoContext} from '../ingresos/IngresoContext'

import CuentasxcCliente from './CuentasxcCliente';
export default function CuentasxCobrar() {
    const { cuentasxCobrar } = useContext(IngresoContext)
    return (
        <Card>
            <CardHeader title="Créditos" />
                {cuentasxCobrar === undefined ?
                    <LinearProgress variant="query" />
                    :
                    <CardContent>
                        {cuentasxCobrar.filter(cliente => cliente.cuentas.length >0 )
                            .map((cliente, i) => (
                                <CuentasxcCliente  cliente={cliente} key={i} />  
                            )
                        )}
                </CardContent>
                }
        </Card>
    )
}