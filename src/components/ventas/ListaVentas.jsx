import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, LinearProgress, Typography } from '@material-ui/core'
import VentaGrouped from '../ventas/VentaGrouped'
import {agrupaVentas, formatNumber, sumImporte} from '../Tools'
import useStyles from '../hooks/useStyles'
export default function ListaVentas({ventas, open, close}){
    const [lasVentas, setLasVentas] = useState([])
    const classes = useStyles()
    useEffect(()=>{
        if(ventas){
            setLasVentas(agrupaVentas(ventas, 'ventaFolio'))
        }
        return ()=>setLasVentas([])
    },[ventas])
    return (
        <Dialog 
            maxWidth="lg"
            open={open}
            onClose={()=>close()}>
            <DialogContent>
            {lasVentas.length > 0 ?
                <Grid container >
                    <Grid item xs ={12}>
                        <Typography align="center" className={classes.textoMirame}>VENTAS A CRÉDITO</Typography>
                    </Grid>
                    {lasVentas
                    .filter(vta=>vta.tipoPago==="CRÉDITO")
                    .map((venta,i)=>(
                        <VentaGrouped venta={venta} key={i} />
                    ))}
                    <Grid item xs={12}>
                        <Box borderTop={1}>
                            <Typography align="right">Total: ${formatNumber(sumImporte(lasVentas.filter(vta=>vta.tipoPago==="CRÉDITO")),2)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs ={12}>
                        <Typography align="center" className={classes.textoMirame} >VENTAS DE CONTADO</Typography>
                    </Grid>
                    {lasVentas
                    .filter(vta=>vta.tipoPago==="CONTADO")
                    .map((venta,i)=>(
                        <VentaGrouped venta={venta} key={i} />
                    ))}
                    <Grid item xs={12}>
                        <Box borderTop={1}>
                            <Typography align="right">Total: ${formatNumber(sumImporte(lasVentas.filter(vta=>vta.tipoPago==="CONTADO")),2)}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                :
                    <LinearProgress variant="query" />
            }
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>close()} className={classes.botonSimplon}>salir</Button>
            </DialogActions>
        </Dialog>
    )
}