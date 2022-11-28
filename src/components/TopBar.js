import React from 'react'
import UserFunctions from './UserFunctions'

import clsx from 'clsx';
import { Grid, IconButton, Typography, Box } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './hooks/useStyles'
export default function TopBar(props) {
    const classes = useStyles();
    
    const { toggle, open, logout, user } = props
    
    return (

        <Box
            className={clsx(classes.appBar, {[classes.appBarShift]: open, })}>
                {user != null ?
                    <Grid container spacing={2} className={classes.center} alignItems="center">
                        {/* { user.level >= 3 ?
                            null
                            : */}
                            <Grid item xs={1}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggle}
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}>
                                        
                                            <MenuIcon />
                                        
                                </IconButton>
                            </Grid>
                        {/* } */}
                        <Grid item xs>
                            <Typography variant="h6">
                                H A D R I A
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <UserFunctions logout={logout} user={user}/>
                        </Grid>
                    </Grid>
                :
                "nada"
                }
                
        </Box>
    )
}