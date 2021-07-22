import React, {useState, useEffect} from 'react'
import { Grid, Menu, MenuItem, Divider, Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import StatusDialog from './StatusDialog'
import {restartApp} from './api'
import useStyles from './hooks/useStyles'
import { useAuth } from './auth/use_auth'

const UserFunctions = () => {
    const auth= useAuth()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl)
    const [statusCheck, setStatusCheck] = useState(false)
    const [status, setStatus] = useState({message:"", type: ""})
    let history = useHistory();
    // const { enqueueSnackbar } = useSnackbar()
    // const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    useEffect(()=>{
        if(auth.user){
            if(auth.user.venceEnDias <= 0){
                setStatus({
                    message: "Cuenta Suspendida, favor realizar su pago inmediatamente.",
                    type: "danger"
                })
                return setStatusCheck(true)
            }
            if(auth.user.venceEnDias <= 15){
                setStatusCheck(true)
                return setStatus({
                    message: "Su licencia vence en "+auth.user.venceEnDias+" días.", 
                    type: "warning"}
                    )
            }
            if(auth.user.venceEnDias > 15 && auth.user.venceEnDias <= 20){
                setStatusCheck(true)
                return setStatus({
                    message: "Su licencia vencerá pronto.", 
                    type: "info"
                    })
            }
        }else{
            return false
        }
    },[auth])

    const salir = () => {
        auth.logout(() => {
            history.push("/")
        })
    }
    const restart = () => {
        restartApp().then(res=>{
            salir()
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
            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item >
                    <Button
                        color="inherit"
                        onClick={handleMenu}
                        className={classes.botonUserFuncions}
                        endIcon={<AccountCircle />}>
                            {auth.user.nombre}
                    </Button>
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
                        {
                            auth.user.level === 0 ?
                            <MenuItem onClick={restart}>Restart</MenuItem>
                            : null
                        }
                        <Divider />
                        <MenuItem onClick={salir}>Salir</MenuItem>
                    </Menu>

                </Grid>
                <StatusDialog open = {statusCheck} status={status} logout={auth.logout} close={close}/>
            </Grid>
        </div>
    )
}

export default UserFunctions