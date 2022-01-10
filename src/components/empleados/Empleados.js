import React, {useState, useEffect, useContext} from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import {EmpleadoContext} from './EmpleadoContext'
import CrearEmpleado from './CrearEmpleado'
import Empleado from './Empleado'
import { sumSueldo, formatNumber } from '../Tools'
export default function Empleados(){
    const classes = useStyles()
    const {empleados, loadEmpleados, addEmpleado} = useContext(EmpleadoContext)
    const [dialogOpen, setDialogOpen] = useState(false)
    
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        + Nuevo Empleado
                    </Button>
                    <CrearEmpleado open={dialogOpen} close={()=>closeDialog()} crear={crear}/>
                </Grid>
                <Grid item xs={12} >
                    <Typography align="right" className={classes.textoMiniFacheron}>Empleados en nómina</Typography>
                    <Typography align="right" className={classes.textoMirame} variant="h4">{empleados.filter(em=>em.level !== 0).length}</Typography>
                    <Typography align="right" className={classes.textoMiniFacheron}>Nomina menual</Typography>
                    <Typography align="right" className={classes.textoMirame} variant="h4">${ formatNumber( sumSueldo(empleados) )}</Typography>
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