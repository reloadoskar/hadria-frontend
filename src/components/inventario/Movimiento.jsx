import React, {useState} from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import TicketPesadas from './TicketPesadas'

export default function Movimiento({mov}){
    const classes = useStyles()
    const [verPesadas, setVerPesadas] = useState(false)
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
                <Grid item xs={6} sm={2} >
                    <Typography className={classes.textoMiniFacheron}>Fecha:</Typography>
                    <Typography>{moment(mov.createdAt).format("dddd DD-MM-YYYY") }</Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    {mov.pesadas.length>0?
                        <React.Fragment>
                            <Button onClick={()=>setVerPesadas(true)} size='small' class={classes.botonGenerico}>Ver Pesadas</Button>
                            <TicketPesadas 
                                open={verPesadas} 
                                close={()=>setVerPesadas(false)} 
                                data={mov}
                            />
                        </React.Fragment>
                        : null
                    }
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Origen:</Typography>
                    <Typography>{mov.origen.ubicacion ? mov.origen.ubicacion.nombre : null }</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography className={classes.textoMiniFacheron}>Destino:</Typography>
                    <Typography>{mov.destino ? mov.destino.nombre : null }</Typography>
                </Grid>
                <Grid item xs={8} sm={3}>
                    <Typography className={classes.textoMiniFacheron}>Producto:</Typography>
                    <Typography>{mov.item.producto.descripcion }</Typography>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <Typography>
                        {mov.empaques }
                        {mov.item.producto.empaque ? mov.item.producto.empaque.abr : mov.item.productoempaque.abr}
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <Typography>
                        {mov.cantidad }
                        {mov.item.producto.unidad ? mov.item.producto.unidad.abr : mov.item.productounidad.abr}</Typography>
                </Grid>
            </Grid>

            <Grid xs={12}>
                <Typography className={classes.textoMiniFacheron}>Comentario:</Typography>
                <Typography>{mov.comentario}</Typography>
            </Grid>
        </Grid>
        : null
}