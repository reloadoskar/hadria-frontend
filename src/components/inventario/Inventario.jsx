import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Button, Tabs, Tab } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import useInventario from '../inventario/useInventario'
import VistaPorFolio from './VistaPorFolio'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
import GraficaInventario from './GraficaInventario'
export default function Inventario(){
    const classes = useStyles()
    const inventario = useInventario()
    const [moverDialog, setMoverDialog] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    useEffect(() => {
        // setLoading(true)
        const loadAll = async () =>{
            const res = await Promise.all([
                inventario.getInventarioGeneral(),
                inventario.getInventarioXUbic()                
            ])
            return res
        }
        loadAll().then(res=>{
            // setLoading(false)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
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
                </Grid>                
            </Grid>
        </Container>
    )
}