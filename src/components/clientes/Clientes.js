import React, {useState} from 'react'
import { Button, Container, Grid, Typography} from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import useClientes from './useClientes'
import CrearCliente from './CrearCliente'
import { useSnackbar } from 'notistack'
import Cliente from './Cliente'
export default function Clientes(){
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const {clientes, crearCliente} = useClientes()
    const [dialogOpen, setDialogOpen] = useState(false)
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (cliente) =>{
        crearCliente(cliente).then(res => {
            if(res.status === 'success'){
                enqueueSnackbar(res.message, { variant: res.status })
                closeDialog()
            }
        })
    }
    return(
        <Container>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h6" >
                        Clientes
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Button fullWidth className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        Agregar
                    </Button>
                    <CrearCliente open={dialogOpen} close={closeDialog} crear={crear}/>
                </Grid>
                
            </Grid>
            <Grid container spacing={2}>
                {
                    clientes.map((cliente, i) => (
                        <Cliente key={i} cliente={cliente} />
                    ))
                }
            </Grid>
        </Container>
    )
}