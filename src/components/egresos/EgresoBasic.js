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
export default function EgresoBasic({ data }) {
  const { removeEgreso } = useContext(EgresoContext)
  const {ubicacions} = useContext(UbicacionContext)
  const [egreso, setEgreso] = useState(null)
  const [confirm, setConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setEgreso(data)
    return () => {
      setEgreso(null)
    }
  }, [data])

  const onConfirm = () => {
    removeEgreso(egreso._id)
    setEgreso(null)
  }

  const handleChange = (field, value) => {
    setEgreso({ ...egreso, [field]: value })
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
                <IconButton size="small" onClick={() => setEditMode(true)}>
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
                <IconButton size="small" onClick={() => setEditMode(true)}>
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