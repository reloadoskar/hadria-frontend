import React, {useState} from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
// import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import TicketPesadas from './TicketPesadas'
import { formatNumber } from '../Tools'
import { ticketMovimiento } from '../api'
// import Confirm from '../dialogs/Confirm'

export default function Movimiento({mov}){
    const classes = useStyles()
    const [verPesadas, setVerPesadas] = useState(false)
    // const [opnConfirm, setOpenConf] = useState(false)

    const handlePrint = () =>{
        ticketMovimiento(mov).then(res=>{
            console.log(res)
        })
    }

    // const confirmar = () =>{
    //     setOpenConf(true)
    // }

    // const deleteMovimiento = () =>{
    //     setOpenConf(false)
    // }

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
                    <Typography align="right">
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
                        {/* <IconButton onClick={confirmar}>
                            <CancelIcon />
                            <Confirm open={opnConfirm} close={()=>setOpenConf(false)} onConfirm={deleteMovimiento} />
                        </IconButton> */}
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={2} >
                    <Typography className={classes.textoMiniFacheron}>{ mov.folio ? "Folio: " + mov.folio : null }</Typography>
                    <Typography className={classes.textoMiniFacheron}>Fecha: {moment(mov.createdAt).format("DD-MM-YYYY") }</Typography>
                    <Typography className={classes.textoMiniFacheron}>{moment(mov.createdAt).format("dddd HH:mm") }</Typography>
                </Grid>
                
                <Grid item xs={6} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Origen:</Typography>
                    <Typography>{mov.origen.ubicacion ? mov.origen.ubicacion.nombre : null } <ArrowForwardIcon /></Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Destino:</Typography>
                    <Typography>{mov.destino ? mov.destino.nombre : null }</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
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
            </Grid>

            <Grid item xs={12}>
                <Typography className={classes.textoMiniFacheron}>Comentario:</Typography>
                <Typography>{mov.comentario}</Typography>
            </Grid>
        </Grid>
        : null
}