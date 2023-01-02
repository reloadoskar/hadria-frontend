import React from 'react'
import { Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, MenuItem } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import useStyles from '../hooks/useStyles';
import { formatNumber } from '../Tools';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Plan({empresa, plan}){
    const periodos = [
      "1 MES", 
      "6 MESES", 
      "1 AÑO", 
      "3 AÑOS", 
      "5 AÑOS"]
    const [periodo, setPeriodo] = useState("1 AÑO")
    const [precioTotal, setPrecioTotal] = useState(0)
    const [precioMensual, setPrecioMensual] = useState(0)
    const [pagoaRealizar, setPagoa] = useState(0)
    const classes = useStyles()
    useEffect(()=>{
        if(periodo==="1 MES"){
            setPrecioTotal(plan.precio)
            setPrecioMensual(plan.precio/12)
            setPagoa(plan.precio/12)
        }
        if(periodo==="6 MESES"){
            setPrecioTotal((plan.precio*.9))
            setPrecioMensual(plan.precio*.9/12)
            setPagoa((plan.precio*.9)/2)
        }
        if(periodo==="1 AÑO"){
            setPrecioTotal((plan.precio*.85))
            setPrecioMensual(plan.precio*.85/12)
            setPagoa((plan.precio*.85))
        }
        if(periodo==="3 AÑOS"){
            setPrecioTotal((plan.precio*.75))
            setPrecioMensual(plan.precio*.75/12)
            setPagoa((plan.precio*.75)*3)
        }
        if(periodo==="5 AÑOS"){
            setPrecioTotal((plan.precio*.65))
            setPrecioMensual(plan.precio*.65/12)
            setPagoa((plan.precio*.65)*5)
        }
    },[periodo, plan])
    return!plan ? null :
    <Grid item container xs={12} sm={5} >
    <Paper classes={{ root: classes.paperContorno }}>
      <Grid container spacing={2} >
      <Grid item xs={12}>
          {empresa.plan === plan.nombre ?
            <Typography className={classes.textoMiniFacheron} align="center">Plan Actual</Typography>
            : null
          }
          <Typography
            // className={classes.textoMirame} 
            className={
              empresa.plan === plan.nombre ? classes.textoSubrayado : classes.textoMirame
            }
            align="center">
            {plan.nombre}
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField 
                select
                fullWidth
                helperText="Seleccione periodo:"
                value={periodo}
                onChange={(e)=>setPeriodo(e.target.value)}
            >
                {periodos.map((item,i)=>(
                    <MenuItem value={item} key={i}>{item}</MenuItem>
                ))}
            </TextField>
        </Grid>
        
        <Grid item xs={12}>
          <Typography align="center" > $ {formatNumber(precioTotal, 2)} equivalente a</Typography>
          <Typography align="center" variant='h5' className={classes.textoMirame}>$ {formatNumber(precioMensual, 1)} MXN / mes</Typography>
          <Typography align="center">A pagar: ${formatNumber(pagoaRealizar, 1)} MXN</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            {plan.caracteristicas.map((el, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={el}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>

  </Grid>    
}