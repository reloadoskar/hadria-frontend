import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Dialog, Typography } from '@material-ui/core'
import CrearVenta from '../ventas/CrearVenta'
import Reloj from '../herramientas/reloj'
import Corte from '../cortes/Corte'
import useStyles from '../hooks/useStyles'
import CobroDialog from './CobroDialog'
import EgresoDialog from './EgresoDialog'
import PagarDialog from './PagarDialog'
import IngresoCreate from '../ingresos/IngresoCreate'
import { EgresoContext } from '../egresos/EgresoContext'
import { IngresoContext } from '../ingresos/IngresoContext'
export default function DialogPos(props) {
    const { open, close, clientes,
        ubicacion,
        fecha,
        showMessage,
        cxcPdv, addPagoCxc } = props
    const { resetEgresos, loadCuentasPorPagar } = useContext(EgresoContext)
    const { resetIngresos, loadCuentasPorCobrarPdv } = useContext(IngresoContext)
    const classes = useStyles()
    const [corteDialog, setCorteDialog] = useState(false)
    const [crearVenta, setCrearVenta] = useState(false)
    const [cxcDialog, setCxcDialog] = useState(false)
    const [egresoDialog, setEgresoDialog] = useState(false)
    const [pagoDialog, setPagoDialog] = useState(false)

    const [verCrearIngreso, setVerCrearIngreso] = useState(false)

    useEffect(() => {
        const loadAll = async () =>{
            const res = await Promise.all([                
                resetEgresos(),
                resetIngresos(),
                loadCuentasPorPagar(),
                loadCuentasPorCobrarPdv()
            ])
            return res
        }
        loadAll().then(()=>{

        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const toggleCxcDialog = () => {
        setCxcDialog(!cxcDialog)
    }
    const togglePagoDialog = () => {
        setPagoDialog(!cxcDialog)
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

    const showCorte = () => setCorteDialog(true)
    const closeDialogCorte = () => setCorteDialog(false)
    const closeDialogPago = () => setPagoDialog(false)
    return (
        <Dialog
            open={open}
            onClose={() => { close() }}
            fullScreen
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8} container>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" align="center">{ubicacion ? ubicacion.nombre : "ups!"}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="h6" align="center">{fecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}><Reloj /></Grid>
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={() => openCrearVenta()}
                        className={classes.botonCosmico}
                    >
                        Nueva venta +
                    </Button>
                    <CrearVenta
                        open={crearVenta}
                        close={closeCrearVenta}
                        clientes={clientes}
                        // elinventario={inventario.inventario}
                        laubicacion={ubicacion}
                        lafecha={fecha}
                        showMessage={showMessage}
                        addVenta={props.addVenta}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={() => setVerCrearIngreso(true)}
                        className={classes.botonCosmico}
                    >
                        Nuevo ingreso +
                    </Button>
                    <IngresoCreate
                        open={verCrearIngreso}
                        close={() => setVerCrearIngreso(false)}
                        ubicacion={ubicacion}
                        fecha={fecha}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={() => toggleCxcDialog()}
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
                        onClick={() => togglePagoDialog()}
                        className={classes.botonGenerico}
                    >
                        Pagar -
                    </Button>
                    <PagarDialog
                        fecha={fecha}
                        ubicacion={ubicacion}
                        open={pagoDialog}
                        close={closeDialogPago}
                    />
                </Grid>

                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={() => toggleEgesoDialog()}
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
                        onClick={() => showCorte()}
                        className={classes.botonGenerico}
                    >
                        Revisar Corte
                    </Button>
                    {corteDialog ?
                        <Corte 
                            open={corteDialog}
                            close={closeDialogCorte}
                            ubicacion={ubicacion}
                            fecha={fecha}
                        />
                        : null
                    }
                </Grid>
                <Grid item xs={8}>
                    <Button
                        fullWidth
                        onClick={() => close()}
                        className={classes.botonSimplon}
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}