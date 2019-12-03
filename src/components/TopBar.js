import React from 'react'

import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, Button,  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './hooks/useStyles'
import auth from '../auth'
export default function TopBar(props){
    const {toggle, open} = props
    const classes = useStyles();
    const logout = () =>{
        auth.logout(() => {
            props.history.push("/")
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