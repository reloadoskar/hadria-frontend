import React, {useState, useEffect} from 'react'
import { Container, Grid, Typography, Switch, Button } from '@material-ui/core'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import useInventario from '../inventario/useInventario'
import VistaPorFolio from './VistaPorFolio'
import useStyles from '../hooks/useStyles'
import Mover from './Mover'
export default function Inventario({ubicacions}){
    const inventario = useInventario()
    const classes = useStyles()
    const [verFolios, setVerFolios] = useState(true)
    const [verUbicaciones, setVerUbicaciones] = useState(false)
    const [moverDialog, setMoverDialog] = useState(false)
    useEffect(() => {
        inventario.getInventarioGeneral()
        inventario.getInventarioXUbic()
    },[])
    function toggleVerFolios(){
        setVerFolios(!verFolios)
    }
    function toggleVerUbicaciones(){
        setVerUbicaciones(!verUbicaciones)
    }
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
                    <Typography component="div" align="center">
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
                    </Typography>
                </Grid>
                {verFolios === false ? null : 
                    <Grid item container xs={12} spacing={2}>
                        <VistaPorFolio compras={ inventario.inventarioGeneral}/>
                    </Grid>
                }
            </Grid>
        </Container>
    )
}