import { CircularProgress, Grid, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import CompraBasic from './CompraBasic'
import { DatePicker, MuiPickersUtilsProvider, } from "@material-ui/pickers"
import moment from 'moment'
import MomentUtils from '@date-io/moment';
export default function ListaCompras({compras, editCompra, verCompra}){
    const [lasCompras, setLasCompras] = useState(null)
    const [selectedDate, handleDateChange] = useState(moment());
    useEffect(() => {
        if(compras){
            setLasCompras(compras)
        }
        return () => setLasCompras(null)
    },[compras])

    return(
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    views={["year", "month"]}
                    label="Año y mes"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            </Grid>
            {lasCompras === null ?
                <Grid item xs={12}>
                    <Typography component="div" align="center" >
                        <CircularProgress />
                    </Typography>
                </Grid>
                :
                lasCompras
                .filter(compra=> moment(compra.fecha).format("MM") === moment(selectedDate).format("MM") )
                .map((compra, i) => (
                    <Grid item xs={12} key={i}>
                        <CompraBasic 
                            key={i} 
                            compra={compra} 
                            editCompra={editCompra}  
                            verCompra={verCompra}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}