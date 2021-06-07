import React, {useState, useEffect} from 'react'
import { Grid, Button, Dialog, Typography } from '@material-ui/core'
import CrearVenta from '../ventas/CrearVenta'
import Reloj from '../herramientas/reloj'
import Corte from '../cortes/Corte'
import useStyles from '../hooks/useStyles'
import CobroDialog from './CobroDialog'
import EgresoDialog from './EgresoDialog'
export default function DialogPos(props){
    const {open, close, clientes, inventario, ubicacion, ubicacions, fecha, showMessage, user, cortes, cxcPdv, addPagoCxc} = props
    
    const classes = useStyles()
    const [corte, setCorte] = useState(null)
    const [corteDialog, setCorteDialog] = useState(false)
    const [crearVenta, setCrearVenta] = useState(false)
    const [cxcDialog, setCxcDialog] = useState(false)
    const [egresoDialog, setEgresoDialog] = useState(false)
    
    const toggleCxcDialog = () => {
        setCxcDialog(!cxcDialog)
    }
    const toggleEgesoDialog = () => {
        setEgresoDialog(!egresoDialog)
    }

    const openCrearVenta = () => {
        setCrearVenta(true)
    }
    const closeCrearVenta = () => {
        setCrearVenta(false)
    }
    
    const showCorte = () => {
        cortes.getCorte(ubicacion._id, fecha).then(res=>{
            if(res.status === 'error'){
                showMessage(res.message, res.status)
                closeDialogCorte()
            }else{
                setCorte(res)
                setCorteDialog(true)
            }
        })
    }

    const closeDialogCorte = () => {
        setCorteDialog(false)
    }

    function onChangeFecha(fecha){
        setCorte(null)
        cortes.getCorte(corte.ubicacion._id, fecha).then(res => {
            setCorte(res)
        })
        // setFecha(fecha)
    }
    function saveCorte(corte){
        cortes.guardarCorte(corte).then( res => {
            showMessage(res.message, res.status)
            closeDialogCorte()
            close()
        })
    }
    return(
        <Dialog
            open={open}
            onClose={()=>{close()}}
            fullScreen
            >
            <Grid container spacing={2} justify="center">
                <Grid item xs={8} container>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" align="center">{ubicacion.nombre}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" align="center">{fecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}><Reloj /></Grid>
                </Grid>

                <Grid item xs={8}>
                    <Button 
                        fullWidth
                        onClick={()=>openCrearVenta()}
                        className={classes.botonCosmico}
                    >
                        Nueva venta +
                    </Button>
                    <CrearVenta
                        open={crearVenta}
                        close={closeCrearVenta}
                        clientes={clientes} 
                        elinventario={inventario.inventario}
                        laubicacion={ubicacion}
                        lafecha={fecha}
                        showMessage={showMessage}
                        addVenta={props.addVenta}
                    />
                </Grid>
                
                <Grid item xs={8}>
                    <Button 
                        fullWidth
                        onClick={()=>toggleCxcDialog()}
                        className={classes.botonGenerico}
                    >
                        Cobrar +
                    </Button>
                    <CobroDialog                                 
                        open={cxcDialog}
                        fecha={fecha}
                        cuentas={cxcPdv}
                        cobrar={addPagoCxc}
                        ubicacion={ubicacion}
                        close={toggleCxcDialog}
                        showMessage={showMessage}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={()=>toggleEgesoDialog()}
                        className={classes.botonGenerico}
                    >
                        Nuevo gasto -
                    </Button>
                    <EgresoDialog 
                        fecha={fecha}
                        ubicacion={ubicacion}
                        open={egresoDialog}
                        close={toggleEgesoDialog}
                        showMessage={showMessage}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth 
                        onClick={()=>showCorte()} 
                        className={classes.botonGenerico}
                    >
                        Revisar Corte
                    </Button>
                    <Corte 
                        user={user}
                        ubicacions={ubicacions}
                        fecha={fecha}
                        open={corteDialog}
                        close={closeDialogCorte}
                        corte={corte}
                        onChangeFecha={onChangeFecha}
                        guardar={saveCorte}
                        message={showMessage}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        fullWidth 
                        onClick={()=>close()} 
                        className={classes.botonSimplon}
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}