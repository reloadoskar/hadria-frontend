import React, { useEffect, useState, useContext } from 'react'
import { Grid, IconButton, Typography, TextField, MenuItem } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {IngresoContext} from '../ingresos/IngresoContext'
import { useSnackbar } from 'notistack';
import {useAuth} from '../auth/use_auth'
import Confirm from '../dialogs/Confirm';
import { formatNumber } from '../Tools'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
import useStyles from '../hooks/useStyles';
export default function IngresoBasic({data}){
    const auth = useAuth()
    const classes = useStyles()
    const {ubicacions} = useContext(UbicacionContext)
    const {removeIngreso, editIngreso} = useContext(IngresoContext)
    const [ingreso, setIngreso] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [working, setWorking] = useState(false)

    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    
    useEffect(()=>{
        setIngreso(data)
        return () => {
            setIngreso(null)
        }
    }, [data])

    const onConfirm = () => {
        removeIngreso(ingreso._id).then(res=>{
            showMessage(res.message, res.status)
            setIngreso(null)
        })
    }

    const handleEdit = () => {
        setEditMode(true)
        // loadUbicacions()
    }

    const handleChange = (field, value) => {
        setIngreso({ ...ingreso, [field]: value })
    }

    const updateIngreso = () => {
        setWorking(true)
        editIngreso(ingreso).then(res=>{
            setWorking(false)
          showMessage(res.message, res.status)
          setEditMode(false)
        })
    }
    return ingreso === null ? null :
        editMode ?
        <Grid container spacing={2} className={ working ? classes.blurred : null}>
            <Grid item xs={2}>
              <TextField
                id="fecha"
                label="Fecha"
                variant="outlined"
                fullWidth
                type="date"
                value={ingreso.fecha}
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
                value={ingreso.ubicacion}
                onChange={(e) => handleChange('ubicacion', e.target.value)}
              >
                  <MenuItem value={ingreso.ubicacion}>{ingreso.ubicacion.nombre}</MenuItem>
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
                value={ingreso.descripcion}
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
                value={ingreso.importe}
                onChange={(e) => handleChange('importe', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography align="right">
                <IconButton size="small" onClick={() => updateIngreso()}>
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
                <Typography className={classes.textoMiniFacheron}>{ingreso.fecha} | {ingreso.ubicacion.nombre}</Typography>
                <Typography>{ingreso.concepto}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>{ingreso.descripcion}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography align="right">{formatNumber(ingreso.importe,2)}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography align="right">
                    <IconButton size="small" onClick={() => handleEdit()}>
                        <EditIcon />
                    </IconButton>
                    {auth.user.level > 2 ? null :
                        <IconButton 
                            size="small"
                            onClick={()=>setConfirm(true)}
                        >
                            <CancelIcon />
                            <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
                        </IconButton>
                    }
                </Typography>
            </Grid>
        </Grid>
    
}