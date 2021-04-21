import React, {useState} from 'react'
import { Button, Card, CardMedia, CardContent, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import useClientes from './useClientes'
import CrearCliente from './CrearCliente'

export default function Clientes(){
    const classes = useStyles()
    const {clientes, crearCliente} = useClientes()
    const [dialogOpen, setDialogOpen] = useState(false)
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (cliente) =>{
        crearCliente(cliente).then(res => {

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
                    <Button className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        Agregar
                    </Button>
                    <CrearCliente open={dialogOpen} close={()=>closeDialog()} crear={crear}/>
                </Grid>
                
            </Grid>
            <Grid container spacing={2}>
                {
                    clientes.map((cliente, i) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                <Card>
                                    <CardMedia
                                        className={classes.media}
                                        image={cliente.sexo === 'H' ? avatarh : avatarm}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" >{cliente.nombre}</Typography>
                                        <Typography>{cliente.telefono}</Typography>
                                        <Typography>{cliente.email}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}