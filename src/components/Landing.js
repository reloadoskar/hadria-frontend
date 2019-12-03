import React, { useState } from 'react'
import { AppBar, Toolbar, Grid, Typography, Container, Card, CardHeader, CardContent, TextField, CardActions, Button } from '@material-ui/core';
import useStyles from './hooks/useStyles'
import auth from '../auth'


const Landing = (props) => {
    const classes = useStyles()
    const [data, setData] = useState({user: '', password: ''})

    const handleChange = (field, value) => {
        setData({...data, [field]: value})
    }
    const login = () => {
        auth.login(() => {
            props.history.push("/app")
        })
        console.log(data)
    }

    return(
        <React.Fragment>
            <AppBar className={classes.landingBar}>
                <Toolbar>
                    <Grid container spacing={2} >
                        <Grid item xs>
                            <Typography variant="h6" align="center" children="HADRIA" />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.backgroundCustom}>
                <Container className={classes.container}>
                    <Card className={classes.posCard}>
                        <CardHeader title="Login:"></CardHeader>
                        <CardContent>
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        id="user"
                                        label="Usuario"
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                        required
                                        value={data.user}
                                        onChange={(e)=>handleChange('user', e.target.value)}
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
                                <Button variant="contained" color="secondary" onClick={() => login()}>Entrar</Button>
                            </Grid>
                        </CardActions>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Landing