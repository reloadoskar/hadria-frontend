import React, {useState, useEffect} from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import useEmpleados from './useEmpleados'
import CrearEmpleado from './CrearEmpleado'
import Empleado from './Empleado'
import useUbicacions from '../ubicaciones/useUbicacions';
import { sumSueldo } from '../Tools'
export default function Empleados(){
    const classes = useStyles()
    const Empleados = useEmpleados()
    const [dialogOpen, setDialogOpen] = useState(false)
    const {ubicacions} = useUbicacions()
    useEffect(()=>{
        Empleados.fetchEmpleados()
    },[])
    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (empleado) =>{
        if(Empleados.empleados.length <10){
            Empleados.crearEmpleado(empleado).then(res => {
                // console.log(res)
            })
        }else{
            alert('Maximo de empleados alcanzado')
        }
    }


    return Empleados.empleados.length > 0 ?
        <Container>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={8}>
                    <Button fullWidth className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        Agregar
                    </Button>
                    <CrearEmpleado open={dialogOpen} close={()=>closeDialog()} crear={crear}/>
                </Grid>
                <Grid item xs={12} >
                    <Typography align="right" className={classes.textoMiniFacheron}>Nomina menual</Typography>
                    <Typography align="right" className={classes.textoMirame}>${sumSueldo(Empleados.empleados)}</Typography>
                </Grid>
                <Grid container spacing={2}>
                {
                    Empleados.empleados.filter(e=>e.level !== 0).map((empleado, i) => (
                        <Empleado data={empleado} key={i} index={i} update={Empleados.update} del={Empleados.eliminarEmpleado} ubicacions={ubicacions} />
                    ))
                }
                </Grid>
            </Grid>
        </Container>
        :
    null
}