import React, {useState, useContext, useEffect} from "react"

import { Grid, Typography, IconButton, TextField, MenuItem } from "@material-ui/core"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { IngresoContext } from "../ingresos/IngresoContext"
import { EgresoContext } from "../egresos/EgresoContext"
import { UbicacionContext } from "../ubicaciones/UbicacionContext"
import Corte from '../cortes/Corte'
import moment from 'moment'
import useStyles from "../hooks/useStyles"
import { formatNumber, sumImporte } from "../Tools"
export default function CorteGlobal(){
    let now = moment()
    const classes = useStyles()
    const [fecha, setFecha] = useState(now.format("YYYY-MM-DD"))
    const {ingresos} = useContext(IngresoContext)
    const {egresos} = useContext(EgresoContext)
    const {ubicacions, ubicacion, selectUbicacion} = useContext(UbicacionContext)

    const [ingresosFecha, setIngFech] = useState([])
    // const [tingresosfecha, setTingresosfecha] = useState(0)
    const [egresosFecha, setEgFech] = useState([])
    // const [tegresosfecha, setTegresosfecha] = useState(0)
    // const [totalfecha, setTotalfecha] = useState(0)

    const [verCorte, setVercorte] = useState(false)
    
    useEffect(()=>{
        // setTingresosfecha(0)
        // setTegresosfecha(0)
        if(fecha ){
            let ingresosfecha = ingresos.filter(ingreso=>ingreso.fecha===fecha)
            setIngFech(ingresosfecha)
            // setTingresosfecha(sumImporte(ingresosFecha))
            let egresosfecha = egresos.filter(eg=>eg.fecha===fecha)
            // setTegresosfecha(sumImporte(egresosFecha))
            setEgFech(egresosfecha)
        }
    },[fecha, ingresos, egresos])

    const getfechaAnterior = () => {
        let ant = moment(fecha)
        ant.subtract(1, "days")
        setFecha(ant.format("YYYY-MM-DD"))
    }

    const getFechaSiguiente = () => {
        let sig = moment(fecha)
        sig.add(1, "days")
        setFecha(sig.format("YYYY-MM-DD"))
    }

    // const limpiarComponente = ()=>{
    //     setIngFech([])
    //     setEgFech([])
    // }

    const handleVerCorte = (ub) =>{
        selectUbicacion(ub)
        setVercorte(true)
    }
    return ingresos && egresos ?
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {/* {user.level > 2 ? null : */}
                        <IconButton
                            onClick={getfechaAnterior}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    {/* } */}
                    <TextField
                        id="date"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    {/* {user.level > 2 ? null : */}
                        <IconButton
                            onClick={getFechaSiguiente}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    {/* } */}
                </Typography>
            </Grid>
            <Grid item container xs={12}>                
                <Grid item xs={4}>
                    <Typography align="center" className={classes.textoMiniFacheron}>INGRESOS</Typography>
                    <Typography align="center" variant="h6" className={classes.textoMirame}>${formatNumber(sumImporte(ingresosFecha),1)}</Typography></Grid>
                <Grid item xs={4}>
                    <Typography align="center" className={classes.textoMiniFacheron}>EGRESOS</Typography>
                    <Typography align="center" variant="h6" className={classes.textoMirame} >${formatNumber(sumImporte(egresosFecha),1)}</Typography></Grid>
                <Grid item xs={4}>
                    <Typography align="center" className={classes.textoMiniFacheron}>TOTAL</Typography>
                    <Typography align="center" variant="h6" className={classes.textoMirame}>${formatNumber(sumImporte(ingresosFecha) - sumImporte(egresosFecha), 1)}</Typography></Grid>
            </Grid>
            { ubicacions.length > 0 ? 
                ubicacions.sort((a,b)=> a.nombre < b.nombre ? -1 : 1).map((ubicacion, i)=>(
                    <Grid item xs={12} key={i}>
                        <MenuItem onClick={()=>handleVerCorte(ubicacion)} >
                            <Grid container alignItems="center" className={classes.paperBasico}>
                                <Grid item xs={3}>
                                        <Typography align="center">{ubicacion.nombre}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Ingresos</Typography>
                                    <Typography align="center">{formatNumber( ingresosFecha.filter(ing=>ing.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0) ,1)}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Egresos</Typography>
                                    <Typography align="center">{formatNumber( egresosFecha.filter(egr=>egr.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0) ,1)}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Total</Typography>
                                    <Typography align="center">{formatNumber( 
                                        ingresosFecha.filter(ing=>ing.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0) -
                                        egresosFecha.filter(egr=>egr.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0) 
                                        ,1)
                                    }</Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Grid>
                ))
                : null
            }
            
            <Grid item xs={12}>
                {verCorte ?
                    <Corte open={verCorte} close={()=>setVercorte(false)} ubicacion={ubicacion} fecha={fecha} />
                    : null
                }
            </Grid>
        </Grid>
    : null
}