import React from 'react'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, Button,  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './hooks/useStyles'
export default function TopBar(props){
    let history = useHistory();
    const {toggle, open, auth} = props
    const classes = useStyles();
    const logout = () =>{
        auth.logout(() => {
            history.push("/")
        })
    }
    return (

        <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open })}>
            <Toolbar>
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
                <Typography variant="h6" className={classes.title}>
                    H A D R I A
        	</Typography>
            <Button color="inherit" onClick={logout}>Salir</Button>
            </Toolbar>
        </AppBar>
    )
}