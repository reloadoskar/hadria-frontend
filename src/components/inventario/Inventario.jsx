import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import useInventario from '../inventario/useInventario'
import VistaPorFolio from './VistaPorFolio'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
import GraficaInventario from './GraficaInventario'
export default function Inventario({ubicacions}){
    const inventario = useInventario()
    const classes = useStyles()
    // const [verFolios, setVerFolios] = useState(true)
    // const [verUbicaciones, setVerUbicaciones] = useState(false)
    const [moverDialog, setMoverDialog] = useState(false)
    // const [isMounted, setIsmounted] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(() => {
        inventario.getInventarioGeneral()
        inventario.getInventarioXUbic()
    },[])
    // function toggleVerFolios(){
    //     setVerFolios(!verFolios)
    // }
    // function toggleVerUbicaciones(){
    //     setVerUbicaciones(!verUbicaciones)
    // }
    const openMoverDialog = () => {
        setMoverDialog(true)
        inventario.getInventarioXUbic()
    }
    const closeMoverDialog = () =>{
        setMoverDialog(false)
    }
    return (
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
                            inventario={inventario.inventarioXub} 
                            ubicacions={ubicacions}
                            mover={inventario.mover}
                            update={inventario.updating}
                        /> 
                    </Grid>
                <Grid item xs={12}>
                    <Tabs
                        value={tabSelected}
                        onChange={selectTab}
                        centered>
                        <Tab label="x Ubicaci&oacute;n" value={1}/>
                        <Tab label="x Folio" value={2}/>
                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                        <GraficaInventario />
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        <VistaPorFolio compras={ inventario.inventarioGeneral}/>
                    </div>
                    {/* <Typography component="div" align="center">
                        Ver por FOLIO
                        <Switch 
                            checked={verFolios}
                            onChange={toggleVerFolios}
                        />
                        Ver por UBICACION
                        <Switch 
                            checked={verUbicaciones}
                            onChange={toggleVerUbicaciones}
                        />
                    </Typography> */}
                </Grid>
                {/* {verFolios === false ? null : 
                    <Grid item container xs={12} spacing={2}>
                        
                    </Grid>
                } */}
            </Grid>
        </Container>
    )
}