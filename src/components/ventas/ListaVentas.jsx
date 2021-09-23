import React, { useEffect, useState } from 'react'
import { Paper, Button, Dialog, DialogActions, DialogContent, Grid, LinearProgress, Table, TableCell, TableHead, TableRow, TableBody, Typography, TableFooter, Tabs, Tab, TableContainer, Divider } from '@material-ui/core'
import VentaGrouped from '../ventas/VentaGrouped'
import {agrupaVentas, formatNumber, sumImporte, sumCantidad, sumEmpaques} from '../Tools'
import useStyles from '../hooks/useStyles'
import ReportexFecha from './ReporteVentasxFecha'
import ReportexPrecio from './ReportexPrecio'
import PaginationTable from '../paggination/PaginationTable'
export default function ListaVentas({ventas, open, close}){
    const [lasVentas, setLasVentas] = useState([])  
    const [ventasxfecha, setVxf] = useState([])
    const [ventasxprecio, setVxpr] = useState([])
    const classes = useStyles()
    const [tabSelected, setTab] = useState(1)
    // const [ventasxubicacion, setVxu] = useState([])
    // const [ventasxproducto, setVxp] = useState([])

    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(()=>{
        if(ventas){
            setLasVentas(ventas)
            // setVxp(agrupaVentas(ventas, "compraItem"))
            setVxf(agrupaVentas(ventas, "fecha"))
            // setVxu(agrupaVentas(ventas, "ubicacion"))
            setVxpr(agrupaVentas(ventas, "precio"))
        }
        return ()=> {
            setLasVentas([])
            // setVxp([])
            setVxf([])
            // setVxu([])
            // setVxpr([])
        }
    },[ventas])
    return (
        <Dialog 
            fullScreen
            open={open}
            onClose={()=>close()}>
            <DialogContent>
            {lasVentas.length > 0 ?
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Tabs
                            value={tabSelected}
                            onChange={selectTab}
                            centered>
                            <Tab label="Lista de ventas" value={1}/>
                            <Tab label="Reportes" value={2}/>
                        </Tabs>
                        <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                            {lasVentas
                            .filter(vta=>vta.venta.tipoPago==="CRÉDITO").length > 0 ?
                                <React.Fragment>
                                    <Grid item xs ={12}>
                                        <Typography align="center" className={classes.textoMirame}>VENTAS A CRÉDITO</Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <TableContainer component={Paper}>
                                        <Table >
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
                                                    .filter(vta=>vta.venta.tipoPago==="CRÉDITO")
                                                    .map((venta,i)=>(
                                                        <VentaGrouped venta={venta} key={i} />
                                                    ))
                                                }
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={5} align="right">Totales</TableCell>
                                                    <TableCell align="right">{formatNumber(sumCantidad(lasVentas.filter(vta=>vta.venta.tipoPago==="CRÉDITO")),1)}</TableCell>
                                                    <TableCell align="right">{formatNumber(sumEmpaques(lasVentas.filter(vta=>vta.venta.tipoPago==="CRÉDITO")),1)}</TableCell>
                                                    <TableCell align="right">-</TableCell>
                                                    <TableCell align="right">${formatNumber(sumImporte(lasVentas.filter(vta=>vta.venta.tipoPago==="CRÉDITO")),1)}</TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                        </TableContainer>
                                    </Grid>
                                </React.Fragment>
                                : null
                            }
                            {lasVentas.filter(vta=>vta.venta.tipoPago!=="CRÉDITO").length > 0 ?
                                <React.Fragment>
                                    <Grid item xs ={12}>
                                        <Typography align="center" className={classes.textoMirame}>VENTAS DE CONTADO</Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <PaginationTable data={lasVentas.filter(vta=>vta.venta.tipoPago!=="CRÉDITO")} />
                                    </Grid>
                                </React.Fragment>
                                : null
                            }
                        </div>
                        <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                            <Grid item xs={12} >
                                <Typography align="center">texto</Typography>
                                <ReportexFecha data={ventasxfecha}/>
                            </Grid>
                            {/* <Grid item xs={12} >
                                <ReportexFecha data={ventasxfecha}/>
                            </Grid> */}
                            <Grid item xs={12} >
                                <ReportexPrecio data={ventasxprecio}/>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                :
                    <LinearProgress variant="query" />
            }
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>close()} className={classes.botonSimplon} color="secondary">salir</Button>
            </DialogActions>
        </Dialog>
    )
}