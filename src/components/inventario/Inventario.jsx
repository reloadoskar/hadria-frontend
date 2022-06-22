import React, {useState, useEffect, useContext} from 'react'
import { Container, Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import VistaPorFolio from './VistaPorFolio'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
import GraficaInventario from './GraficaInventario'
import { InventarioContext } from './InventarioContext'
import InventarioPorUbicacion from './InventarioPorUbicacion'
import { agruparPorObjeto } from '../Tools'

export default function Inventario(){
    const classes = useStyles()
    const {inventario, loadInventarioGeneral} = useContext(InventarioContext)
    const [inventarioPorUbicacion, setIpu] = useState([])
    const [inventarioPorFolio, setIpf] = useState([])

    const [moverDialog, setMoverDialog] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(() => {
        // setLoading(true)
        const loadAll = async () =>{
            const res = await Promise.all([
                loadInventarioGeneral()             
            ])
            return res
        }
        loadAll().then(res=>{
            // setLoading(false)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(inventario){
            setIpu(agruparPorObjeto(inventario, 'ubicacion'))
            setIpf(agruparPorObjeto(inventario, 'compra'))
        }
    },[inventario])
    const openMoverDialog = () => {
        setMoverDialog(true)
        // inventario.getInventarioXubic()
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
                            inventario={inventarioPorUbicacion} 
                        /> 
                    </Grid>
                <Grid item xs={12}>
                    <Tabs
                        value={tabSelected}
                        onChange={selectTab}
                        centered>
                        <Tab label="Ver por Ubicaci&oacute;n" value={1}/>
                        <Tab label="Ver por Folio" value={2}/>
                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                            <GraficaInventario inventario={inventarioPorUbicacion}/>
                        <Grid container spacing={2}>
                            <InventarioPorUbicacion inventario={inventarioPorUbicacion} />
                        </Grid>              
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        {/* <VistaPorFolio inventario={inventarioPorFolio}/> */}
                    </div>
                </Grid>  
            </Grid>
        </Container>
    )
}