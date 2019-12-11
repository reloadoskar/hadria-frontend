import React from 'react'
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core'
import useStyles from './hooks/useStyles'
const LandingBar = () => {
    const classes = useStyles()
    return (
        <AppBar className={classes.landingBar}>
            <Toolbar>
                <Grid container spacing={2} >
                    <Grid item xs={10}>
                        <Typography variant="h5" children="H A D R I A  2.0" />
                    </Grid>
                    <Grid item xs>
                        <NavLink color="inherit" to="/register">
                            <Button color="primary">Registrar</Button>
                        </NavLink>
                        <NavLink color="inherit" to="/">
                        <Button color="primary">Log in</Button>
                        </NavLink>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default LandingBar