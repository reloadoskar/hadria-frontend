import React, {useState} from 'react'
import { Button, Grid, Typography, Dialog, DialogContent, DialogActions } from '@material-ui/core'
import { useInventario } from '../inventario/InventarioContext'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
import RecibirCambio from './RecibirCambio'

export default function CambiosDrawer({open, close, ubicacion}){
    const {cambios} = useInventario()
    const [recibirDialog, setRecibirDialog] = useState(false)
    const [cambioSelected, setCambioSelected] = useState(null)
    const classes = useStyles()
    const handleClose=()=>{
        close()
    }
    const handleClick = (el) =>{
        setCambioSelected(el) 
        setRecibirDialog(true)
    }
    return(
        <Dialog 
            fullWidth
            maxWidth="md"
            open={open} 
            onClose={() => { close() }}
        >
            <DialogContent className={classes.coolRow}>
                <Grid container spacing={2}>
                    <Grid item xs={2}><Typography className={classes.textoMiniFacheron} >Solicitado:</Typography></Grid>
                    <Grid item xs={2}><Typography className={classes.textoMiniFacheron} >Enviado:</Typography></Grid>
                    <Grid item xs={2}><Typography className={classes.textoMiniFacheron} >Status</Typography></Grid>
                    <Grid item xs={2}><Typography className={classes.textoMiniFacheron} >Piezas</Typography></Grid>
                    <Grid item xs={4}>
                        
                    </Grid>
                </Grid>
                {!cambios ? null : cambios
                    .filter(cambio=>cambio.ubicacion._id===ubicacion._id).length === 0 ? <Typography variant='h6'>No hay solicitudes</Typography> :
                    cambios.filter(cambio=>cambio.ubicacion._id===ubicacion._id)
                    .filter(cambio=>cambio.status!=="TERMINADO")
                    .map((el,i)=>(
                    <Grid container spacing={2} key={i}>
                        <Grid item xs={2}>{el.fecha} {moment(el.createdAt).format("HH:MM")}</Grid>
                        <Grid item xs={2}>{
                            !el.respuesta ? null : moment(el.respuesta.fecha).format("YYYY-MM-DD HH:MM")}</Grid>
                        <Grid item xs={2}>{el.status}</Grid>
                        <Grid item xs={2}>
                            <Typography align="right">
                                {el.piezas}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" component="div">
                                {el.status!=="ENVIANDO" ? null :
                                    <Button onClick={()=>handleClick(el)} size="small" variant='contained'>Recibir</Button>
                                }
                            </Typography>
                        </Grid>

                    </Grid>
                ))}
                <div>
                    <RecibirCambio open={recibirDialog} close={()=>setRecibirDialog(false)} cambioSelected={cambioSelected}/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>salir</Button>
            </DialogActions>
        </Dialog>
    )
}