import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import {saveCorte} from '../api'

import { Dialog, Slide, DialogTitle, DialogContent, Grid, Typography, Divider, ListItem, DialogActions, Button, Tabs, Tab } from '@material-ui/core'

import {sumImporte, sumAcuenta, calcTotal, formatNumber} from '../Tools'

import ContenedorTabla from './ContenedorTabla'
import TablaVentas from './TablaVentas'
import TablaIngresos from './TablaIngresos'
import TablaEgresos from './TablaEgresos'
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

const ShowTable = ({show, table, data}) => (
    
    show
        ?
        <ContenedorTabla table={table} data={data} />
        :
        null
  
)

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const init = {
    ventas: [],
    ingresos: [],
    creditos: [],
    egresos: [],
    total: 0,
    totalVentas:0,
    totalIngresos:0,
    totalCreditos:0,
    totalEgresos:0,
}

export default function CorteDialog({isOpen, close, data, showMessage}){
    const classess = useStyles()
    const [values, setValues] = useState({show: false, confirm: false, table: '', data: '', tabSelected: 0})
    const [corteData, setCorteData] = useState(init)

    React.useEffect(() => {
        if (isOpen) {
            setCorteData({
                fecha: data.fecha,
                ubicacion: data.ubicacion,
                ventas: data.ventasCorte,
                ingresos: data.ingresosCorte,
                creditos: data.creditosCorte,
                egresos: data.egresosCorte,
                totalVentas: sumImporte(data.ventasCorte),
                totalIngresos: sumImporte(data.ingresosCorte),
                totalCreditos: sumImporte(data.creditosCorte),
                totalAcuenta: sumAcuenta(data.creditosCorte),
                totalEgresos: sumImporte(data.egresosCorte),
                total: calcTotal( sumImporte(data.ventasCorte), sumImporte(data.creditosCorte), sumAcuenta(data.creditosCorte), sumImporte(data.ingresosCorte), sumImporte(data.egresosCorte) ),
            });
        }
        return () => setCorteData(init)
    }, [data, isOpen]);

    const handleClick = (table, data) => {
        setValues({...values, show: true, table: table, data: data})
    }
    
    const handleClose = (dialog) => {
        if(dialog === 'confirm'){
            setValues({...values, confirm: false})
        }
        close(dialog)
    }

    const confirm = () => {
        setValues({...values, confirm: true})
    }

    const cierraCorte = (corteConfirmed) => {
        // console.log("cerrando...")
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
    
    return (
        <div>
        <Dialog
            fullScreen
            open={isOpen} 
            onClose={() => handleClose('corteDialog')} 
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >{data.ubicacion.nombre} </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="flex-end">
                            <Typography variant="h6" >{data.fecha}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {data.ventasCorte.length > 0 || data.egresosCorte.length > 0 || data.ingresosCorte.length > 0 ?
                    <div>
                    <Grid container>
                        <Grid item xs={12} md>
                            <ListItem 
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">

                                        <Typography align="right" variant="body1">{corteData.ventas.length} Ventas</Typography>
                                        <Typography align="right" variant="h4">$ {formatNumber(corteData.totalVentas)}</Typography>
                                        <Typography align="right" variant="body2" children="Bruto" color="textSecondary" paragraph/>

                                    </Grid>
                                }
                                onClick={() => handleClick('Ventas', corteData.ventas)}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <ListItem
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="body1">{corteData.ingresos.length} Ingresos</Typography>
                                        <Typography align="right" variant="h4" >+ ${formatNumber(corteData.totalIngresos)}</Typography>
                                        <Typography align="right" variant="body2" children="Cobranza / Otros" color="textSecondary" paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Ingresos', corteData.ingresos)}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <ListItem
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="body1">{corteData.creditos.length} Créditos</Typography>
                                        <Typography align="right" variant="h4" color="secondary">- ${formatNumber(corteData.totalCreditos)}</Typography>
                                        <Typography align="right" variant="h6" children={"+ $"+corteData.totalAcuenta}/>
                                        <Typography align="right" variant="body2" children="a cuenta" color="textSecondary"  paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Créditos', corteData.creditos)}
                                />
                        </Grid>
                        <Grid item xs={12} md>
                            <ListItem 
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="body1">{corteData.egresos.length} Egresos</Typography>
                                        <Typography align="right" variant="h4" color="secondary">- ${formatNumber(corteData.totalEgresos)}</Typography>
                                        <Typography align="right" variant="body2" children="Egresos / Gastos / Pagos" color="textSecondary" paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Egresos', corteData.egresos)}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <Typography align="right" variant="body1">Total</Typography>
                            <Typography align="right" variant="h4" >= ${formatNumber(corteData.total)}</Typography>
                            <Typography align="right" variant="body2" children="Saldo en caja" color="textSecondary" paragraph/>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Tabs
                        value={values.tabSelected}
                        onChange={handleChange}
                        centered
                    >
                        <Tab label="Ventas" {...a11yProps(0)}></Tab>
                        <Tab label="Ingresos" {...a11yProps(1)}></Tab>
                        <Tab label="Creditos" {...a11yProps(2)}></Tab>
                        <Tab label="Egresos" {...a11yProps(3)}></Tab>

                    </Tabs>
                        <TabPanel  value={values.tabSelected} index={0}>
                            <TablaVentas table="Ventas" data={corteData.ventas }/>
                        </TabPanel>
                        <TabPanel  value={values.tabSelected} index={1}>
                            <TablaIngresos table="Ingresos" data={corteData.ingresos} />
                        </TabPanel>
                        <TabPanel  value={values.tabSelected} index={1}>
                            <ShowTable show={values.show} table={values.table} data={values.data} />
                        </TabPanel>
                        <TabPanel  value={values.tabSelected} index={1}>
                            <TablaEgresos table="Egresos" data={corteData.egresos} />
                        </TabPanel>
                    {/* 
                    
                     */}
                </div>
                :
                <Typography align="center" variant="h3" children="No se encontraron datos." />
            }

            </DialogContent>
            <DialogActions>
                <Button className={classess.botonSimplon} onClick={() => handleClose('corteDialog')} >
                    Salir
                </Button>
                <Button className={classess.botonGenerico} type="button" onClick={() => confirm()} >
                    Cerrar corte
                </Button>
            </DialogActions>
        </Dialog>
        <ConfirmDialog 
            // classes={{
            //     paper: classes.paper,
            // }}
            id="confirma cierre de corte"
            keepMounted
            open={values.confirm}
            onClose={handleClose}
            data={corteData}
            cierraCorte={cierraCorte}
        />
        </div>
    )
}