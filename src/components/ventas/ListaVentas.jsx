import React, { useEffect, useState } from 'react'
import { Paper, Dialog, DialogContent, Grid, LinearProgress, Table, TableCell, TableHead, TableRow, TableBody, Typography, TableFooter, Tabs, Tab, TableContainer, Divider, AppBar, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VentaGrouped from '../ventas/VentaGrouped'
import {agrupaVentas, agrupaItems, formatNumber, sumImporte, sumCantidad, sumEmpaques} from '../Tools'
import useStyles from '../hooks/useStyles'
import PaginationTable from '../paggination/PaginationTable'
import VentaItemPrecios from './VentaItemPrecios'
export default function ListaVentas({ventas, items, open, close}){
    const [lasVentas, setLasVentas] = useState([])  
    const [productos, setProductos] = useState([])
    
    const classes = useStyles()
    const [tabSelected, setTab] = useState(1)

    const selectTab = (event, selected) => {
        setTab(selected)
    }

    useEffect(()=>{
        if(ventas && items){
            setLasVentas(ventas)
            setProductos( agrupaItems(items, "producto") )
        }
        return ()=> {
            setLasVentas([])
        }
    },[ventas, items])

    return (
        <Dialog 
            fullScreen
            open={open}
            onClose={()=>close()}>
            <AppBar position="static" className={classes.comprasBar}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant='h6'>Ventas</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography align='right'>
                                <IconButton color="inherit" onClick={()=>close()}>
                                    <CloseIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>
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
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <Typography align="center" variant ="h4">Ventas por Precio</Typography>
                                </Grid>
                                { productos.map((producto, index) => (
                                    <VentaItemPrecios item={producto} precios={agrupaVentas( lasVentas.filter(vta => vta.producto._id === producto.id ), "precio")} key={index}/>                                    
                                ))}
                            </Grid>                           
                        </div>
                    </Grid>
                </Grid>
                :
                    <LinearProgress variant="query" />
            }
            </DialogContent>
        </Dialog>
    )
}