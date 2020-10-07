import React, { useState, useEffect } from 'react'

import Balance from './Balance'
import CuentasPorCobrar from './CuentasPorCobrar'

import CuentasPorPagar from './CuentasPorPagar'
import ComprasDash from './ComprasDash'
import Produccions from '../produccions/Produccions'
import Pagar from './Pagar'
import Cobrar from '../creators/Cobro'

import useUser from '../hooks/useUser'
import useProduccions from '../produccions/useProduccions'

import { Grid, Box, IconButton, Backdrop, Typography, CircularProgress } from '@material-ui/core';

import useBalance from '../hooks/useBalance'
import useStyles from '../hooks/useStyles'
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useSnackbar } from 'notistack';

export default function Dashboard() {
    const {produccions} = useProduccions()
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
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
                                <Balance balance={balance} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Produccions produccions={produccions}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <ComprasDash />
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
