import React, { useState } from 'react'
import LandingBar from './LandingBar'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Container, Card, CardHeader, CardContent, TextField, CardActions, Button } from '@material-ui/core';
import useStyles from './hooks/useStyles'
import {register} from './api'


const Register = (props) => {
    const {isLoading,} = props
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    
    const [data, setData] = useState({
        nombre: '', 
        apellido: '', 
        email: '',
        telefono: '',
        password: '', 
        passwordCheck: '', 
        error: true
    })
    
    const showMessage = (text, type) => { enqueueSnackbar(text, {
        variant: type,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
    } ) }
    
    const handleChange = (field, value) => {
        switch(field){
            case 'passwordCheck':
                if(value === data.password){
                    return setData({...data, [field]: value, error: false})
                }else{
                    return setData({...data, [field]: value, error: true})        
                }
            default:
                return setData({...data, [field]: value})
        }
        
    }
    
    const handleSubmit = (e) => { 
        e.preventDefault()
        // openLoading()
        register(data).then(res => {
            // closeLoading()
            if(res.status === 'success'){
                showMessage(res.message, res.status)
                history.push("/");
            }else{
                showMessage(res.message, res.status)
            }
        })
    }

    return(
        <React.Fragment>
            <LandingBar />
            <div className={classes.backgroundCustom}>
                <Container className={classes.container}>
                    <Card className={classes.registerCard}>
                        <CardHeader title="Registro:"></CardHeader>
                        <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        id="nombre"
                                        label="Nombre(s)"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={data.nombre}
                                        onChange={(e)=>handleChange('nombre', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="apellido"
                                        label="Apellidos"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={data.apellido}
                                        onChange={(e)=>handleChange('apellido', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="e-mail"
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e)=>handleChange('email', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="telefono"
                                        label="Tel&eacute;fono"
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        required
                                        value={data.telefono}
                                        onChange={(e)=>handleChange('telefono', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        required
                                        label="password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={data.password}
                                        onChange={(e)=>handleChange('password', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={data.error}
                                        id="passwordCheck"
                                        required
                                        label="confirmación de password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={data.passwordCheck}
                                        onChange={(e)=>handleChange('passwordCheck', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end"  >
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    disabled={!data.email || !data.password || !data.nombre || !data.apellido || !data.passwordCheck || data.error || isLoading ? true : false}
                                    type="submit">Registrar</Button>
                            </Grid>
                        </CardActions>
                        </form>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Register