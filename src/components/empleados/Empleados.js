import React, {useState} from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import useEmpleados from './useEmpleados'
import CrearEmpleado from './CrearEmpleado'
import Empleado from './Empleado'
import useUbicacions from '../ubicaciones/useUbicacions';
export default function Empleados(){
    const classes = useStyles()
    const {empleados, crearEmpleado, update} = useEmpleados()
    const [dialogOpen, setDialogOpen] = useState(false)
    const {ubicacions} = useUbicacions()
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (empleado) =>{
        if(empleados.length <6){
            crearEmpleado(empleado).then(res => {
                console.log(res)
            })
        }else{
            alert('Maximo de empleados alcanzado')
        }
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
                        <Empleado data={empleado} key={i} update={update} ubicacions={ubicacions} />
                    ))
                }
            </Grid>
        </Container>
    )
}