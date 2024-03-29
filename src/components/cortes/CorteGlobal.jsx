import React, {useState, useContext, useEffect} from "react"

import { Grid, Typography, IconButton, TextField, MenuItem } from "@material-ui/core"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { UbicacionContext } from "../ubicaciones/UbicacionContext"
import Corte from './Corte'
import moment from 'moment'
import useStyles from "../hooks/useStyles"
import { formatNumber, sumImporte } from "../Tools"
import primero from '../../img/primero.png'
import segundo from '../../img/segundo.png'
import tercero from '../../img/tercero.png'
import { useInventario } from "../inventario/InventarioContext"
import { useAuth } from "../auth/use_auth"
export default function CorteGlobal({ingresos, egresos}){
    const {user} = useAuth()
    let now = moment()
    const classes = useStyles()
    const [fecha, setFecha] = useState(now.format("YYYY-MM-DD"))
    const {loadInventarioUbicacion}= useInventario()
    const {ubicacions, ubicacion, selectUbicacion} = useContext(UbicacionContext)

    const [ingresosFecha, setIngFech] = useState([])
    const [egresosFecha, setEgFech] = useState([])
    const [resPorUbicacion, setResUbic] = useState([])

    const [verCorte, setVercorte] = useState(false)
    
    useEffect(()=>{
        if(fecha&& ingresos && egresos ){
            let ingresosfecha = ingresos.filter(ingreso=>ingreso.fecha===fecha)
            setIngFech(ingresosfecha)
            let egresosfecha = egresos.filter(eg=>eg.fecha===fecha)
            setEgFech(egresosfecha)

            let resubic = []
            ubicacions.sort((a,b)=> a.nombre < b.nombre ? -1 : 1).forEach((ubicacion)=>{
                let ntingresos = ingresosfecha.filter(ing=>ing.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0)
                let ntegresos = egresosfecha.filter(egr=>egr.ubicacion._id === ubicacion._id).reduce((acc, itm)=> acc += itm.importe,0)
                let nres= ntingresos - ntegresos
                resubic.push({
                    _id: ubicacion,
                    nombre: ubicacion.nombre,
                    ingresos: ntingresos,
                    egresos: ntegresos,
                    resultado: nres,
                })
            })
            setResUbic(resubic)
        }
    },[fecha, ingresos, egresos]) // eslint-disable-line react-hooks/exhaustive-deps

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

    const handleVerCorte = (ub) =>{
        selectUbicacion(ub)
        loadInventarioUbicacion(user, ub._id)
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
            { resPorUbicacion.length > 0 ? 
                resPorUbicacion.sort((a,b) => a.ingresos > b.ingresos ? -1 : 1 ).map((ubicacion, i)=>(
                    <Grid item xs={12} key={i}>
                        <MenuItem onClick={()=>handleVerCorte(ubicacion._id)} >
                            <Grid container alignItems="center" className={classes.paperBasico}>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        {i>2 ? i+1 :
                                            <img src={i===0? primero : i===1 ? segundo : tercero} width="65" alt="img first"/>
                                        }
                                    </Typography>

                                </Grid>
                                <Grid item xs={2}>
                                        <Typography align="center">{ubicacion.nombre}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Ingresos</Typography>
                                    <Typography align="center">{formatNumber( ubicacion.ingresos ,1)}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Egresos</Typography>
                                    <Typography align="center">{formatNumber( ubicacion.egresos ,1)}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Total</Typography>
                                    <Typography align="center">{formatNumber( 
                                        ubicacion.resultado
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
                    // <Corte open={verCorte} close={()=>setVercorte(false)} ubicacion={ubicacion} fecha={fecha} />
                    <Corte 
                        open={verCorte} 
                        close={()=>setVercorte(false)} 
                        ubicacion={ubicacion} 
                        fecha={fecha} />
                    : null
                }
            </Grid>
        </Grid>
    : null
}