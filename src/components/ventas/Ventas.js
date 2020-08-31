import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';

import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers';
import moment from 'moment'
import MomentUtils from '@date-io/moment';

import { useSnackbar } from 'notistack';
import { Grid, Container, Card, CardContent, TextField, Button, Typography, } from '@material-ui/core';

import { getVenta, } from '../api'
import ConfirmDialog from './ConfirmDialog'
import Venta from './Venta'
import useVentasSemana from '../hooks/useVentasSemana'

const Ventas = () => {
    const {ventasSemana, rango, setRango} = useVentasSemana()
    // const { auth } = props
    // let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    // const classes = useStyles()
    const [loadingSomething, setLoadingSomething] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [data, setData] = useState({ 
        folio: '', 
        venta: false })

    const showMessage = (text, type) => {
        enqueueSnackbar(
            text,
            {
                variant: type,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
    }

    const handleChange = (field, value) => {
        switch (field) {
            case "f1":
                if(value.isBefore(rango.f2)){
                    // console.log('ok, el rango es bueno.')
                    var valor = moment(value).format("YYYY-MM-DD")
                    return setRango({ ...rango, [field]: valor })
                }
                break
            case "f2":
                if(value.isAfter(rango.f1)){
                    return setRango({...rango, [field]: moment(value).format("YYYY-MM-DD")})
                }
                break
            case "folio":

                return setData({ ...data, [field]: value })

            default:
                return setData({ ...data, [field]: value })
        }
        // setData({ ...data, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let dataSend = {
            folio: data.folio
        }
        setLoadingSomething(true)
        getVenta(dataSend).then(res => {
            if (res.status === 'success') {
                setData({ ...data, venta: res.venta })
            }
            setLoadingSomething(false)
        })

    }

    // const openConfirm = () => {
    //     // setCompra(compra)
    //     setConfirm(true)
    // }

    const cancelConfirm = () => {
        setConfirm(false)
        // setCompra(null)
    }

    const okConfirm = (data) => {

        // del(data._id).then(res => {
        //     if (res.status === 'error') {
        //     } else {
        //         showMessage(res.message, res.status)
        //     }
        //     cancelConfirm()
        // })
    }

    return (
        <React.Fragment>
            
            <Container>

                <Grid container >
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                {
                                    rango != null ?
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
                                                    <DatePicker
                                                        id="fecha1"
                                                        label="Fecha inicial"
                                                        value={rango.f1}
                                                        onChange={(e) => handleChange("f1", e)}
                                                        margin="normal"
                                                        fullWidth
                                                        format="YYYY/MM/DD"
                                                        />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item xs={6}>                                                        
                                                <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
                                                    <DatePicker
                                                        id="fecha2"
                                                        label="Fecha final"
                                                        value={rango.f2}
                                                        onChange={(e) => handleChange("f2", e)}
                                                        margin="normal"
                                                        fullWidth
                                                        format="YYYY/MM/DD"
                                                        />
                                                </MuiPickersUtilsProvider>                                                        
                                            </Grid>
                                            <Grid item xs={12}>
                                                <VictoryChart 
                                                    height={200}
                                                    animate={{
                                                        duration: 1500,
                                                        easing: "elastic",
                                                      }}
                                                    
                                                    style={{
                                                        // background: { fill: "#E5DDCB" },
                                                    }}
                                                >
                                                    <VictoryLabel x={25} y={24} text="Ventas x día" />
                                                    <VictoryAxis 
                                                        dependentAxis
                                                        style={{
                                                            axis: { stroke: "#524656", strokeWidth: 2 },
                                                            tickLabels:{fontSize:10, fill: "#524656" },
                                                            grid: {
                                                                stroke: ({ tick }) =>
                                                                tick < 10 ? "transparent" : "#C2B6C6",
                                                                strokeWidth: 1
                                                            },
                                                        }} />
                                                    <VictoryAxis
                                                        orientation="bottom"
                                                        style={{
                                                            tickLabels:{fontSize:9, fill: "#524656" },
                                                            axis: { stroke: "#524656", strokeWidth: 2 },
                                                        }}
                                                    />
                                                    
                                                                                                            
                                                        <VictoryBar
                                                            name="semana-1"
                                                            data={ventasSemana} 
                                                                            
                                                            //labels= { ({ datum }) => `$${formatNumber(datum.y)}` } 
                                                            style={{
                                                                data: {fill: "#CF4647"},
                                                                labels: {fontSize: 7, fill: "#524656"},
                                                                axis: {stroke: "#524656", strokeWidth: 6}
                                                            }}
                                                        />
                                                </VictoryChart >
                                            </Grid>
                                        </Grid>
                                    :
                                        <Typography >Esperando datos...</Typography>

                                }

                            </CardContent>
                        </Card>
                    </Grid>                            
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                id="folio"
                                                label="Buscar Folio:"
                                                variant="outlined"
                                                type="number"
                                                value={data.folio}
                                                onChange={(e) => handleChange('folio', e.target.value)}
                                                />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button fullWidth color="primary" type="submit" variant="contained" disabled={loadingSomething}>Buscar</Button>
                                        </Grid>
                                    </Grid>
                                </form>

                                {
                                    loadingSomething
                                    ?
                                    <Typography children="Buscando ... " />
                                    :
                                        <Container>
                                        <Card>
                                            <CardContent>
                                                <Venta data={data.venta} showMessage={showMessage} />
                                            </CardContent>
                                        </Card>
                                        </Container>
                                }
                            </CardContent>
                        </Card>
                    </Grid> 
                </Grid>
            </Container>
            <ConfirmDialog open={confirm} cancel={cancelConfirm} ok={okConfirm} data={data.venta} />
        </React.Fragment>                            

    )
}

export default Ventas