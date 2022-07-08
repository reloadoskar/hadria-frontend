import React, {useEffect, useRef, useState} from "react"
import { Tabs, Tab, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button, IconButton, CircularProgress, Backdrop, Box, Link } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import PrintIcon from '@material-ui/icons/Print';
import GraficaHorasDeVenta from "./GraficaHorasDeVenta";
import ConfirmDialog from './ConfirmDialog'
import EgresoBasic from '../egresos/EgresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import CoolProgressWtLabel from '../tools/CoolProgressWtLabel'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'
import moment from 'moment'
import useStyles, {blue, danger} from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { useSnackbar } from 'notistack';
import IngresosList from '../ingresos/IngresosList';
import { useAuth } from '../auth/use_auth'
import useCortes from './useCortes';
import Venta from "../ventas/Venta";

export default function Corte({ open, close, fecha, guardar, ubicacion }){
    const { getCorte, guardarCorte, reOpen } = useCortes()
    const auth = useAuth()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const [lafecha, setLafecha] = useState(fecha)
    const [mediasCajasCount, setMediasCajasCount] = useState(0)
    const componentRef = useRef();
    const [confirm, setConfirm] = useState(false)
    const [working, setWorking] = useState(false) 
    const [tabSelected, setTab] = useState(1)
    const [ventaSelected, setVentaSel] = useState(null)
    const [verVenta, setVerVenta] = useState(null)
    const [corte, setCorte]=useState(null)
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    useEffect(() => {
        console.log(corte)
        if (corte) {
          let cuenta = 0
          corte.ventaItems.map((el) => {
            if (!Number.isInteger(el.empaques)) {
              return cuenta++
            }
            return false
          })
          setMediasCajasCount(cuenta)
        }else{

            return () => setMediasCajasCount(0)
        }
      }, [corte])

    useEffect(()=>{
        if(ubicacion && lafecha){
            getCorte(ubicacion, lafecha).then(res=>{
                // console.log(res)
                setCorte(res)
            })
        }
    },[ubicacion, lafecha]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleChange(value) {
        setLafecha(value)
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handleChangeTab =(event, value) => {
        setTab(value)
    }

    const handleReabrir = (id, fecha) => {
        setWorking(true)
        reOpen(id, fecha)
            .then(res => {
                setWorking(false)
                showMessage(res.message, res.status)
                close()
            })
            .catch(err=>{
                setWorking(false)
                showMessage("No se pudo reabrir", "error")
            })  
    }

    function closeConfirm() {
        setConfirm(false)
    }

    function cierraCorte() {
        setWorking(true)
        let mcorte = corte
        mcorte.status = "CERRADO"
        guardarCorte(mcorte)
          .then(res => {
            showMessage(res.message, res.status)
            setWorking(false)
            close()
          })
          .catch(err=>{
            showMessage("No se pudo cerrar. 🕷️"+err, "error")
            setWorking(false)
          })
    }

    function fechaSig() {
        setCorte(null)
        let sig = moment(lafecha)
        sig.add(1, "days")
        handleChange(sig.format("YYYY-MM-DD"))
    }
    
    function fechaAnt() {
        setCorte(null)
        let ant = moment(lafecha)
        ant.subtract(1, "days")
        handleChange(ant.format("YYYY-MM-DD"))
    }
    
    const handleVerVenta = (vta) =>{
        setVentaSel(vta[0])
        setVerVenta(true)
    }

    return corte ?
        <Dialog 
            open={open} 
            onClose={close}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle disableTypography>
                <Grid container >
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">{corte.ubicacion.nombre}</Typography>
                        <Typography className={classes.textoMiniFacheron} color={corte.status === "CERRADO" ? "secondary" : "primary"} >
                            {corte.status}
                        </Typography>
                        <Typography className={classes.textoMirame}>{lafecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" align="center">
                            {auth.user.level > 2 ? null :
                                <IconButton 
                                    onClick={fechaAnt}
                                >
                                    <NavigateBeforeIcon />
                                </IconButton>
                            }
                            <TextField
                                id="date"
                                type="date"
                                value={lafecha}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                                {auth.user.level > 2 ? null :
                                    <IconButton 
                                        onClick={fechaSig}
                                    >
                                        <NavigateNextIcon />
                                    </IconButton>
                                }
                        </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="right">
                  <IconButton onClick={handlePrint} >
                    <PrintIcon />
                  </IconButton>
                  Total: ${formatNumber(corte.total,2)}
                </Typography>
              </Grid>
            </Grid>
            </DialogTitle>
            {working?<Typography align="center" >Cargando...</Typography>:
                <DialogContent ref={componentRef}>
                    <Box displayPrint="none" display="block">
                        <Grid item xs={12}>
                            <Tabs
                                value={tabSelected}
                                onChange={handleChangeTab}
                                centered
                            >
                                <Tab label="Ventas" value={1}/>
                                <Tab label="Info" value={2} />
                            </Tabs>
                        </Grid>
                    </Box>

                    <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                
                        {corte.ventaPorCompraItem.length === 0 ? null :
                        <React.Fragment>
                            <Grid item xs={12} className={`${classes.paperContorno} ${classes.paperPaginaConSalto}`}>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoMirame} align="center">RESUMEN</Typography>
                                </Grid>
                                {corte.ventaPorCompraItem.sort((a,b)=>a.compra.folio - b.compra.folio).map((el, i) => (
                                    <React.Fragment key={i}>
                                        <Grid container >
                                            <Grid item xs={2} sm={2}><Typography variant="body2" className={classes.textoMirame} >#{el.compra.folio} | {moment(el.compraItem.createdAt).format("DD/MM HH:mm")}</Typography></Grid>
                                            <Grid item xs={10} sm={3}>
                                                <Typography variant="body2" >{el.compraItem.producto.descripcion} {el.compraItem.clasificacion}</Typography>
                                            </Grid>
                                            <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.empaques, 2)}</Typography></Grid>
                                            <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.cantidad, 2)}</Typography></Grid>
                                            <Grid item xs={3} sm={1}><Typography align="right" variant="body2" >${formatNumber((el.importe / el.cantidad), 2)}</Typography></Grid>
                                            <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >${formatNumber(el.importe, 2)}</Typography></Grid>
                                        </Grid>
                                    </React.Fragment>
                                ))}                            
                                <Divider />
                                <Grid container>
                                    <Grid item xs={3} sm={7}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total cajas
                                        </Typography>
                                        <Typography
                                            className={classes.textoMirame}
                                            align="right"
                                        >
                                            {formatNumber(sumEmpaques(corte.ventaItems), 1)}
                                        </Typography>
                                    </Grid>     
                                    <Grid item xs={3} sm={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total kilos
                                        </Typography>
                                        <Typography
                                            className={classes.textoMirame}
                                            align="right">
                                            {formatNumber(sumCantidad(corte.ventaItems), 2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={1}><Typography> </Typography></Grid>
                                    <Grid item xs={3} sm={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>
                                            Total ventas
                                        </Typography>
                                        <Typography
                                            className={classes.textoMirame}
                                            align="right">
                                            ${formatNumber(sumImporte(corte.ventaItems), 2)}
                                        </Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <Typography
                                            className={classes.textoMiniFacheron}
                                            align="right">
                                            Cajas vacías
                                        </Typography>
                                        <Typography
                                            className={classes.textoMirame}
                                            align="right"
                                            >
                                            {formatNumber((mediasCajasCount / 2), 1)}
                                        </Typography>
                                    </Grid>
                                </Grid> 
                            </Grid> 
                            <Grid item xs={12} className={classes.paperContorno}>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoMirame} align="center">DETALLE</Typography>
                                </Grid>
                                {corte.ventaPorCompraItem.sort((a,b)=>a.compra.folio - b.compra.folio).map((el, i) => (
                                    <Grid container key={i} className={classes.paperSutil}>
                                        <Grid item xs={6}>
                                            <Typography className={classes.textoMirame}>
                                                #{el.compra.folio} | {moment(el.compraItem.createdAt).format("DD/MM")} {el.compraItem.producto.descripcion} {el.compraItem.clasificacion}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography className={classes.textoMirame} align="right">
                                                {formatNumber(el.compraItem.empaquesStock,1)} de {formatNumber(el.compraItem.empaques,1)} / {formatNumber(el.compraItem.stock,2)} de {formatNumber(el.compraItem.cantidad,2)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CoolProgressWtLabel 
                                                variant="determinate" 
                                                style={el.compraItem.stock * 100 / el.compraItem.cantidad < 30 ? danger : blue} 
                                                value={
                                                    ( el.compraItem.stock * 100 / el.compraItem.cantidad)
                                                } 
                                            />
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={2}>
                                                <Typography variant="body2" className={classes.textoMiniFacheron} >folio</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" className={classes.textoMiniFacheron} >cliente</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body2" align="right" className={classes.textoMiniFacheron} >empaques</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body2" align="right" className={classes.textoMiniFacheron} >cantidad</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography variant="body2" align="right" className={classes.textoMiniFacheron} >precio</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body2" align="right" className={classes.textoMiniFacheron} >importe</Typography>
                                            </Grid>
                                            {el.ventas.map((vta,i)=>(
                                                <React.Fragment key={i}>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" display="inline">
                                                        {auth.user.level > 2 ? vta.ventaFolio :
                                                            <Link onClick={()=>handleVerVenta(corte.ventas.filter(v=>v.id===vta.ventaFolio))} > #{vta.ventaFolio} </Link>
                                                        }
                                                        {moment(vta.createdAt).format("HH:mm")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" >{vta.venta.cliente.nombre}</Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Typography variant="body2" align="right">{vta.empaques}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" align="right">{formatNumber(vta.cantidad,2)}</Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Typography variant="body2" align="right">${vta.precio}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" align="right">{formatNumber(vta.importe,2)}</Typography>
                                                </Grid>
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                        <Grid item xs={6}></Grid>
                                        <Grid item xs={1}><Typography align="right" variant="body2" className={classes.textoMirame}>{formatNumber(el.empaques, 2)}</Typography></Grid>
                                        <Grid item xs={2}><Typography align="right" variant="body2" className={classes.textoMirame}>{formatNumber(el.cantidad, 2)}</Typography></Grid>
                                        <Grid item xs={1}><Typography align="right" variant="body2" className={classes.textoMirame}>${formatNumber((el.importe / el.cantidad), 2)}</Typography></Grid>
                                        <Grid item xs={2}><Typography align="right" variant="body2" className={classes.textoMirame}>${formatNumber(el.importe, 2)}</Typography></Grid>
                                    </Grid>
                                ))}
                                <Venta open={verVenta} close={()=>setVerVenta(false)} venta={ventaSelected} />
                            </Grid> 
                        </React.Fragment>                       
                        }

                        {corte.ingresos.length === 0 ? null :
                            <IngresosList data={corte.ingresos} className={classes.paperPaginaConSalto}/>
                        }

                        {corte.egresos.length === 0 ? null :
                            <Grid item xs={12} className={`${classes.paperContorno} ${classes.paperPaginaConSalto}`}>
                                <Typography className={classes.textoMirame} align="center">EGRESOS</Typography>
                                {corte.egresos.map((egreso, i) => (
                                    <EgresoBasic data={egreso} key={i} />
                                ))}
                                <Divider />
                                <Typography className={classes.textoMirame} color="secondary" align="right">-${formatNumber(corte.tegresos, 2)}</Typography>
                            </Grid>
                        }

                        {corte.creditos.length === 0 ? null :
                            <Grid item xs={12} className={classes.paperContorno}>
                                <Typography className={classes.textoMirame} align="center">CRÉDITOS</Typography>
                                {corte.creditos.map((credito, i) => (
                                    <CxcBasic cxc={credito} key={i} />
                                ))}
                                <Divider />
                                <Typography
                                    className={classes.textoMirame}
                                    align="right" color="secondary">- ${formatNumber(corte.tcreditos, 2)}
                                </Typography>
                                <Typography
                                    className={classes.textoMirame}
                                    align="right" color="primary">+ ${formatNumber(corte.tacuenta, 2)}
                                </Typography>
                            </Grid>
                        }

                        <Grid item xs={12} >
                            <Divider />
                            <Typography className={classes.textoMiniFacheron} align="right">Total Corte:</Typography>
                            <Typography className={classes.textoMirame} variant="h6" align="right">${formatNumber(corte.total, 2)}</Typography>
                        </Grid>
                
                    </Grid>

                    <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 2} className={classes.paperPaginaConSalto}>
                        <GraficaHorasDeVenta data={corte.ventaItems} />
                    </Grid>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={close}>salir</Button>
                {corte.status === "ABIERTO" ?
                    <Button
                        className={classes.botonMagico}
                        onClick={() => setConfirm(true)}
                        >Cerrar
                    </Button>
                    :
                    auth.user.level > 2 ? null :
                    <Button
                        className={classes.botonCosmico}
                        onClick={() => handleReabrir(corte.ubicacion._id, fecha)}
                    >
                        Reabrir
                    </Button>
                }
                <ConfirmDialog
                    id="confirma cierre de corte"
                    keepMounted
                    open={confirm}
                    close={closeConfirm}
                    corte={corte}
                    cierraCorte={cierraCorte}
                    />
          </DialogActions>
        </Dialog>
    :
        <Backdrop open={true} className={classes.backdrop}>
            <Typography>Cargando..</Typography>
            <CircularProgress color="inherit" />
        </Backdrop>
}