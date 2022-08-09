import React, {useContext, useEffect, useState} from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import moment from 'moment'
import { VentaContext } from './VentaContext';
import useStyles from "../hooks/useStyles";
export default function SelectorDeRango(){
    const { rango, setRango, loadVentasPorPeriodo} = useContext(VentaContext)
    var now = moment()
    const classes = useStyles()
    const [f2,setF2] = useState(now.format('YYYY-MM-DD'))
    const [f1,setF1] = useState(now.subtract(7, 'days').format('YYYY-MM-DD'))
    // const handleChange = (field, value) => {
	// 	let momento = moment(value)
	// 	switch (field) {
	// 		case "f1":
	// 			if (momento.isBefore(rango.f2)) {
	// 				return setRango({ ...rango, [field]: momento.format("YYYY-MM-DD") })
	// 			}
	// 			break
	// 		case "f2":
	// 			if (momento.isAfter(rango.f1)) {
	// 				return setRango({ ...rango, [field]: momento.format("YYYY-MM-DD") })
	// 			}
	// 			break
	// 		default:
	// 			return null
	// 	}
	// }
    const handleSubmit = () =>{
        setRango({f1: moment(f1).format("YYYY-MM-DD"), f2: moment(f2).format("YYYY-MM-DD")})
    }
    useEffect(()=>{
        loadVentasPorPeriodo(rango)
    },[rango])// eslint-disable-line react-hooks/exhaustive-deps
    return rango === null ? <Typography >Esperando datos...</Typography> :
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
                <TextField
                    id="fecha1"
                    type="date"
                    label="Fecha inicial"
                    value={f1}
                    onChange={(e) => setF1(e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    id="fecha2"
                    type="date"
                    label="Fecha final"
                    value={f2}
                    onChange={(e) => setF2(e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button 
                    onClick={()=>handleSubmit()}
                    className={classes.botonCosmico} fullWidth>Buscar ventas</Button>
            </Grid>
        </Grid>
}