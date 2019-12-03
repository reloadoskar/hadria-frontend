import React from 'react'
import { Grid, Typography, Paper, Tooltip } from '@material-ui/core';

const ResumenBig = ({ tipoCompra, data, formatNumber }) => {
    return (
        <Paper>
        <Grid container spacing={2}>
            {
                tipoCompra === "CONSIGNACION"
                    ?
                    <React.Fragment>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Ventas" />
                            <Typography align="center" variant="h4" children={"$" + formatNumber(data.totalVenta)} />
                        </Grid>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Comisión" />
                            <Typography align="center" color="secondary" variant="h4" children={"-$" + formatNumber(data.comision)} />
                        </Grid>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Gastos" />
                            <Typography align="center" color="secondary" variant="h4" children={"-$" + formatNumber(data.totalEgresos)} />
                        </Grid>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Pagos" />
                            <Typography align="center" color="secondary" variant="h4" children={"-$" + formatNumber(data.totalPagos)} />
                        </Grid>
                        <Tooltip title="Ventas - Comisión - Gastos" placement="top">
                            <Grid item xs>
                                <Typography align="center" variant="body1" children="Saldo Productor" />
                                <Typography
                                    align="center"
                                    variant="h4"
                                    color={
                                        (data.totalVenta - data.comision - data.totalEgresos - data.totalPagos) < 0 ? 'secondary' : 'inherit'
                                    }
                                    children={"$" + formatNumber((data.totalVenta - data.comision - data.totalEgresos - data.totalPagos))} paragraph/>
                            </Grid>
                        </Tooltip>

                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Ventas" />
                            <Typography align="center" variant="h4" children={"$"+formatNumber(data.totalVenta)} />
                        </Grid>
                        <Tooltip title="Inventario disponible x costo" placement="top">
                            <Grid item md xs>
                                <Typography align="center" variant="body1" children="Inventario" />
                                <Typography align="center" variant="h4" children={"$"+formatNumber(data.costoInventario)} />
                            </Grid>
                        </Tooltip>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Costo" />
                            <Typography align="center" variant="h4" color="error" children={"-$" + formatNumber(data.compra.importe)} />
                        </Grid>
                        <Grid item xs>
                            <Typography align="center" variant="body1" children="Gastos" />
                            <Typography align="center" variant="h4" color="error" children={"-$" + formatNumber(data.totalEgresos)} />
                        </Grid>
                        <Tooltip title="Ventas + Inventario - Costo - Gastos" placement="top">
                            <Grid item xs>
                                <Typography align="center" variant="body1" children="Total" />
                                <Typography
                                    align="center"
                                    variant="h4"
                                    color={
                                        (data.totalVenta + data.costoInventario - data.compra.importe - data.totalEgresos) < 0 ? 'secondary' : 'inherit'
                                    }
                                    children={"$" + formatNumber((data.totalVenta + data.costoInventario - data.compra.importe - data.totalEgresos))} />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="No incluye inventario disponible" placement="top">
                            <Grid item xs>
                                <Typography align="center" variant="body1" children="Resultado:" />
                                <Typography align="center" variant="h4"
                                    children={
                                        "$"+formatNumber((data.totalVenta - data.compra.importe -data.totalEgresos))
                                    }
                                    color={
                                        (data.totalVenta - data.compra.importe) < 0 ? 'secondary' : 'inherit'
                                    } paragraph />
                            </Grid>
                        </Tooltip>
                    </React.Fragment>
            }
        </Grid>
        </Paper>
    )
}


export default ResumenBig