import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography, IconButton, TextField, MenuItem, CircularProgress } from '@material-ui/core';
import avatarh from '../../img/avatarH2.png'
import avatarm from '../../img/avatarM3.png'
import avataro from '../../img/avatarM1.png'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import CancelIcon from '@material-ui/icons/Cancel';
import { ProductorContext } from './ProductorContext'
import Confirm from '../dialogs/Confirm';
import useStyles from '../hooks/useStyles'
import { useAuth } from '../auth/use_auth';
import { useSnackbar } from 'notistack';
export default function ProductorBasic({ data }) {
  const {user} = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
  const classes = useStyles()
  const [productor, setProductor] = useState(null)
  const { removeProductor, editProductor } = useContext(ProductorContext)
  const [confirm, setConfirm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [working, setWorking] = useState(false)

  useEffect(()=>{
    setProductor(data)
  },[data])

  const onConfirm = () => {
    setWorking(true)
    removeProductor(user, productor._id)
      .then(res => {
        setWorking(false)
        showMessage(res.message, res.status)
      }).catch(err=>{
        setWorking(false)
        showMessage(err.message, "error")
      })
  }

  const handleChange = (field, value) => {
    switch (field) {
      case "clave":
        setProductor({...productor, clave: value.substring(0,5).replace(/[^a-zA-Z0-9]/g, '').toUpperCase()})
        break;
      case "nombre":
        setProductor({...productor, nombre: value.toUpperCase()})
        break;
      default:
        setProductor({...productor, [field]: value})
        break;
    }
  }

  const actualizarProductor = () => {
    setWorking(true)
    editProductor(user, productor).then(res=>{
      setEditMode(false)
      setWorking(false)
    }).catch(err=>{
      setWorking(false)
      showMessage(err.message, "error")
    })
  }
  return !productor ? null :
    editMode ? 
      <Grid container className={classes.paperContorno}>
        <Grid item conatiner xs={12} sm={2}>
          <Grid item xs={12}>
            <img src={productor.sexo === "H" ? avatarh : productor.sexo === "M" ? avatarm : avataro} width="150" alt="productor img"/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth select id="sexo" value={productor.sexo} onChange={(e)=>handleChange("sexo", e.target.value)}>
              <MenuItem value="H">Hombre</MenuItem>
              <MenuItem value="M">Mujer</MenuItem>
              <MenuItem value="O">LGBT+</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={9} spacing={2}>
          <Grid item xs={3}>
            <TextField label="clave" id="clave" value={productor.clave} onChange={(e) => handleChange('clave', e.target.value)}/>  
          </Grid>
          <Grid item xs={9}>
            <TextField fullWidth label="nombre" id="nombre" value={productor.nombre} onChange={(e) => handleChange('nombre', e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Dirección" id="direccion" value={productor.direccion} onChange={(e) => handleChange('direccion', e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Teléfono" id="tel1" value={productor.tel1} onChange={(e) => handleChange('tel1', e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="email" id="email" value={productor.email} onChange={(e) => handleChange('email', e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.textoMirame}>Datos bancarios</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Banco" id="banco1" value={productor.banco1} onChange={(e) => handleChange('banco1', e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Número de cuenta" id="cta1" value={productor.cta1} onChange={(e) => handleChange('cta1', e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Días de crédito" id="diasDeCredito" value={productor.diasDeCredito} onChange={(e) => handleChange('diasDeCredito', e.target.value)}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Comisión del servicio (%)" id="comision" value={productor.comision} onChange={(e) => handleChange('comision', e.target.value)}/>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Typography align="right">
            <IconButton size="small" onClick={() => actualizarProductor()}>
              {!working ? <CheckIcon /> : <CircularProgress size={20}/>}
            </IconButton>
            <IconButton size="small" onClick={() => setEditMode(false)}>
              <CloseIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
    :
    <Grid container className={classes.paperContorno}>
      <Grid item xs={12} sm={4}>
        <Typography align="center">
          <img src={productor.sexo === "H" ? avatarh : productor.sexo === "M" ? avatarm : avataro} width="150" alt="productor img"/>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="h6">
          {productor.clave} - {productor.nombre}
        </Typography>
        <Typography><HomeIcon /> {productor.direccion}</Typography>
        <Typography><PhoneAndroidIcon /> {productor.tel1}</Typography>
        { productor.email ? 
          <Typography><EmailIcon /> {productor.email.toLowerCase()}</Typography>
          : null
        }
        <Typography><AccountBalanceIcon /> {productor.banco1} {productor.cta1}</Typography>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Typography align='right'>
          <IconButton size="small" onClick={()=>setEditMode(true)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setConfirm(true)} >
            {!working ? <CancelIcon /> : <CircularProgress size={20} />}
          </IconButton>
          <Confirm 
            open={confirm} 
            texto="¿Seguro que desea ELIMINAR al Productor?"
            close={() => setConfirm(false)} onConfirm={onConfirm} />
        </Typography>
      </Grid>
    </Grid>
}