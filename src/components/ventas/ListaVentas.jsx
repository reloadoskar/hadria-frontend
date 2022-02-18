import React, { useEffect, useState } from 'react'
import { Paper, Grid, LinearProgress, Table, TableCell, TableHead, TableRow, TableBody, Typography, TableFooter, TableContainer, Divider, Container} from '@material-ui/core'
import VentaGrouped from '../ventas/VentaGrouped'
import CountUpAnimation from '../tools/CountUpAnimation'
import { formatNumber, sumImporte, sumCantidad, sumEmpaques } from '../Tools'
import useStyles from '../hooks/useStyles'
import PaginationTable from '../paggination/PaginationTable'
import GraficaCreditoContado from '../charts/GraficaCreditoContado'
export default function ListaVentas({ ventas }) {
    const [lasVentas, setLasVentas] = useState([])
    const [ventasCredito, setVentasCredito] = useState([])
    const [ventasContado, setVentasContado] = useState([])
    const [tVentasCredito, setTventasCredito] = useState(0)
    const [tVentasContado, setTventasContado] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        if (ventas) {
            setLasVentas(ventas)
            setVentasCredito(ventas.filter(vta => vta.venta.tipoPago === "CRÉDITO"))
            setTventasCredito(ventas.filter(vta => vta.venta.tipoPago === "CRÉDITO").reduce((acc, vta) => acc += vta.importe, 0))
            setVentasContado(ventas.filter(vta => vta.venta.tipoPago !== "CRÉDITO"))
            setTventasContado(ventas.filter(vta => vta.venta.tipoPago !== "CRÉDITO").reduce((acc, vta) => acc += vta.importe, 0))
        }
        return () => {
            setLasVentas([])
            setVentasCredito([])
            setVentasContado([])
            setTventasContado(0)
            setTventasCredito(0)
        }
    }, [ventas])

    return lasVentas.length === 0 ? <LinearProgress variant="query" /> :
        <Grid container spacing={3}>
            <Container maxWidth="sm">
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                    <Typography align="center" className={classes.textoMiniFacheron}>Venta a Cr&eacute;dito </Typography>
                    <Typography variant="h5" align="center" className={classes.textoMirame}>$ <CountUpAnimation num={tVentasCredito} temp={800} /></Typography>
                    <Typography align="center" className={classes.textoMiniFacheron}>Venta de Contado </Typography>
                    <Typography variant="h5" align="center" className={classes.textoMirame}>$ <CountUpAnimation num={tVentasContado} /></Typography>
                </Grid>
                <Grid item xs={6}>
                    <GraficaCreditoContado data={[
                        {tipo: "Crédito", total: tVentasCredito},
                        {tipo: "Contado", total: tVentasContado}
                    ]} />
                </Grid>
            </Grid>
            </Container>
            <Grid item xs={12}>
                {ventasCredito.length === 0 ? null :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography align="center" className={classes.textoMirame}>VENTAS A CRÉDITO</Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Folio</TableCell>
                                            <TableCell>Ubicai&oacute;n</TableCell>
                                            <TableCell>Fecha</TableCell>
                                            <TableCell>Cliente</TableCell>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                            <TableCell align="right">Empaques</TableCell>
                                            <TableCell align="right">Precio</TableCell>
                                            <TableCell align="right">Importe</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lasVentas
                                            .filter(vta => vta.venta.tipoPago === "CRÉDITO")
                                            .map((venta, i) => (
                                                <VentaGrouped venta={venta} key={i} />
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={5} align="right">Totales</TableCell>
                                            <TableCell align="right">{formatNumber(sumCantidad(lasVentas.filter(vta => vta.venta.tipoPago === "CRÉDITO")), 1)}</TableCell>
                                            <TableCell align="right">{formatNumber(sumEmpaques(lasVentas.filter(vta => vta.venta.tipoPago === "CRÉDITO")), 1)}</TableCell>
                                            <TableCell align="right">-</TableCell>
                                            <TableCell align="right">${formatNumber(sumImporte(lasVentas.filter(vta => vta.venta.tipoPago === "CRÉDITO")), 1)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </React.Fragment>
                }
                {ventasContado.length === 0 ? null :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography align="center" className={classes.textoMirame}>VENTAS DE CONTADO</Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <PaginationTable data={lasVentas.filter(vta => vta.venta.tipoPago !== "CRÉDITO")} />
                        </Grid>
                    </React.Fragment>
                }

            </Grid>
        </Grid>
}