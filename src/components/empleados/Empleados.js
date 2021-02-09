import React, {useState} from 'react'
import { Button, Card, CardMedia, CardContent, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import useEmpleados from './useEmpleados'
import CrearEmpleado from './CrearEmpleado'

export default function Empleados(){
    const classes = useStyles()
    const {empleados, crearEmpleado} = useEmpleados()
    const [dialogOpen, setDialogOpen] = useState(false)
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (empleado) =>{
        crearEmpleado(empleado).then(res => {
            console.log(res)
        })
    }
    return(
        <Container>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h6" >
                        Empleados
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Button className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        Agregar
                    </Button>
                    <CrearEmpleado open={dialogOpen} close={()=>closeDialog()} crear={crear}/>
                </Grid>
                
            </Grid>
            <Grid container spacing={2}>
                {
                    empleados.map((empleado, i) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                <Card>
                                    <CardMedia
                                        className={classes.media}
                                        image={empleado.sexo === 'H' ? avatarh : avatarm}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" >{empleado.nombre}</Typography>
                                        <Typography>{empleado.telefono}</Typography>
                                        <Typography>{empleado.email}</Typography>
                                        <Typography>{empleado.ubicacion.nombre}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}