import React, { useState, useEffect } from 'react'

import Balance from './Balance'
import CuentasPorCobrar from './CuentasPorCobrar'

import CuentasPorPagar from './CuentasPorPagar'
import ComprasDash from './ComprasDash'
import ProduccionsDash from './ProduccionsDash'
import Pagar from './Pagar'
import Cobrar from './Cobrar'
import useUser from '../hooks/useUser'

import { Grid, Box, IconButton, CircularProgress, Typography, Backdrop } from '@material-ui/core';
// import useStyles from './hooks/useStyles'

import useBalance from '../hooks/useBalance'
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useSnackbar } from 'notistack';
import useStyles from '../hooks/useStyles'
export default function Dashboard() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useUser()
    const balance = useBalance()
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const[bckdrpOpen, setBdopen] = useState(false)

    useEffect(() => {
        if(balance === null){
            setBdopen(true)
        }else{
            setBdopen(false)
        }
    }, [balance])

    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    const showPagar = () => {
        setPagar(true)
    }

    const closePagar = () => {
        setPagar(false)
    }

    const showCobrar = () => {
        setCobrar(true)
    }

    const closeCobrar = () => {
        setCobrar(false)
    }
    return (

        <Grid container spacing={2}>
            <Backdrop className={classes.backdrop} open={bckdrpOpen} children={
                    <div>
                        <Typography align="center" variant="subtitle1" children="Espere..." />
                        <CircularProgress color="inherit" />
                    </div>
            } />
            {
                balance === null || user === null || cobrar === null || pagar === null ?
                    null
                    :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Box display={user.level > 1 ? 'none' : 'inline'}>
                                <Grid container justify="flex-end">
                                    <IconButton onClick={showCobrar}>
                                        <PaymentIcon />
                                    </IconButton>
                                    <IconButton onClick={showPagar}>
                                        <AttachMoneyIcon />
                                    </IconButton>
                                    <IconButton>
                                        <CompareArrowsIcon />
                                    </IconButton>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display={user.level > 1 ? 'none' : 'inline'}>
                                <Balance balance={balance} backdrop={bckdrpOpen}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ComprasDash />
                                </Grid>
                                <Grid item xs={12}>
                                    <ProduccionsDash />
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CuentasPorCobrar />

                                </Grid>
                                <Grid item xs={12}>
                                    <CuentasPorPagar />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Cobrar isOpen={cobrar} cuentas={balance.cuentasPc} close={closeCobrar} showMessage={showMessage} />
                        <Pagar isOpen={pagar} cuentas={balance.cuentasPp} close={closePagar} saldos={balance.dispPorUbic} showMessage={showMessage} />
                    </React.Fragment>
            }
        </Grid>
    )
}