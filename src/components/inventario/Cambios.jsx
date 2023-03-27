import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'

import { formatNumber } from '../Tools';
import SurtirCambio from './SurtirCambio';
import {useUbicacion} from '../ubicaciones/UbicacionContext'
import { useInventario } from './InventarioContext';
import { useAuth } from '../auth/use_auth';
import Cambio from './Cambio';
import MostrarCambio from './MostrarCambio';
export default function Cambios(){
    const {user} = useAuth()
    const {inventarioUbicacion : inventario, loadCambios, cambios} = useInventario()
    const classes = useStyles()
    const {ubicacions} = useUbicacion()
    const [surtirCambioDalog, setDialog] = useState(false)
    const [mostrarCambioDialog, setDialogMostrar] = useState(false)
    const [cambioSeleccionado, setCambioSel] = useState("")
    const [cambiosFiltrado, setCfiltrado] = useState([])
    const [mes, setMes] = useState(moment().format("YYYY-MM"))
    const [filtros, setFiltros] = useState({
        fecha: "",
        ubicacion: "TODO",
        status: "TODO",
    })

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(mes !== ""){
            setLoading(true)            
            loadCambios(user, mes).then(res=>{
                setLoading(false)
                // setCfiltrado(res.cambios)
            })
        }
        setCfiltrado([])
        // eslint-disable-next-line
    },[mes])
    
    useEffect( ()=>{
        if(cambios && filtros){
            var cambiosfiltrado = cambios

            if(filtros.ubicacion !== "TODO"){
                cambiosfiltrado = cambiosfiltrado.filter(cmbio=>cmbio.ubicacion._id===filtros.ubicacion._id)
            }
            if(filtros.status !== "TODO"){
                cambiosfiltrado = cambiosfiltrado.filter(cmbio=>cmbio.status===filtros.status)
            }
            setCfiltrado(cambiosfiltrado)
        }
        // return setCfiltrado([])
        // eslint-disable-next-line
    },[cambios, filtros]) 

    //     return setCfiltrado(cambios.filter(cmbio=>cmbio.status===filtro3))

    const surtirSelected = (cambio) =>{
        setCambioSel(cambio)
        setDialog(true)
    }
    const mostrarSelected = (cambio) =>{
        setCambioSel(cambio)
        setDialogMostrar(true)
    }

    const cancelarSurtir = () =>{
        setCambioSel(null)
        setDialog(false)
    }
    const cancelarMostrar = () =>{
        setCambioSel(null)
        setDialogMostrar(false)
    }
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item container spacing={2} justifyContent='center' alignItems='center'>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="pfecha"
                            type="month"
                            label="Selecciona un periodo"
                            variant="outlined"
                            value={mes}
                            onChange={(e)=>setMes(e.target.value)}
                            />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        fullWidth
                            id="pubicacion"
                            select
                            value={filtros.ubicacion}
                            label="Selecciona ubicación"
                            onChange={(e)=>setFiltros({...filtros, ubicacion: e.target.value})}
                        >
                            <MenuItem value="TODO" >TODO</MenuItem>
                            {ubicacions.map((ubic,i)=>(
                                <MenuItem value={ubic} key={i}>{ubic.nombre}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                        fullWidth
                            id="pstatus"
                            select
                            label="Selecciona un status"
                            value={filtros.status}
                            onChange={(e)=>setFiltros({...filtros, status: e.target.value})}
                        >
                            <MenuItem value={"TODO"}>TODO</MenuItem>
                            <MenuItem value="SOLICITANDO">SOLICITANDO</MenuItem>
                            <MenuItem value="ENVIANDO">ENVIANDO</MenuItem>
                            <MenuItem value="ENTREGADO">ENTREGADO</MenuItem>
                        </TextField>
                    </Grid>

                </Grid>
                {cambiosFiltrado.length===0? null :
                <Grid item container justifyContent='center' alignItems='center'>
                
                        <Grid item xs={1}></Grid>
                        <Grid item xs={1}>Folio</Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.textoMiniFacheron}>Fecha</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron}>Ubicación</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron}>Status</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.textoMiniFacheron} align="right">Piezas</Typography>
                        </Grid>
                    </Grid>
                }

            {loading? <Typography>Cargando...</Typography> : cambiosFiltrado.length === 0 ? null :
                cambiosFiltrado.map((item, i) =>(
                    <Cambio cambio={item} surtirSelected={surtirSelected} mostrarSelected={mostrarSelected} key={i} />
                ))
            }

            {cambiosFiltrado.length === 0 ? null :
                <Grid item container spacing={2}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                        <Typography className={classes.textoMirame} align="right">{
                            formatNumber( cambiosFiltrado.reduce((acc,el)=>acc+=el.piezas,0), 0)
                        }</Typography>
                    </Grid>
                </Grid>
            }
            </Grid>
            <SurtirCambio open={surtirCambioDalog} close={cancelarSurtir} cambio={cambioSeleccionado} inventario={inventario}/>
            <MostrarCambio open={mostrarCambioDialog} close={cancelarMostrar} cambio={cambioSeleccionado} />
        </div>
    )
}