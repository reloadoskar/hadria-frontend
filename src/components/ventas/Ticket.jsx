import React, { useRef } from 'react'
import { Card, CardContent, Button, Grid, Typography, CardActions } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import ReceiptIcon from '@material-ui/icons/Receipt'
import { formatNumber } from '../Tools'
export default function Ticket({data, noPrint}){
    const classes = useStyles()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    return(
        <Card>
            {data?
            <CardContent ref={componentRef}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Typography align="center">Folio: {data.folio}</Typography>
                        <Typography align="center">{data.fecha}</Typography>
                        <Typography align="center">{data.cliente.nombre}</Typography>
                        <Typography align="center">{data.ubicacion.nombre}</Typography>
                        <Typography align="center">{data.tipoPago}</Typography>                        
                    </Grid>
                    {data.items.map((item, i) =>(
                        <Grid container item xs={12} key={i}>
                            <Grid item xs={12}>
                                #{item.compra.folio}-{item.producto.descripcion}
                            </Grid>
                            <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Cantidad/Empaques:</Typography>
                               <Typography align="right"> {item.cantidad}/{item.empaques} </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Precio:</Typography>
                               <Typography align="right"> ${item.precio} </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Importe:</Typography>
                               <Typography align="right"> ${item.importe} </Typography>
                            </Grid>                                                         
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Typography align="right" className={classes.textoMiniFacheron}>Total:</Typography>
                        <Typography align="right">${formatNumber(data.importe,2)}</Typography>
                        {
                            data.tipoPago === 'CONTADO' ?
                                <Grid item xs={12}>
                                    <Typography align="right" className={classes.textoMiniFacheron}>Efectivo:</Typography>
                                    <Typography align="right" >{formatNumber(data.efectivo,2)}</Typography>
                                    <Typography align="right" className={classes.textoMiniFacheron}>Cambio:</Typography>
                                    <Typography align="right">{formatNumber(data.cambio,2)}</Typography>
                                </Grid>
                            :
                            <Grid item xs={12}>
                                <Typography align="right" className={classes.textoMiniFacheron}>A cuenta:</Typography>
                                <Typography align="right">{formatNumber(data.acuenta,2)}</Typography>
                                <Typography align="right" className={classes.textoMiniFacheron}>Saldo:</Typography>
                                <Typography align="right">{formatNumber(data.saldo,2)}</Typography>
                            </Grid>

                        }

                    </Grid>
                </Grid>
            </CardContent>
            : null
            }
            <CardActions>
                <Button size="small" onClick={noPrint}>
                    Salir
                </Button>
                <Button 
                    className={classes.botonCosmico} size="small"  onClick={handlePrint}
                    endIcon={<ReceiptIcon>send</ReceiptIcon>}
                >
                    Imprimir ticket
                </Button>
            </CardActions>
        </Card>
    )
}

// export default Ticket