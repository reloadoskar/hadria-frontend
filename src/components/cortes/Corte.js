import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import VentaBasic from '../ventas/VentaBasic'
import EgresoBasic from '../egresos/EgresoBasic'
import IngresoBasic from '../ingresos/IngresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber } from '../Tools'

export default function Corte(props){
    
    const {open, close, corte, prevCorte, nextCorte} = props
    return(
        <Dialog
            open={open}
            onClose={close}
            maxWidth="lg"
            fullWidth
        >
            {corte === null ? null :
            <React.Fragment>
                <DialogTitle disableTypography>
                    <Grid container >
                        <Grid item xs={4}>
                            <Typography variant="h6">{corte.ubicacion.nombre}</Typography>
                        </Grid>
                        <Grid item xs={4}>         
                            <Typography variant="h6" align="center">
                                <IconButton 
                                onClick={() => prevCorte(corte.ubicacion)}
                                >
                                    <NavigateBeforeIcon />
                                </IconButton>                   
                                {corte.fecha}
                                <IconButton 
                                onClick={() => nextCorte(corte.ubicacion)}
                                >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="right">Total: ${formatNumber(corte.total,2)}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {corte.ventas === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="right">VENTAS</Typography>
                                
                                <Divider />
                                {corte.ventas.map((venta, i) => (
                                        <VentaBasic venta={venta} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(corte.tventas,2)}</Typography>
                            </Grid>
                        }

                        {corte.ingresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Ingresos:</Typography>
                                {corte.ingresos.map((ingreso, i) => (
                                        <IngresoBasic ingreso={ingreso} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(corte.tingresos,2)}</Typography>
                            </Grid>
                        }
                        {corte.egresos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Egresos:</Typography>
                                {corte.egresos.map((egreso, i) => (
                                        <EgresoBasic egreso={egreso} key={i}/>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(corte.tegresos,2)}</Typography>
                            </Grid>
                        }
                        {corte.creditos === [] ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6">Créditos:</Typography>
                                {corte.creditos.map((credito, i) => (
                                        <CxcBasic cxc={credito} key={i} />
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(corte.tcreditos,2)}</Typography>
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