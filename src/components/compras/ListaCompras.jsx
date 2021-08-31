import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import CompraBasic from './CompraBasic'
import { DatePicker, MuiPickersUtilsProvider, } from "@material-ui/pickers"
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import { sumImporte, formatNumber } from '../Tools'
import useStyles  from '../hooks/useStyles'
export default function ListaCompras({compras, editCompra, verCompra, recuperarVentas, recuperarGastos}){
    const classes = useStyles()
    const [lasCompras, setLasCompras] = useState(null)
    const [tVentas, setTventas] = useState(0)
    const [tCompras, setTcompras] = useState(0)

    const [tResultado, setTresultado] = useState(0)
    const [selectedDate, handleDateChange] = useState(moment());
    useEffect(() => {
        if(compras){
            setLasCompras(compras.filter(compra=> moment(compra.fecha).format("MM") === moment(selectedDate).format("MM") ))
        }
        return () => setLasCompras(null)
    },[compras, selectedDate])

    useEffect(()=>{
        if(lasCompras){
            let tc = 0
            tc = sumImporte(lasCompras)
            setTcompras(tc)
            let tv = 0
            lasCompras.map(compra=> tv += sumImporte(compra.ventaItems))
            setTventas(tv)
            let tg = 0

            let tr = tv - tc - tg
            setTresultado(tr)
        }
        return () => clearTotals()
    },[lasCompras])
    const clearTotals = () => {
        setTcompras(0)
        setTventas(0)
        setTresultado(0)
    }
    return(
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography component="div" align="center">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            views={["year", "month"]}
                            label="Año y mes"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Typography>
            </Grid>
            {lasCompras === null ?
                <Grid item xs={12}>
                    <Typography component="div" align="center" >
                        <CircularProgress />
                    </Typography>
                </Grid>
                :
                <React.Fragment>
                    {lasCompras
                    // .filter(compra=> moment(compra.fecha).format("MM") === moment(selectedDate).format("MM") )
                    .map((compra, i) => (
                        <Grid item xs={12} key={i}>
                            <CompraBasic 
                                key={i} 
                                compra={compra} 
                                editCompra={editCompra}  
                                verCompra={verCompra}
                                recuperarVentas={recuperarVentas}
                                recuperarGastos={recuperarGastos}
                            />
                        </Grid>
                    ))
                    }
                    <Grid
                        container
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={4}>
                            <Typography align="center" className={classes.textoMiniFacheron}>Total Compras:</Typography>
                            <Typography align="center" >
                                ${formatNumber(tCompras,2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography align="center" className={classes.textoMiniFacheron}>Total Ventas:</Typography>
                            <Typography align="center" >
                                ${formatNumber(tVentas,2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography align="center" className={classes.textoMiniFacheron}>Total Resultado:</Typography>
                            <Typography align="center" color={tResultado<0 ? "secondary" : "primary"}>
                                ${formatNumber(tResultado,2)}
                            </Typography>
                        </Grid>

                    </Grid>
                </React.Fragment>
            }
        </Grid>
    )
}