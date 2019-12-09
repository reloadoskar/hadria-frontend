import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './hooks/useStyles'
export default function TopBar(props) {
    const classes = useStyles();
    let history = useHistory();
    const { toggle, open, auth } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl)
    const logout = () => {
        auth.logout(() => {
            history.push("/")
        })
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (

        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
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
                <div>
                    <IconButton 
                        onClick={handleMenu}
                        color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-usuario"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Divider />
                        <MenuItem onClick={logout}>Salir</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}