import React, {useState, useEffect, useContext} from 'react'
import { Container, Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
import GraficaInventario from './GraficaInventario'
import { InventarioContext } from './InventarioContext'
import InventarioPorUbicacion from './InventarioPorUbicacion'
import Movimientos from './Movimientos'
import PesadasContextProvider from './PesadasContext'
export default function Inventario(){
    const classes = useStyles()
    const {inventarioUbicacion, loadInventarioGeneral, resetInventario} = useContext(InventarioContext)
    const [moverDialog, setMoverDialog] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(() => {
        resetInventario()
        const loadAll = async () =>{
            const res = await Promise.all([
                loadInventarioGeneral(),
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
                            inventario={inventarioUbicacion} 
                        /> 
                    </Grid>
                <Grid item xs={12}>
                    <Tabs
                        value={tabSelected}
                        onChange={selectTab}
                        centered>
                        <Tab label="Ver por Ubicaci&oacute;n" value={1}/>
                        <Tab label="Ver Movimientos" value={2}/>
                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                            <GraficaInventario inventario={inventarioUbicacion}/>
                        <Grid container spacing={2}>
                            <InventarioPorUbicacion inventario={inventarioUbicacion} />
                        </Grid>              
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        <Movimientos />
                    </div>
                </Grid>  
            </Grid>
        </Container>
        </PesadasContextProvider>
    )
}