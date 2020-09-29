import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import { Grid, IconButton, Typography, Menu, MenuItem, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import moment from 'moment'
import StatusDialog from './StatusDialog';
var now = moment();
const UserFunctions = (props) => {
    const {auth} = props
    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        database: '',
        level: ''
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl)
    const [statusCheck, setStatusCheck] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type, persist) => { enqueueSnackbar(text, {variant: type} ) }
    
    const checkAccountStatus = (now, later) =>{
        var days = now.diff(later, 'days')
        if(days === 0){
            setStatusMessage("Cuenta Suspendida, favor realizar su pago inmediatamente.")
            return setStatusCheck(true)
        }
        if(days > -15){

            return showMessage("Su licencia vence en "+days*-1+" días.", "warning")
        }
    }
    useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        setData({
            nombre: decoded.nombre,
            apellido: decoded.apellido,
            email: decoded.email,
            database: decoded.database,
            level: decoded.level,
            tryPeriodEnds: decoded.tryPeriodEnds,
            paidPeriodEnds: decoded.paidPeriodEnds,
        })
        checkAccountStatus(now, moment(decoded.paidPeriodEnds))
        return () => {
            setData([])
        }
    }, [])


    const logout = () => {
        setData([])
        localStorage.clear()
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
            <StatusDialog open = {statusCheck} message={statusMessage}/>
        </div>
    )
}

export default UserFunctions