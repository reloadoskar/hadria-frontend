import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Container, Card, CardContent, TextField, Button, Typography, } from '@material-ui/core';

import { getVenta, } from '../api'
import ConfirmDialog from './ConfirmDialog'
import Venta from './Venta'

const Ventas = (props) => {
    // const { auth } = props
    // let history = useHistory();
    const { enqueueSnackbar } = useSnackbar()
    // const classes = useStyles()
    const [loadingSomething, setLoadingSomething] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [data, setData] = useState({ folio: '', venta: false })

    const showMessage = (text, type) => {
        enqueueSnackbar(
            text,
            {
                variant: type,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
    }

    const handleChange = (field, value) => {
        switch (field) {
            case "folio":

                return setData({ ...data, [field]: value })

            default:
                return setData({ ...data, [field]: value })
        }
        // setData({ ...data, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let dataSend = {
            folio: data.folio
        }
        setLoadingSomething(true)
        getVenta(dataSend).then(res => {
            if (res.status === 'success') {
                setData({ ...data, venta: res.venta })
            }
            setLoadingSomething(false)
        })

    }

    // const openConfirm = () => {
    //     // setCompra(compra)
    //     setConfirm(true)
    // }

    const cancelConfirm = () => {
        setConfirm(false)
        // setCompra(null)
    }

    const okConfirm = (data) => {

        // del(data._id).then(res => {
        //     if (res.status === 'error') {
        //     } else {
        //         showMessage(res.message, res.status)
        //     }
        //     cancelConfirm()
        // })
    }

    return (
        <React.Fragment>
            <Container>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="folio"
                                        label="Buscar Folio:"
                                        variant="outlined"
                                        type="number"
                                        value={data.folio}
                                        onChange={(e) => handleChange('folio', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button fullWidth color="primary" type="submit" variant="contained" disabled={loadingSomething}>Buscar</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>

                {
                    loadingSomething
                        ?
                        <Typography children="Buscando ... " />
                        :
                        <Container>
                        <Card>
                            <CardContent>
                                <Venta data={data.venta} showMessage={showMessage} />
                            </CardContent>
                        </Card>
                        </Container>
                }
                <ConfirmDialog open={confirm} cancel={cancelConfirm} ok={okConfirm} data={data.venta} />

            
        </React.Fragment>
    )
}

export default Ventas