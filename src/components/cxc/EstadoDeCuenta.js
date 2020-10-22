import React from 'react'
import { Dialog, Grid, Typography, Divider } from '@material-ui/core'
import {formatNumber, sumImporte} from '../Tools'
export default function EstadoDeCuenta(props){
    const {cuentas, open} =props
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            {
                cuentas.map((venta, i) => (   
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
        </Grid>
    )
}