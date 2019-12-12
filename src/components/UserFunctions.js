import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import { Grid, IconButton, Typography, Menu, MenuItem, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';

const UserFunctions = (props) => {
    const {auth} = props
    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        level: ''
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl)
    let history = useHistory();

    useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        setData({
            nombre: decoded.nombre,
            apellido: decoded.apellido,
            email: decoded.email,
            level: decoded.level
        })
    }, [])

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
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs >
                    <Typography variant="h6" children={data.nombre} />
                </Grid>
                <Grid item xs >
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

                </Grid>
            </Grid>
        </div>
    )
}

export default UserFunctions