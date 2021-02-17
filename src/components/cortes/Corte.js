import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import VentaBasic from '../ventas/VentaBasic'
import EgresoBasic from '../egresos/EgresoBasic'
import IngresoBasic from '../ingresos/IngresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber } from '../Tools'

export default function Corte(props){
    const {open, close, corte, fecha, onChangeFecha} = props
    const [elcorte, setElcorte] = useState(null)
    useEffect(()=>{
        if(corte){
            setElcorte(corte)
        }
        return ()=>setElcorte(null)
    },[corte])
    return(
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
        >
            {elcorte === null ? null :
            <React.Fragment>
                <DialogTitle disableTypography>
                    <Grid container >
                        <Grid item xs={4}>
                            <Typography variant="h6">{elcorte.ubicacion.nombre}</Typography>
                        </Grid>
                        <Grid item xs={4}>         
                            <Typography variant="h6" align="center">               
                                    <TextField 
                                        id="date"
                                        label="Fecha de Corte"
                                        type="date"
                                        value={fecha}
                                        onChange={(e)=>onChangeFecha(e.target.value)}
                                    />
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="right">Total: ${formatNumber(elcorte.total,2)}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {elcorte.ventas === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="right">VENTAS</Typography>
                                
                                <Divider />
                                {elcorte.ventas.map((venta, i) => (
                                        <VentaBasic venta={venta} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tventas,2)}</Typography>
                            </Grid>
                        }

                        {elcorte.ingresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Ingresos:</Typography>
                                {elcorte.ingresos.map((ingreso, i) => (
                                        <IngresoBasic ingreso={ingreso} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tingresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.egresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Egresos:</Typography>
                                {elcorte.egresos.map((egreso, i) => (
                                        <EgresoBasic egreso={egreso} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tegresos,2)}</Typography>
                            </Grid>
                        }
                        {elcorte.creditos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Créditos:</Typography>
                                {elcorte.creditos.map((credito, i) => (
                                        <CxcBasic cxc={credito} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(elcorte.tcreditos,2)}</Typography>
                            </Grid>
                        }
                    </Grid>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </React.Fragment>
            }
        </Dialog>
    )
}