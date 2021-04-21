import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Divider, Typography, Container, Grid, Card, CardHeader, CardContent, LinearProgress, Button, TextField, MenuItem, CircularProgress } from '@material-ui/core';
import { VictoryBar, VictoryChart,VictoryLabel, VictoryAxis } from 'victory';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumStock, sumEmpStock, formatNumber} from "../Tools"
import useStyles from '../hooks/useStyles'
import {ticketInventario} from "../api"
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Mover from './Mover'
import useInventario from '../hooks/useInventario';
// import useUbicacions from '../hooks/useUbicacions';
function Inventario(props) {
    const {
        ubicacions, 
        // invxubic, 
        // inventario, 
        // mover,
        update
    } = props
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const select = ["FOLIO","PRODUCTOR","UBICACION"]
    const { invxubic, inventario, mover } = useInventario()
    // const {ubicacions } = useUbicacions()
    const [orderBy, setOrderby] = useState('FOLIO')
    const [moverDialog, setMoverDialog] = useState(false)
    const [barData, setBarData] = useState(null)

    useEffect(() => {
        if(invxubic){
            let dataf = []
            invxubic.forEach(item => {
                dataf.push({
                    ubicacion: item._id.nombre,
                    totalInventario: sumEmpStock(item.items)
                })
            })
            setBarData(dataf)
        }
        return () => setBarData([])
    },[invxubic])

    
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const handleChange = (value) =>{
        setOrderby(value)
    }
    const handleClick = () =>{
        ticketInventario(inventario).then(res =>{
            if(res.status === 'error'){
                showMessage(res.message, res.status)
            }
            else{
                showMessage("Se imprimió el inventario", "success")
            }
        })
    }
    const openMoverDialog = () => {
        setMoverDialog(true)
    }
    const closeMoverDialog = () =>{
        setMoverDialog(false)
    }
    return (

        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" children="Inventario" paragraph />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <TextField
                    disabled
                    select
                    fullWidth
                    id="orderBy"
                    label="Ordenar por:"
                    value={orderBy}
                    onChange={(e) => handleChange(e.target.value)}
                    >
                        {select.map((opt, i) => (
                            <MenuItem key={i} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button 
                                className={classes.botonGenerico}
                                endIcon={<CompareArrowsIcon />}
                                onClick={openMoverDialog}
                                fullWidth
                                >
                                Mover
                            </Button>
                            <Mover
                                open={moverDialog} 
                                close={closeMoverDialog}
                                inventario={invxubic} 
                                ubicacions={ubicacions}
                                mover={mover}
                                update={update}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                className={classes.botonGenerico}
                                onClick={() => handleClick(inventario)}
                                endIcon={<ReceiptIcon />}
                            >
                                Imprimir
                            </Button>                    
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs= {12}>
                    
                    { barData !== null ?
                        <VictoryChart
                            height={250}
                            animate={{
                                duration: 1500,
                                easing: "elastic",
                            }}
                        >
                            <VictoryLabel x={25} y={24} text="Distribución por Ubicación" />

                            <VictoryAxis key="x"
                                dependentAxis
                                style={{
                                    axis: { stroke: "#524656", strokeWidth: 2 },
                                    tickLabels:{fontSize:7, fill: "#524656" },
                                    grid: {
                                        stroke: ({ tick }) =>
                                        tick < 10 ? "transparent" : "#C2B6C6",
                                        strokeWidth: 1
                                    },
                                }} 
                            />

                            <VictoryAxis key="y"
                                orientation="bottom"
                                style={{
                                    tickLabels:{fontSize: 7, fill: "#524656"},
                                    axis: { stroke: "#524656", strokeWidth: 3 },
                                }}
                                />

                            <VictoryBar
                                name="Inventario"
                                alignment="middle"
                                data={barData}
                                x="ubicacion"
                                y="totalInventario"
                                style={{
                                    data: {fill: "#ffd369", fillOpacity: 0.8},
                                    // labels: {fontSize: 10, fill: "#524656"},
                                    axis: {stroke: "#524656", strokeWidth: 12}
                                }}
                            />
                        </VictoryChart>
                        : 
                        <CircularProgress />
                    }

                </Grid>

                {
                    inventario === null ?
                        <LinearProgress variant="query" />
                        :
                        inventario.length === 0 ?
                            <Typography variant="h6" align="center" gutterBottom>Cargando.</Typography>
                            :
                            inventario.map((compra, index) => (
                                sumStock(compra.items) < 1 ? null :
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardHeader 
                                        title={compra.folio+ " | " +compra.clave}  
                                        />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                {compra.items.map((item, i) => (
                                                    item.stock < 1 ? null : 
                                                        <Grid item xs={12} key={i}>
                                                            <Grid container spacing={1} alignItems="flex-end">
                                                                <Grid item xs={12}>
                                                                    <Typography 
                                                                        variant="h6"
                                                                        children={item.ubicacion.nombre}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <Typography
                                                                        children={item.producto.descripcion}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={6} md={3}>
                                                                    <Typography
                                                                        align="right"
                                                                        className={classes.sobreTexto}
                                                                        children={item.producto.empaque.abr}
                                                                        />
                                                                    <Typography
                                                                        align="right"                                                                        
                                                                        children={formatNumber(item.empaquesStock,1)}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={6} md={3}>
                                                                <Typography
                                                                        align="right"
                                                                        className={classes.sobreTexto}
                                                                        children={item.producto.unidad.abr}
                                                                        />
                                                                    <Typography
                                                                        align="right"
                                                                        children={formatNumber(item.stock,1)}
                                                                        />
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Grid>                                                    
                                                ))}
                                                <Grid item xs={12} md={6}>
                                                    <Typography align="center"
                                                        variant="h6"
                                                        children="Total"
                                                        />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <Typography className={classes.sobreTexto} variant="body2" align="right" children="Empaques" />
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={formatNumber(sumEmpStock(compra.items),1)}
                                                        />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <Typography className={classes.sobreTexto} variant="body2" align="right" children="Cantidad" />
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={formatNumber(sumStock(compra.items),1)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                }
            </Grid>
        </Container>

    )
}

export default Inventario