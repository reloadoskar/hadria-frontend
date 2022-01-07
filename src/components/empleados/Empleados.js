import React, {useState, useEffect, useContext} from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
// import useEmpleados from './useEmpleados'
import {EmpleadoContext} from './EmpleadoContext'
import CrearEmpleado from './CrearEmpleado'
import Empleado from './Empleado'
import useUbicacions from '../ubicaciones/useUbicacions';
import { sumSueldo } from '../Tools'
export default function Empleados(){
    const classes = useStyles()
    // const Empleados = useEmpleados()
    const {empleados, loadEmpleados, addEmpleado} = useContext(EmpleadoContext)
    const [dialogOpen, setDialogOpen] = useState(false)
    const {ubicacions} = useUbicacions()
    
    useEffect(()=>{
        loadEmpleados()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const closeDialog = () =>{
        setDialogOpen(false)
    }

    const crear = (empleado) =>{
        if(empleados.length <12){
            addEmpleado(empleado).then(res => {
                // console.log(res)
            })
        }else{
            alert('M&aacute;ximo de empleados alcanzado')
        }
    }


    return empleados.length > 0 ?
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
                    <Typography align="right" className={classes.textoMirame}>${sumSueldo(empleados)}</Typography>
                </Grid>
                <Grid container spacing={2}>
                {
                    empleados.filter(e=>e.level !== 0).map((empleado, i) => (
                        <Empleado data={empleado} key={i} />
                    ))
                }
                </Grid>
            </Grid>
        </Container>
        :
    null
}