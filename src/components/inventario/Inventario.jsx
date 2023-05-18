import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
import GraficaInventario from './GraficaInventario'
import InventarioPorUbicacion from './InventarioPorUbicacion'
import Movimientos from './Movimientos'
import Cambios from './Cambios'
import { useAuth } from '../auth/use_auth'
import PesadasContextProvider from './PesadasContext'
import { useInventario } from './InventarioContext'
import {useEmpleados} from '../empleados/EmpleadoContext'
export default function Inventario(){
    const {user} = useAuth()
    const classes = useStyles()
    const {inventarioPorUbicacion, loadInventarioGeneral, resetInventario} = useInventario()
    const {loadEmpleados} = useEmpleados()
    const [moverDialog, setMoverDialog] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(() => {
        resetInventario()
        const loadAll = async () =>{
            const res = await Promise.all([
                loadInventarioGeneral(user),
                loadEmpleados(user)
            ])
            return res
        }
        loadAll()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const openMoverDialog = () => {
        setMoverDialog(true)
    }
    const closeMoverDialog = () =>{
        setMoverDialog(false)
    }
    return (
        <PesadasContextProvider>
        <Container maxWidth="lg">
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Typography variant="h6" >Inventario</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        className={classes.botonGenerico}
                        endIcon={<CompareArrowsIcon />}
                        onClick={openMoverDialog}
                        fullWidth
                        >
                        Mover
                    </Button>
                        <Mover
                            open={moverDialog} 
                            close={closeMoverDialog}
                            inventario={inventarioPorUbicacion} 
                        /> 
                    </Grid>
                <Grid item xs={12}>
                    <Tabs
                        value={tabSelected}
                        onChange={selectTab}
                        centered>
                        <Tab label="Inventario por Ubicaci&oacute;n" value={1}/>
                        <Tab label="Cambios" value={3}/>
                        <Tab label="Movimientos" value={2}/>

                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                            <GraficaInventario inventario={inventarioPorUbicacion}/>
                        <Grid container spacing={2}>
                            <InventarioPorUbicacion inventario={inventarioPorUbicacion} />
                        </Grid>              
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        <Movimientos />
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 3}>
                        <Cambios />
                    </div>
                </Grid>  
            </Grid>
        </Container>
        </PesadasContextProvider>
    )
}