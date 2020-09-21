import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import {saveCorte} from '../api'

import { Dialog, Slide, DialogTitle, DialogContent, Grid, Typography, Divider, ListItem, DialogActions, Button } from '@material-ui/core'

import {sumImporte, sumAcuenta, calcTotal} from '../Tools'

import ContenedorTabla from './ContenedorTabla'
import TablaVentas from './TablaVentas'
import TablaIngresos from './TablaIngresos'
import TablaEgresos from './TablaEgresos'

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

export default function CorteDialog({isOpen, close, data, showMessage}){

    const [values, setValues] = useState({show: false, confirm: false, table: '', data: ''})
    const [corteData, setCorteData] = useState({
        ventas: [],
        ingresos: [],
        creditos: [],
        egresos: [],
        total: 0,
        totalVentas:0,
        totalIngresos:0,
        totalCreditos:0,
        totalEgresos:0,
    })

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
                        <Grid item xs>
                            <ListItem 
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">

                                        <Typography align="right" variant="h5">{corteData.ventas.length} Ventas</Typography>
                                        <Typography align="right" variant="h4">$ {corteData.totalVentas}</Typography>
                                        <Typography align="right" variant="body2" children="Bruto" color="textSecondary" paragraph/>

                                    </Grid>
                                }
                                onClick={() => handleClick('Ventas', corteData.ventas)}
                            />
                        </Grid>
                        <Grid item xs>
                            <ListItem
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="h5">{corteData.ingresos.length} Ingresos</Typography>
                                        <Typography align="right" variant="h4" >+ ${corteData.totalIngresos}</Typography>
                                        <Typography align="right" variant="body2" children="Cobranza / Otros" color="textSecondary" paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Ingresos', corteData.ingresos)}
                            />
                        </Grid>
                        <Grid item xs>
                            <ListItem
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="h5">{corteData.creditos.length} Créditos</Typography>
                                        <Typography align="right" variant="h4" color="secondary">- ${corteData.totalCreditos}</Typography>
                                        <Typography align="right" variant="h6" children={"+ $"+corteData.totalAcuenta}/>
                                        <Typography align="right" variant="body2" children="a cuenta" color="textSecondary"  paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Créditos', corteData.creditos)}
                                />
                        </Grid>
                        <Grid item xs>
                            <ListItem 
                                button
                                children={
                                    <Grid container justify="flex-end" direction="column">
                                        <Typography align="right" variant="h5">{corteData.egresos.length} Egresos</Typography>
                                        <Typography align="right" variant="h4" color="secondary">- ${corteData.totalEgresos}</Typography>
                                        <Typography align="right" variant="body2" children="Egresos / Gastos / Pagos" color="textSecondary" paragraph/>
                                    </Grid>
                                }
                                onClick={() => handleClick('Egresos', corteData.egresos)}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography align="right" variant="h5">Total</Typography>
                            <Typography align="right" variant="h4" >= ${corteData.total}</Typography>
                            <Typography align="right" variant="body2" children="Saldo en caja" color="textSecondary" paragraph/>
                        </Grid>
                    </Grid>

                    <Divider />
                    <TablaVentas table="Ventas" data={corteData.ventas }/>
                    <TablaIngresos table="Ingresos" data={corteData.ingresos} />
                    <TablaEgresos table="Egresos" data={corteData.egresos} />
                    <ShowTable show={values.show} table={values.table} data={values.data} />
                </div>
                :
                <Typography align="center" variant="h3" children="No se encontraron datos." />
            }

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose('corteDialog')} color="primary">
                    Salir
                </Button>
                <Button type="button" variant="contained" onClick={() => confirm()} color="primary">
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