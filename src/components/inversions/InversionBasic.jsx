import React, { useState, useContext, useEffect } from 'react';
import { InversionContext } from './InversionContext'
import { useSnackbar } from 'notistack'
import { Card, CardContent, Dialog, Grid, Typography, Badge, IconButton, Button, Collapse, DialogContent, TextField, ClickAwayListener } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useStyles from '../hooks/useStyles';
import EgresoBasic from '../egresos/EgresoBasic'
import { formatNumber, sumImporte } from '../Tools';

export default function InversionBasic({ data, verInversion }) {
  const { removeInversion, selectInversion } = useContext(InversionContext)
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const classes = useStyles()

  const [inversion, setInversion] = useState(null)
  const [totalInvertido, setTotalInv] = useState(0)
  const [totalVenta, setTotalVenta] = useState(0)
  const [resultado, setResultado] = useState(0)
  
  const [verAddCapital, setVerAdd] = useState(false)
  const [verMas, setVerMas] = useState(false)

  useEffect(() => {
    if(data){
      setInversion(data)
      let ti = sumImporte(data.gastos)
      setTotalInv(ti)
      let re = totalVenta - ti
      setResultado(re)
    }
    return () => limpiarComponente(null)
  }, [data])

  const limpiarComponente = () => {
    setInversion(null)
    setResultado(0)
    setTotalVenta(0)
    setTotalInv(0)
  }

  const cancelarInversion = (id) => {
    removeInversion(id).then(res => {
      showMessage(res.message, res.status)
    })
  }
  const handleClick = () => {
    selectInversion(inversion)
    verInversion()
  }
  return !inversion ? null :
    <Grid item xs={12} sm={12} >
      <Card>
        <CardContent>
          <Grid item container xs={12} >
            <Grid item xs={3} sm={1}>
              <Typography className={classes.textoMiniFacheron}>{inversion.fecha}</Typography>
              <Typography className={classes.textoMirame}>{inversion.folio}</Typography>
            </Grid>
            <Grid item xs={9} sm={6}>
              <Typography >{inversion.provedor.nombre}</Typography>
              <Typography className={classes.textoMiniFacheron} >{inversion.descripcion}</Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography >{inversion.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography align="right" className={classes.textoMiniFacheron}>INVERTIDO</Typography>
              <Typography align="right" >${formatNumber(totalInvertido)}</Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography align="right" className={classes.textoMiniFacheron}>RESULTADO</Typography>
              <Typography align="right" >${formatNumber(resultado)}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography align='right'>
                <Badge variant="dot" color="secondary">
                  <IconButton onClick={handleClick}>
                    <VisibilityIcon />
                  </IconButton>
                </Badge>
                <IconButton onClick={() => cancelarInversion(inversion._id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Typography>
            </Grid>       
          </Grid>
        </CardContent>
      </Card>
    </Grid>
}