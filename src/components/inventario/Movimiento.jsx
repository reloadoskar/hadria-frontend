import React, {useState} from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import TicketPesadas from './TicketPesadas'
import { formatNumber } from '../Tools'
import { ticketMovimiento } from '../api'
import Confirm from '../dialogs/Confirm'
import { useInventario } from './InventarioContext';
import { useAuth } from '../auth/use_auth';
import { useSnackbar } from 'notistack'
export default function Movimiento({mov}){
    const {user} = useAuth()
    const classes = useStyles()
    const {deleteMovimiento} = useInventario()
    const [verPesadas, setVerPesadas] = useState(false)
    const [opnConfirm, setOpenConf] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    const handlePrint = () =>{
        ticketMovimiento(mov).then(res=>{
            console.log(res)
        })
    }

    const confirmar = () =>{
        setOpenConf(true)
    }

    const noconfirmar = ()=>{
        setOpenConf(false)
    }

    const eliminarMovimiento = () =>{
        deleteMovimiento(user, mov).then(res=>{
            showMessage(res.message, res.status)
        }).catch(err=>{
            showMessage(err.message, 'error')
        })
    }

    return mov?
        <Grid 
            item 
            container 
            xs={12} 
            className={classes.paperContorno} 
            alignItems="flex-end"
            spacing={1}
            >
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    {/* <Typography align="right" component="div">
                    {mov.pesadas.length>0?
                        <React.Fragment>
                            <IconButton onClick={()=>setVerPesadas(true)}>
                                <VisibilityIcon />
                            </IconButton>
                            <TicketPesadas 
                                open={verPesadas} 
                                close={()=>setVerPesadas(false)} 
                                data={mov}
                                />
                        </React.Fragment>
                        : null
                    }
                        <IconButton onClick={handlePrint}>
                            <PrintIcon />
                        </IconButton>
                        {mov.status === "CANCELADO" ? null :
                            <IconButton onClick={confirmar}>
                                <CancelIcon />
                            </IconButton>
                        }
                    </Typography>
                    <Confirm 
                        open={opnConfirm} 
                        close={noconfirmar} 
                        onConfirm={()=>eliminarMovimiento()}
                        texto={"¿Seguro quieres CANCELAR el MOVIMIENTO: " + mov.folio + "?"} /> */}

                </Grid>
                <Grid item xs={12} sm={2} >
                    <Typography className={classes.textoMiniFacheron}>ID / Fecha:</Typography>
                    <Typography className={classes.textoMiniFacheron}>{ mov.folio ? "#" + mov.folio : null } / {moment(mov.createdAt).format("D-M-YY HH:mm")}</Typography>
                </Grid>
                
                <Grid item xs={6} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>Origen:</Typography>
                    <Typography className={classes.textoMiniFacheron}>{mov.origen ? mov.origen.nombre : null }</Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>Destino:</Typography>
                    <Typography className={classes.textoMiniFacheron}>{mov.destino ? mov.destino.nombre : null }</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography className={classes.textoMiniFacheron}>Producto:</Typography>
                    <Typography>{mov.item.compra.folio}-{mov.item.producto.descripcion } {mov.item.clasificacion}</Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Typography>
                        {formatNumber(mov.empaques,1) } {mov.item.producto.empaque ? mov.item.producto.empaque.abr : mov.item.productoempaque.abr}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <Typography>
                        {formatNumber(mov.cantidad,2) }{mov.item.producto.unidad ? mov.item.producto.unidad.abr : mov.item.productounidad.abr}</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                <Typography align="right" component="div">
                    {mov.pesadas.length>0?
                        <React.Fragment>
                            <IconButton onClick={()=>setVerPesadas(true)}>
                                <VisibilityIcon />
                            </IconButton>
                            <TicketPesadas 
                                open={verPesadas} 
                                close={()=>setVerPesadas(false)} 
                                data={mov}
                                />
                        </React.Fragment>
                        : null
                    }
                        <IconButton onClick={handlePrint}>
                            <PrintIcon />
                        </IconButton>
                        {mov.status === "CANCELADO" ? null :
                            <IconButton onClick={confirmar}>
                                <CancelIcon />
                            </IconButton>
                        }
                    </Typography>
                    <Confirm 
                        open={opnConfirm} 
                        close={noconfirmar} 
                        onConfirm={()=>eliminarMovimiento()}
                        texto={"¿Seguro quieres CANCELAR el MOVIMIENTO: " + mov.folio + "?"} />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Typography className={classes.textoMiniFacheron}>Comentario:</Typography>
                <Typography>{mov.comentario}</Typography>
            </Grid>            
        </Grid>
        : null
}