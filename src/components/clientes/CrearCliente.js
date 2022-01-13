import React, { useState, useContext } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from '../hooks/useStyles'
import {ClienteContext} from './ClienteContext'
import { useSnackbar } from 'notistack'
const ncliente = {
    nombre: "",
    rfc: "",
    direccion: "",
    tel1: "",
    tel2: "",
    email: "",
    dias_de_credito: 0,
    limite_de_credito: 0,
    credito_disponible: 0
}

const CrearCliente = ({open, close}) =>{
    const {addCliente} = useContext(ClienteContext)
    const classes = useStyles()
    const [cliente, setCliente] = useState(ncliente)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        addCliente(cliente).then(res=>{
            showMessage(res.message, res.status)
            handleClose()
        })
    }

    const handleChange = (field, value) => {
        switch(field){
            case 'area':
                return setCliente({...cliente, area: value, level: value.level})
            case 'nombre':
                return setCliente({...cliente, nombre: value.toUpperCase()})
            case 'direccion':
                return setCliente({...cliente, direccion: value.toUpperCase()})
            default:
                return setCliente({...cliente, [field]: value })
        }
    }

    const handleClose = () => {
        setCliente(ncliente)
        close()
    }
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear Cliente</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="nombre"
                                fullWidth
                                label="Nombre"
                                type="text"
                                variant="outlined"
                                value={cliente.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="rfc"
                                fullWidth
                                label="RFC"
                                type="text"
                                variant="outlined"
                                value={cliente.rfc}
                                onChange={(e) => handleChange('rfc', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="direccion"
                                fullWidth
                                label="Direccion"
                                placeholder="Av. Siempre Viva 123, Springfield, CA."
                                type="text"
                                variant="outlined"
                                value={cliente.direccion}
                                onChange={(e) => handleChange('direccion', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="telefono"
                                fullWidth
                                label="Teléfono a (10 Dígitos)"
                                type="text"
                                variant="outlined"
                                value={cliente.tel1}
                                onChange={(e) => handleChange('tel1', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="email"
                                fullWidth
                                label="Correo Electrónico"
                                type="email"
                                variant="outlined"
                                value={cliente.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id="dias"
                                fullWidth
                                label="Días de crédito"
                                type="text"
                                variant="outlined"
                                value={cliente.dias_de_credito}
                                onChange={(e) => handleChange('dias_de_credito', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                id="limite"
                                fullWidth
                                label="Límite de crédito"
                                type="text"
                                variant="outlined"
                                value={cliente.limite_de_credito}
                                onChange={(e) => handleChange('limite_de_credito', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <InstagramIcon />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        id="instagram"
                                        fullWidth
                                        label="instagram.com/"
                                        type="text"
                                        variant="outlined"
                                        value={cliente.instagram}
                                        onChange={(e) => handleChange('instagram', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <FacebookIcon />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        id="facebook"
                                        fullWidth
                                        label="facebook.com/"
                                        type="text"
                                        variant="outlined"
                                        value={cliente.facebook}
                                        onChange={(e) => handleChange('facebook', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={close}>Cancelar</Button>
                    <Button type="submit" className={classes.botonGenerico}>Registrar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CrearCliente