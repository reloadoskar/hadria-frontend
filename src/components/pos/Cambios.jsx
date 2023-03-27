import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, Grid, TextField, Button, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import { useInventario } from '../inventario/InventarioContext'
import { useAuth } from '../auth/use_auth';
import {useUbicacion} from '../ubicaciones/UbicacionContext'
import { useSnackbar } from 'notistack';

export default function Cambios({open, close}){
    const {user} = useAuth()
    const classes = useStyles()
    const fecha = moment().format("YYYY-MM-DD")
    const {crearSolicitudCambio} = useInventario()
    const {ubicacion} = useUbicacion()
    const [producto, setProducto] = useState("")
    const [piezas, setPiezas] = useState(0)
    const [pesob, setPb ]= useState(0)
    const [tara, setTara] = useState(0)
    const [peson, setPn] = useState(0)
    const [enviando, setEnviando] = useState(false)
    // const [descontarInventario, setDesc] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
	const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const handleClose = () => {
        setProducto("")
        setPiezas(0)
        setPb(0)
        setTara(0)
        setPn(0)
        close()
    }

    useEffect(()=>{
        if(pesob || tara){
            setPn(pesob-tara)
        }

    },[pesob,tara])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.info("Enviando solicitud")
        setEnviando(true)
        const solicitud = {
            ubicacion: ubicacion,
            fecha: fecha,
            compraItem: producto._id,
            piezas: piezas,
            pesob: pesob,
            tara: tara,
            peson: peson,
            // descontarInventario: descontarInventario
        }
        crearSolicitudCambio(user, solicitud )
            .then(res =>{
                if(solicitud.descontarInventario){
                    producto.stock-=solicitud.peson
                }
                showMessage(res.message, res.status)
                setEnviando(false)
                handleClose()
            })
            .catch(err=>{
                setEnviando(false)
            })

        // setTimeout(() => {
        // }, 4000);
    }
    return(
        <Dialog 
            fullWidth
            maxWidth="sm" 
            open={open}
            onClose={handleClose}
        >
            {enviando ? <Typography variant="h6" align="center">Enviando...</Typography> : 
            <form onSubmit={handleSubmit}>
            <DialogContent>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <TextField
                                id="producto"
                                select
                                label="Selecciona producto"
                                value={producto}
                                fullWidth
                                onChange={(e)=>setProducto(e.target.value)}
                                variant="outlined"
                                required
                            >
                                {!inventario ? null : inventario.map((itm,i)=>(
                                    <MenuItem value={itm} key={i}>
                                        <Grid container>
                                            <Grid item xs={6}><Typography>{itm.compra.folio}-{itm.producto.descripcion} {itm.clasificacion}</Typography></Grid>
                                            <Grid item xs={6}><Typography align="right">{itm.empaquesStock}/{itm.stock}</Typography></Grid>
                                        </Grid>
                                        
                                    </MenuItem>
                                ))}
                            </TextField>                        
                        </Grid> */}
                        <Grid item xs={3}>
                            <TextField 
                                className={classes.textField1}
                                id="piezas"
                                label="No. Piezas"
                                fullWidth
                                value={piezas}
                                inputProps={{ type: "number", min: 1, max: 360, step:"any" }}
                                onChange={(e)=>setPiezas(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField 
                            className={classes.textField1}
                                id="peso"
                                label="Peso"
                                fullWidth
                                value={pesob}
                                inputProps={{ type: "number", min: 0, max: 999, step:"any" }}
                                onChange={(e)=>setPb(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField 
                            className={classes.textField1}
                                id="tara"
                                label="Tara"
                                fullWidth
                                value={tara}
                                inputProps={{type: "number", min: 0, max: 999, step:"any" }}
                                onChange={(e)=>setTara(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>                    
                        <Grid item xs={3}>
                            <TextField 
                            className={classes.textField1}
                                id="neto"
                                label="Neto"
                                fullWidth
                                value={peson}
                                inputProps={{readOnly:true, type: "number", min: 0 }}
                                onChange={(e)=>setPn(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>                    
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch disabled={peson===0?true:false} size="medium" checked={descontarInventario} onChange={()=>setDesc(!descontarInventario)} />}
                                label="Descontar de inventario."
                            />
                        </Grid> */}
                    </Grid>                    
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>cancelar</Button>
                <Button type='submit' >Solicitar</Button>
            </DialogActions>
            </form>
            }
        </Dialog>
    )
}