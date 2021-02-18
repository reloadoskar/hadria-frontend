import React, { useEffect, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import {saveCorte} from '../api'

import { Dialog, Slide, DialogTitle, DialogContent, Backdrop, Grid, Typography, DialogActions, Button, Tabs, Tab, CircularProgress } from '@material-ui/core'

import {
    // sumImporte, 
    // sumAcuenta, 
    // calcTotal, 
    formatNumber} from '../Tools'

import TablaVentas from './TablaVentas'
import TablaIngresos from './TablaIngresos'
import TablaEgresos from './TablaEgresos'
import TablaCreditos from './TablaCreditos'
import useStyles from '../hooks/useStyles'

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && 
          
          children
          
        }
      </div>
    );
  }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CorteDialog({isOpen, close, corteData, data, showMessage, ubicacions, fecha, ubicacion, delVenta}){
    const classes = useStyles()
    const [values, setValues] = useState({show: false, confirm: false, table: '', data: '', tabSelected: 0})
    const [corte, setCorte] = useState(null)
    useEffect(()=>{
        if(corteData){
            setCorte(corteData)
        }
        return () => setCorte(null)
    }, [corteData])
    const handleClose = (dialog) => {
        if(dialog === 'confirm'){
            setValues({...values, confirm: false})
        }
        setCorte(null)
        close(dialog)
    }

    const confirm = () => {
        setValues({...values, confirm: true})
    }

    const cierraCorte = (corteConfirmed) => {
        corteConfirmed.fecha = fecha
        corteConfirmed.ubicacion = ubicacion._id[0]
        // console.log(corteConfirmed)
        saveCorte(corteConfirmed).then( res => {
            showMessage(res.message, res.status)
            close('corteDialog')
            close('posDialog')
        })
    }

    const handleChange = (event, newValue) => {
        setValues({...values, tabSelected: newValue});
    }

    function closeConfirm(){
        setValues({...values, confirm: false})
    }
    
    return (
        <div>
        <Dialog
            fullScreen
            open={isOpen} 
            onClose={() => handleClose('corteDialog')} 
            TransitionComponent={Transition}
            >
            {corte === null ? 
                <Backdrop className={classes.backdrop} open={true}>
                    <Grid container alignItems="center" direction="column">
                        <Grid item>
                            <CircularProgress color="inherit"/>
                        </Grid>
                        <Grid item>
                            <Typography>Cargando...</Typography>
                        </Grid>
                    </Grid>
                </Backdrop>
            :
                <div>
                <DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >{ubicacion._id[0].nombre} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justify="flex-end">
                                <Typography variant="h6" >{data.fecha}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                <Tabs
                        value={values.tabSelected}
                        onChange={handleChange}
                        centered
                    >
                        <Tab label={
                            <div>
                                <Typography align="right" variant="body1">{corte.ventas.length} Ventas</Typography>
                                <Typography align="right" variant="h4">$ {formatNumber(corte.tventas)}</Typography>
                                <Typography align="right" variant="body2" children="Bruto" color="textSecondary" paragraph/>
                            </div>

                        } {...a11yProps(0)}></Tab>
                        <Tab label={
                            <div>
                                <Typography align="right" variant="body1">{corte.ingresos.length} Ingresos</Typography>
                                <Typography align="right" variant="h4" >+ ${formatNumber(corte.tingresos)}</Typography>
                                <Typography align="right" variant="body2" children="Cobranza / Otros" color="textSecondary" paragraph/>
                            </div>
                        } {...a11yProps(1)}></Tab>
                        <Tab label={
                            <div>
                                <Typography align="right" variant="body1">{corte.creditos.length} Créditos</Typography>
                                <Typography align="right" variant="h4" color="secondary">- ${formatNumber(corte.tcreditos)}</Typography>
                                <Typography align="right" variant="h6" children={"+ $"+corte.tacuenta}/>
                                <Typography align="right" variant="body2" children="a cuenta" color="textSecondary"  paragraph/>
                            </div>
                        } {...a11yProps(2)}></Tab>
                        <Tab label={
                            <div>
                                <Typography align="right" variant="body1">{corte.egresos.length} Egresos</Typography>
                                <Typography align="right" variant="h4" color="secondary">- ${formatNumber(corte.tegresos)}</Typography>
                                <Typography align="right" variant="body2" children="Egresos / Gastos / Pagos" color="textSecondary" paragraph/>
                            </div>
                        } {...a11yProps(3)}></Tab>
                        <Tab label={
                            <div>
                                <Typography align="right" variant="body1">Total</Typography>
                                <Typography align="right" variant="h4" >= ${formatNumber(corte.total)}</Typography>
                                <Typography align="right" variant="body2" children="Saldo en caja" color="textSecondary" paragraph/>
                            </div>
                        } {...a11yProps(4)}></Tab>

                    </Tabs>
                    <TabPanel  value={values.tabSelected} index={0}>
                        <TablaVentas data={corte.ventas} cancelar={delVenta}/>
                    </TabPanel>
                    <TabPanel  value={values.tabSelected} index={1}>
                        <TablaIngresos data={corte.ingresos} />
                    </TabPanel>
                    <TabPanel  value={values.tabSelected} index={2}>
                        <TablaCreditos data={corte.creditos} />
                    </TabPanel>
                    <TabPanel  value={values.tabSelected} index={3}>
                        <TablaEgresos data={corte.egresos} />
                    </TabPanel>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={() => handleClose('corteDialog')} >
                        Salir
                    </Button>
                    <Button className={classes.botonGenerico} type="button" onClick={() => confirm()} >
                        Cerrar corte
                    </Button>
                </DialogActions>
                <ConfirmDialog 
                    ubicacions={ubicacions}
                    id="confirma cierre de corte"
                    keepMounted
                    open={values.confirm}
                    onClose={closeConfirm}
                    data={corte}
                    cierraCorte={cierraCorte}
                />
                </div>
            }
        </Dialog>
        </div>
    )
}