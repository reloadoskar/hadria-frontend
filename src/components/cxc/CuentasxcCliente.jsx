import React, {useRef} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Avatar, IconButton } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print';
import ReceiptIcon from '@material-ui/icons/Receipt'
import PersonIcon from '@material-ui/icons/Person';
import {formatNumber, sumSaldo} from '../Tools'
// import EstadoDeCuenta from './EstadoDeCuenta'
import Cxc from './Cxc'

export default function CuentasxcCliente({cliente}){
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <Accordion ref={componentRef}>
            <AccordionSummary >
                <Grid container >
                    <Grid item xs={2}>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </Grid>

                    <Grid item xs={10}>
                        <Typography align={"right"} variant="h6">
                            {cliente.nombre}
                        </Typography>
                        <Typography align="right" variant="subtitle2">
                            ${formatNumber(sumSaldo(cliente.cuentas),2)}
                        </Typography>
                    </Grid>        
                                          
                </Grid>
            </AccordionSummary>
            <AccordionDetails >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="right" component="div">
                            <IconButton onClick={handlePrint}>
                                <ReceiptIcon />
                            </IconButton>                       
                        </Typography>
                    </Grid>  
                    <Grid item xs={12}>
                        {
                            cliente.cuentas.map((cta,i)=>(
                                <Cxc cta={cta} key={i} />
                            ))
                        }                                
                    </Grid>
                </Grid>
            </AccordionDetails> 
        </Accordion>
    )
}