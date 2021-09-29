import React, { useState } from 'react'
import { Dialog, DialogContent, Typography } from '@material-ui/core'
import codiPay from '../../img/codiPay.jpg'
import codi from '../../img/codi.png'
export default function PagarAhora({open, close}){
    const handleClose = () => {
        close()
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm">
            <DialogContent>
                <Typography align="center">Paga ahora desde tu celular</Typography>
                <Typography align="center"><img width="100" src={codi} alt="codi logo"/></Typography>
                <Typography align="center"><img width="300" src={codiPay} alt="codi code"/></Typography>
                <Typography align="center">Escanea este c&oacute;digo desde la aplicai&oacute;n de tu banco</Typography>
            </DialogContent>
        </Dialog>
    )
}