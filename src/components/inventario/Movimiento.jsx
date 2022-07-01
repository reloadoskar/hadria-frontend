import React, {useState} from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
// import PrintIcon from '@material-ui/icons/Print';
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import TicketPesadas from './TicketPesadas'
import { formatNumber } from '../Tools'
// import { ticketMovimiento } from '../api';
export default function Movimiento({mov}){
    const classes = useStyles()
    const [verPesadas, setVerPesadas] = useState(false)
    // const handlePrint = () =>{
    //     ticketMovimiento(mov).then(res=>{
    //         console.log(res)
    //     })
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
                            {/* <IconButton onClick={handlePrint}>
                                <PrintIcon />
                            </IconButton> */}
                            <TicketPesadas 
                                open={verPesadas} 
                                close={()=>setVerPesadas(false)} 
                                data={mov}
                            />
                        </React.Fragment>
                        : null
                    }
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} >
                    <Typography className={classes.textoMiniFacheron}>Fecha:</Typography>
                    <Typography>{moment(mov.createdAt).format("dddd DD-MM-YYYY") }</Typography>
                </Grid>
                
                <Grid item xs={6} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Origen:</Typography>
                    <Typography>{mov.origen.ubicacion ? mov.origen.ubicacion.nombre : null }</Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Destino:</Typography>
                    <Typography>{mov.destino ? mov.destino.nombre : null }</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography className={classes.textoMiniFacheron}>Producto:</Typography>
                    <Typography>{mov.item.compra.folio}-{mov.item.producto.descripcion }</Typography>
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

            <Grid xs={12}>
                <Typography className={classes.textoMiniFacheron}>Comentario:</Typography>
                <Typography>{mov.comentario}</Typography>
            </Grid>
        </Grid>
        : null
}