import React, {useState, useEffect} from 'react'
import { Grid, IconButton, Typography, Menu, MenuItem, Divider } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import StatusDialog from './StatusDialog'
import useUser from './hooks/useUser'
import {restartApp} from './api'

const UserFunctions = (props) => {
    const {auth} = props
    const {user} = useUser()
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl)
    const [statusCheck, setStatusCheck] = useState(false)
    const [status, setStatus] = useState({message:"", type: ""})
    let history = useHistory();

    useEffect(()=>{
        if(user){
            if(user.venceEnDias <= 0){
                setStatus({
                    message: "Cuenta Suspendida, favor realizar su pago inmediatamente.",
                    type: "danger"
                })
                return setStatusCheck(true)
            }
            if(user.venceEnDias <= 15){
                setStatusCheck(true)
                return setStatus({
                    message: "Su licencia vence en "+user.venceEnDias+" días.", 
                    type: "warning"}
                    )
            }
            if(user.venceEnDias > 15 && user.venceEnDias <= 20){
                setStatusCheck(true)
                return setStatus({
                    message: "Su licencia vencerá pronto.", 
                    type: "info"
                    })
            }
        }else{
            return false
        }
    },[user])

    const logout = () => {
        
        localStorage.clear()
        auth.logout(() => {
            history.push("/")
        })
    }

    const restart = () => {
        restartApp().then(res=>{
            logout()
        })
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const close = () => {
        setStatusCheck(false)
    }
    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs >
                    <Typography variant="h6" children={user.nombre} />
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
                        <MenuItem onClick={restart}>Restart</MenuItem>
                        <Divider />
                        <MenuItem onClick={logout}>Salir</MenuItem>
                    </Menu>

                </Grid>
                <StatusDialog open = {statusCheck} status={status} logout={logout} close={close}/>
            </Grid>
        </div>
    )
}

export default UserFunctions