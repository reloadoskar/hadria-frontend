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
import ConfirmDialog from './ConfirmDialog'
import Venta from './Venta'
import useVentas from './useVentas'
import useStyles from '../hooks/useStyles';

const Ventas = () => {
    const classes = useStyles()
    const {ventasSemana, rango, setRango, verVenta, delVenta} = useVentas()
    const { enqueueSnackbar } = useSnackbar()
    
    const [buscando, setBuscando] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [folio, setFolio] = useState('')
    const [venta, setVenta] = useState()

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
                return setFolio(value)
            default:
                return null
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setBuscando(true)
        verVenta(folio).then(res => {
            if (res.status === 'success') {
                setVenta(res.venta)
                setDialog(true)
            }else{
                showMessage(res.message, res.status)
            }
            setBuscando(false)
        })

    }

    const closeDialog = () => {
        setDialog(false)
    }

    return (
        <React.Fragment>
            
            <Container>

                <Grid container >
                    {/* <Grid item xs={12}>
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
                    </Grid>                             */}
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
                                                value={folio}
                                                onChange={(e) => handleChange('folio', e.target.value)}
                                                />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button fullWidth color="primary" type="submit" variant="contained" disabled={buscando}>Buscar</Button>
                                        </Grid>
                                    </Grid>
                                </form>

                                {
                                    buscando
                                    ?
                                    <Typography children="Buscando ... " />
                                    :
                                        <Container>
                                        <Card>
                                            <CardContent>
                                                <Venta 
                                                    venta={venta} 
                                                    cancel={delVenta}
                                                    showMessage={showMessage} 
                                                    open={dialog} 
                                                    close={closeDialog}
                                                    />
                                            </CardContent>
                                        </Card>
                                        </Container>
                                }
                            </CardContent>
                        </Card>
                    </Grid> 
                </Grid>
            </Container>
        </React.Fragment>                            

    )
}

export default Ventas