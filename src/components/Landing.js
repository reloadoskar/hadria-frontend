import React, { useState } from 'react'
import LandingBar from './LandingBar'
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Container, Card, CardHeader, CardContent, TextField, CardActions, Button } from '@material-ui/core';
import useStyles from './hooks/useStyles'
import {login} from './api'


const Landing = (props) => {
    const {auth, isLoading, openLoading, closeLoading} = props
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    
    const [data, setData] = useState({email: '', password: ''})
    
    const showMessage = (text, type) => { enqueueSnackbar(
        text, 
        {
            variant: type,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
        },
    } ) }
    
    const handleChange = (field, value) => {
        setData({...data, [field]: value})
    }
    
    const handleSubmit = (e) => { 
        e.preventDefault()
        openLoading()
        login(data).then(res => {
            closeLoading()
            if(res.status === 'success'){
                showMessage(res.message, res.status)
                auth.login(() => {
                    history.push("/app");
                })
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
                    <Card className={classes.posCard}>
                        <CardHeader title="Login:"></CardHeader>
                        <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Usuario"
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
                                        id="password"
                                        required
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={data.password}
                                        onChange={(e)=>handleChange('password', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end"  >
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    disabled={!data.email || !data.password || isLoading ? true : false}
                                    type="submit">Entrar</Button>
                            </Grid>
                        </CardActions>
                        </form>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Landing