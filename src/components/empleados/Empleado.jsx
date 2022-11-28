import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton, TextField, MenuItem, CircularProgress } from '@material-ui/core'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import avataro from '../../img/avatarM1.png'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import WorkIcon from '@material-ui/icons/Work';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import useStyles from '../hooks/useStyles'
import CancelIcon from '@material-ui/icons/Cancel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from '@material-ui/icons/Mail';
import { EmpleadoContext } from './EmpleadoContext'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import Confirm from '../dialogs/Confirm';
import { useAuth } from '../auth/use_auth';
import { useSnackbar } from 'notistack'
export default function Empleado({ data }) {
  const {user} = useAuth()
  const { removeEmpleado, editEmpleado } = useContext(EmpleadoContext)
  const { ubicacions } = useContext(UbicacionContext)
  const [empleado, setEmpleado] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()
  const [confirm, setConfirm] = useState(false)
  const areas = ["GOD", "SUPERVISOR DEL SISTEMA", "ADMINISTRADOR", "ALMACEN", "CAJAS", "GENERAL"]
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const [working, setWorking] = useState(false)
  
  useEffect(() => {
    setEmpleado(data)
  }, [data])

  const handleChange = (type, value) => {
    switch (type) {
      default:
        setEmpleado({ ...empleado, [type]: value })
        break;
    }
  }
  const actualizaEmpleado = () => {
    setWorking(true)
    editEmpleado(user, empleado)
      .then(res => {
        setEditMode(false)
        showMessage(res.message, res.status)
        setWorking(false)
      })
      .catch(err=>{
        setWorking(false)
        showMessage(err.message, 'error')
      })
  }

  const onConfirm = () => {
    setWorking(true)
    removeEmpleado(user, empleado._id).then(res => {
        setWorking(false)
        setEditMode(false)
        showMessage(res.message, res.status)
    })
    .catch(err=>{
      setWorking(false)
      showMessage(err.message, 'error')
    })
  }

  const handleEdit = () => {
    setEditMode(true)
  }
  return !empleado ? null :
    !editMode ?
      <Grid container className={classes.paperContorno}>
        <Grid item xs={12} sm={2}>
          <Typography align="center">
            <img src={empleado.sexo === "H" ? avatarh : empleado.sexo === "M" ? avatarm : avataro} width="150" alt="empleado img" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h6" >{empleado.nombre} | {empleado.edad}</Typography>
          <Typography variant="h6" className={classes.textoMiniFacheron} >{areas[empleado.level]}</Typography>
          <Link
            className={classes.link}
            to='#'
            onClick={(e) => {
              window.location = "tel:+" + empleado.telefono;
              e.preventDefault();
            }}
          >
            <Typography><PhoneAndroidIcon /> {empleado.telefono}</Typography>
          </Link>
          <Link
            className={classes.link}
            to='#'
            onClick={(e) => {
              window.location = "mailto:+" + empleado.email;
              e.preventDefault();
            }}
          >
            <Typography><MailIcon /> {empleado.email}</Typography>
          </Link>
          <Typography ><WorkIcon /> {empleado.ubicacion.nombre}</Typography>
          <Typography ><AttachMoneyIcon /> ${empleado.sueldo}</Typography>
        </Grid>
        <Grid item xs={1}>
        <Typography align='right'>
          <IconButton size="small" onClick={()=>handleEdit()}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setConfirm(true)} >
            {!working ? <CancelIcon /> : <CircularProgress size={20} /> }
          </IconButton>
          <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
        </Typography>
        </Grid>
      </Grid>
    :
      <Grid container className={classes.paperContorno}>
        <Grid item container xs={12} sm={2}>
          <Grid item xs={12}>
            <img src={empleado.sexo === "H" ? avatarh : empleado.sexo === "M" ? avatarm : avataro} width="150" alt="empleado img" />
          </Grid>
          <Grid item xs={12}>
            <TextField select id="sexo" value={empleado.sexo} onChange={(e) => handleChange("sexo", e.target.value)}>
              <MenuItem value="H">Hombre</MenuItem>
              <MenuItem value="M">Mujer</MenuItem>
              <MenuItem value="O">LGBT+</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={9}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              id="nombre"
              label="Nombre"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="edad"
              label="Edad"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.edad}
              onChange={(e) => handleChange('edad', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="direccion"
              label="Direcci&oacute;n"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="telefono"
              label="Tel&eacute;fono"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="email"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="ubicacion"
              select
              label="Ubicaci&oacute;n"
              type="Object"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.ubicacion}
              onChange={(e) => handleChange('ubicacion', e.target.value)}
            >
              {ubicacions.map((ubicacion, i) => (
                <MenuItem value={ubicacion} key={i}>
                  {ubicacion.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="sueldo"
              label="Sueldo"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={empleado.sueldo}
              onChange={(e) => handleChange('sueldo', e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Typography align="right">
            <IconButton size="small" onClick={() => actualizaEmpleado()}>
              {!working ? <CheckIcon /> : <CircularProgress size={20} /> }
            </IconButton>
            <IconButton size="small" onClick={() => setEditMode(false)}>
              <CloseIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
}