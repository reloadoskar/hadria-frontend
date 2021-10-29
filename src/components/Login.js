import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardActions, Grid, TextField, Button, CircularProgress, Typography, Slide } from '@material-ui/core'
import useStyles from './hooks/useStyles'
import { useHistory, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import {useAuth} from './auth/use_auth'
export default function Login(){
    let history = useHistory();
    let location = useLocation();
    const auth = useAuth()
    let {from} = location.state || { from: { pathname: "/app" } }
    
    const { enqueueSnackbar } = useSnackbar()
    
    const classes = useStyles()
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [cargando, setCargando] = useState(false)

    useEffect(()=> {
        if(auth.autenticado){
            if(auth.user !== null){
                if(auth.user.level <=2){
                    history.replace(from)
                }
                if(auth.user.level === 3){
                    history.push('/app/inventario')
                }
                if(auth.user.level === 4){
                    history.push(`/app/pos`)
                }
            }
        }
        // return () => {
        //     setUsuario('')
        //     setPassword('')
        //     setCargando(false)
        // }
    },[auth, history, from])
    
 
    const showMessage = (text, type) => { 
        enqueueSnackbar(
            text, 
            {
                variant: type,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
            },
    })}

    function handleChange(field, value){
        switch (field) {
            case "usuario":
                setUsuario(value)    
                break;
            case "password":
                setPassword(value)    
                break;
            default:

                break;
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        setCargando(true)
        auth.login({usuario: usuario, password: password})
        .then(res => {
        // console.log(res)
            if(res.status==='error'){
                setCargando(false)
                showMessage(res.message, res.status)
            }else{
                history.push("/app");
                setCargando(false)
            }
        })
        .catch(err => {
            setCargando(false)
            showMessage("¡Ups!, no se puede conectar en este momento.", "error")
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <Card className={classes.cajaBonita}>
                <CardHeader title="Login:"></CardHeader>
                    <CardContent>
                        {cargando === true ? 
                            <Slide direction="up" in={cargando} mountOnEnter unmountOnExit>
                                    <Typography align="center" component="div">
                                        <CircularProgress size={80} /> 
                                    </Typography>
                            </Slide>
                            :   
                            <Grid container spacing={2} direction="row" >                                
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Usuario"
                                        variant="outlined"
                                        autoComplete="username"
                                        fullWidth
                                        type="email"
                                        required
                                        value={usuario}
                                        onChange={(e)=>handleChange('usuario',e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        required
                                        label="Password"
                                        variant="outlined"
                                        autoComplete="current-password"
                                        fullWidth
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                        } 
                    </CardContent>
                    {cargando === true ? null :
                        <CardActions>
                            <Grid container  >
                                <Button 
                                    className={classes.botonGenerico}
                                    disabled={!usuario || !password || cargando ? true : false}
                                    type="submit">Entrar</Button>
                            </Grid>
                        </CardActions>
                    }
            </Card>
        </form>
    )
}