import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid } from '@material-ui/core'
import basicQR from '../img/basicQR.jpeg'
import useStyles from './hooks/useStyles'
const PaymentDetails = () => {
    return (
        <Grid container >
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
                <img src={basicQR} alt="Servicio básico" width="300" />
                <Typography variant="h6"  children="Paquete básico."/>
                <Typography variant="h3"  children="$599.00"/>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    )
}
const StatusDialog = (props) => {
    const {open=true, status, logout, close} = props
    const classes = useStyles();
    const handleClose = () =>{
        return close()
    }
    const pagar = () =>{
        return null
    }
    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            classes={{ paper: classes.pagosCard, }}
        >
            <DialogTitle>
                {
                        status.type === "danger" ?
                            "Cuenta suspendida"
                        :
                            "Status"
                }
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" align="center" children={status.message} />
                <PaymentDetails />
            </DialogContent>
            <DialogActions>
                {
                    status.type === "danger" ?
                    <div>

                        <Button onClick={logout} color="primary">
                            Salir
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Pagar con CODI
                        </Button>
                    </div>
                        :
                        <div>
                            <Button onClick={close} color="primary">
                                Entendido
                            </Button>
                            <Button onClick={pagar} color="primary">
                                Pagar
                            </Button>
                        </div>

                }
            </DialogActions>
        </Dialog>
    )
}

export default StatusDialog