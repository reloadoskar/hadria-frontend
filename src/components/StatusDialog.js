import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, Card, CardHeader, CardContent } from '@material-ui/core'
// import basicQR from '../img/basicQR.jpeg'
import useStyles from './hooks/useStyles'
const PaymentDetails = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="BASIC" classes={{ root: classes.basic, }} />
                    <CardContent>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={8}>
                                <Typography align="right" variant="h3"  children="$399"/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="left"  children=" /al mes"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" children="Un pago anual de $4,788" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card elevation={8}>
                    <CardHeader title="PRO" subheader="Recomendado" classes={{ root: classes.pro, }} />
                    <CardContent>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={8}>
                                <Typography align="right" variant="h3"  children="$599"/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="left" children=" /al mes"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" children="Un pago anual de $7,188" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="MASTER" classes={{ root: classes.master, }} />
                    <CardContent>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={8}>
                                <Typography align="right" variant="h3"  children="$999"/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="left" variant="subtitle1"  children=" /al mes"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" children="Un pago anual de $11,988" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
const StatusDialog = (props) => {
    const {open, status, logout, close} = props
    const classes = useStyles();
    const handleClose = () =>{
        return close()
    }
    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            classes={
                status.type === "danger" ?
                { paper: classes.suspended, }
                :
                { paper: classes.pagosCard, }

            }
        >
            <DialogTitle>
                {
                        status.type === "danger" ?
                            "Cuenta suspendida"
                        :
                            status.message
                }
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography align="center" variant="h4" children="Aprovecha nuestras ofertas por tiempo limitado:"/>
                    </Grid>
                    <Grid item xs={12}>
                        <PaymentDetails />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {
                    status.type === "danger" ?
                        <div>
                            <Button onClick={logout} color="primary">
                                Salir
                            </Button>
                        </div>
                    :
                    <div>
                        <Button onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    </div>
                }
            </DialogActions>
        </Dialog>
    )
}

export default StatusDialog