import React from 'react'
import UserFunctions from './UserFunctions'

import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './hooks/useStyles'
export default function TopBar(props) {
    const classes = useStyles();
    
    const { toggle, open, auth, user } = props
    
    return (

        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
            <Toolbar>
                { user.level === 3 ?
                    null
                    :
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
                }
                <Typography variant="h6" className={classes.title}>
                    H A D R I A
        	    </Typography>
                <UserFunctions auth={auth}/>
                
            </Toolbar>
        </AppBar>
    )
}