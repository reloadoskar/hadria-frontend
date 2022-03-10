import React, { useEffect, useState, useContext } from 'react'
import { Grid, IconButton, TextField, Typography, MenuItem } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import { EgresoContext } from "../egresos/EgresoContext"
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
import Confirm from '../dialogs/Confirm';
import { useSnackbar } from 'notistack';
export default function EgresoBasic({ data }) {
  const { removeEgreso, editEgreso } = useContext(EgresoContext)
  const {ubicacions} = useContext(UbicacionContext)

  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

  const [egreso, setEgreso] = useState(null)
  const [confirm, setConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    let isMounted = true
    if(isMounted){
      setEgreso(data)
    }
    return () => isMounted = false
  }, [data])

  const onConfirm = () => {
    // if(egreso.concepto==="PAGO"){
    //   editEgreso({_id: egreso.cuenta })
    // }
    removeEgreso(egreso._id).then(res=>{
      showMessage(res.message, res.status)
      setEgreso(null)
    })
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleChange = (field, value) => {
    setEgreso({ ...egreso, [field]: value })
  }

  const updateEgreso = () => {
    editEgreso(egreso).then(res=>{
      showMessage(res.message, res.status)
      setEditMode(false)
    })
  }
  return (
    <div>
      {egreso === null ? null :
        editMode ?
          <Grid container spacing={2} >
            <Grid item xs={2}>
              <TextField
                id="fecha"
                label="Fecha"
                variant="outlined"
                fullWidth
                type="date"
                value={egreso.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="ubicacion"
                label="Ubicaci&oacute;n"
                variant="outlined"
                fullWidth
                select
                value={egreso.ubicacion}
                onChange={(e) => handleChange('ubicacion', e.target.value)}
              >
                  <MenuItem value={egreso.ubicacion}>{egreso.ubicacion.nombre}</MenuItem>
                {ubicacions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="descripcion"
                label="Descripci&oacute;n"
                variant="outlined"
                fullWidth
                value={egreso.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="importe"
                label="Importe"
                variant="outlined"
                fullWidth
                type="number"
                value={egreso.importe}
                onChange={(e) => handleChange('importe', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography align="right">
                <IconButton size="small" onClick={() => updateEgreso()}>
                  <CheckIcon />
                </IconButton>
                <IconButton size="small" onClick={() => setEditMode(false)}>
                  <CloseIcon />
                </IconButton>
                <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
              </Typography>
            </Grid>
          </Grid>
          :
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={5}>
              <Typography className={classes.textoMiniFacheron}>{egreso.fecha} | {egreso.ubicacion.nombre}</Typography>
              <Typography>{egreso.concepto}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{egreso.descripcion}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textoSangron} align="right">-{formatNumber(egreso.importe, 2)}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography align="right">
                <IconButton size="small" onClick={() => handleEdit()}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => setConfirm(true)}>
                  <CancelIcon />
                </IconButton>
                <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
              </Typography>
            </Grid>
          </Grid>
      }
    </div>
  )
}