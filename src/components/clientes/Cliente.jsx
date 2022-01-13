import React, {useState, useEffect, useContext} from 'react'
import { TextField, Grid, MenuItem, Typography, IconButton } from '@material-ui/core'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import avataro from '../../img/avatarM1.png'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import CancelIcon from '@material-ui/icons/Cancel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import useStyles from '../hooks/useStyles'
import {ClienteContext} from './ClienteContext'
import Confirm from '../dialogs/Confirm';
import { useSnackbar } from 'notistack'
import {formatNumber} from '../Tools'
export default function Cliente({data, cuenta}){
    const {removeCliente, editCliente} = useContext(ClienteContext)
    const classes = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [elCliente, setElCliente] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    useEffect(()=>{
        setElCliente(data)
    },[data])

    const onConfirm = () => {
        removeCliente(elCliente._id)
          .then(res => {
            showMessage(res.message, res.status)
          })
      }
    const handleChange = (type, value) => {
        switch (type) {
            case "direccion":
                setElCliente({...elCliente, direccion: value.toUpperCase()})
                break;
            default:
                setElCliente({...elCliente, [type]: value})
                break;
        }
    }
    const actualizarCliente = () => {
        editCliente(elCliente).then(res=>{
            showMessage(res.message, res.status)
            setEditMode(false)
        })
    }
    return !elCliente ? null : 
        !editMode ?
            <Grid container className={classes.paperContorno}>
                <Grid item xs={12} sm={2}>
                    <Typography align="center">
                    <img src={elCliente.sexo === "H" ? avatarh : elCliente.sexo === "M" ? avatarm : avataro} width="150" alt="cliente img"/>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Typography variant="h6" >
                        {elCliente.nombre}
                    </Typography>
                    <Typography className={classes.textoMirame}>{elCliente.rfc}</Typography>
                    <Typography><HomeIcon /> {elCliente.direccion}</Typography>
                    <Typography><PhoneAndroidIcon /> {elCliente.tel1}</Typography>
                    {elCliente.email ?
                        <Typography><EmailIcon />  {elCliente.email.toLowerCase() }</Typography>
                        : null
                    }
                    <Typography><AccountBalanceIcon /> {elCliente.banco1} {elCliente.cta1}</Typography>
                    {elCliente.limite_de_credito > 0 ?
                        <React.Fragment>
                            <Typography className={classes.textoMiniFacheron}>l&iacute;mite </Typography>
                            <Typography className={classes.textoMirame}>${formatNumber(elCliente.limite_de_credito)}</Typography>
                            <Typography className={classes.textoMiniFacheron}>Disponible </Typography>
                            <Typography className={classes.textoMirame}>${formatNumber(elCliente.credito_disponible)}</Typography>
                            {cuenta  && cuenta.length > 0? 
                                <React.Fragment>
                                    <Typography className={classes.textoMiniFacheron}>Saldo </Typography>
                                    <Typography className={classes.textoMirameSangron}>${formatNumber(cuenta[0].saldo)}</Typography>
                                </React.Fragment>
                                : null
                            }
                        </React.Fragment>
                        : null
                    }
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography align='right'>
                        <IconButton size="small" onClick={()=>setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => setConfirm(true)} >
                            <CancelIcon />
                        </IconButton>
                        <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
                        </Typography>
                </Grid>
            </Grid>                        
            :
            <Grid container className={classes.paperContorno}>
                <Grid item container xs={12} sm={2} spacing ={2}>
                    <Grid item xs={12} sm={2}>
                        <img src={elCliente.sexo === "H" ? avatarh : elCliente.sexo === "M" ? avatarm : avataro} width="150" alt="Cliente img"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth select id="sexo" value={elCliente.sexo} onChange={(e)=>handleChange("sexo", e.target.value)}>
                            <MenuItem value="H">Hombre</MenuItem>
                            <MenuItem value="M">Mujer</MenuItem>
                            <MenuItem value="O">LGBT+</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={9} spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.nombre}
                            onChange={(e) => handleChange('nombre',e.target.value)}
                        />  
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="rfc"
                            label="RFC"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.rfc}
                            onChange={(e) => handleChange('rfc',e.target.value)}
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
                            value={elCliente.direccion}
                            onChange={(e) => handleChange('direccion',e.target.value)}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            id="telefono"
                            label="Tel&eacute;fono"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.tel1}
                            onChange={(e) => handleChange('tel1',e.target.value)}
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            id="email"
                            label="email"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.email}
                            onChange={(e) => handleChange('email',e.target.value)}
                        /> 
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="dias"
                            label="Plazo de cr&eacute;dito"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.dias_de_credito}
                            onChange={(e) => handleChange('dias_de_credito',e.target.value)}
                        /> 
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="limite"
                            label="L&iacute;mite de cr&eacute;dito"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.limite_de_credito}
                            onChange={(e) => handleChange('limite_de_credito',e.target.value)}
                        /> 
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="disponible"
                            label="Cr&eacute;dito disponible"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={elCliente.credito_disponible}
                            onChange={(e) => handleChange('credito_disponible',e.target.value)}
                        /> 
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography align="right">
                        <IconButton size="small" onClick={() => actualizarCliente()}>
                        <CheckIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => setEditMode(false)}>
                        <CloseIcon />
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>                
}