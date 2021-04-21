import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Grid, LinearProgress, IconButton } from '@material-ui/core'
import { formatNumber } from '../Tools'
const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);
export default function Producto(props){
    const {producto, eliminar} = props
    const porcentajeDisp = (producto.stock * 100) / producto.cantidad
    return (
        <Grid container >
            <Grid item xs={12} md>
                <Typography children={producto.producto.descripcion}/>
            </Grid>
            <Grid item xs={12} md>
                <Typography variant="overline" align="right" children={producto.cantidad + "/" + producto.stock}/>
                <BorderLinearProgress variant="determinate" value={porcentajeDisp} /> 
                <Typography variant="body2" align="right" children={"Costo por unidad: $" + formatNumber(producto.costo,2)}/>
                <Typography variant="subtitle2" align="right" children={"Importe: $" + formatNumber(producto.importe,2)}/>
            </Grid>
            <Grid item xs={12} md={1}>
                <IconButton onClick={() => eliminar(producto)} align="right" disabled={porcentajeDisp < 100 ? true : false}>
                    <DeleteIcon color={porcentajeDisp < 100 ? "disabled" : "secondary"}/>
                </IconButton>
            </Grid>
            
        </Grid>
    )
}