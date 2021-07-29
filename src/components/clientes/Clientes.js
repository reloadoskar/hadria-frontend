import React, {useState} from 'react'
import { Button, Container, Grid} from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import useClientes from './useClientes'
import CrearCliente from './CrearCliente'
import { useSnackbar } from 'notistack'
import Cliente from './Cliente'
export default function Clientes(){
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const Client = useClientes()
    const [dialogOpen, setDialogOpen] = useState(false)
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (cliente) =>{
        Client.crearCliente(cliente).then(res => {
            if(res.status === 'success'){
                enqueueSnackbar(res.message, { variant: res.status })
                closeDialog()
            }
        })
    }
    return(
        <Container>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={8}>
                    <Button fullWidth className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        Agregar
                    </Button>
                    <CrearCliente open={dialogOpen} close={closeDialog} crear={crear}/>
                </Grid>
                <Grid container spacing={2}>
                    {
                        Client.clientes.map((cliente, i) => (
                            <Cliente key={i} cliente={cliente} update={Client.updCliente} />
                        ))
                    }
                </Grid>
                
            </Grid>
        </Container>
    )
}