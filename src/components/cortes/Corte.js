import React, { useEffect, useState, useRef } from 'react'
import { Tabs, Tab, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button, IconButton, Switch, CircularProgress, Backdrop } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import PrintIcon from '@material-ui/icons/Print';
import VentaBasic from '../ventas/VentaBasic'
import ListaVentas from '../ventas/ListaVentas';
import ConfirmDialog from './ConfirmDialog'
import EgresoBasic from '../egresos/EgresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'
import moment from 'moment'
import VentaItem from '../ventas/VentaItem'
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { useSnackbar } from 'notistack';
import IngresosList from '../ingresos/IngresosList';
import { useAuth } from '../auth/use_auth'
import useCortes from './useCortes';
import VentaItemPrecios from '../ventas/VentaItemPrecios';
import { agruparPorObjeto, agrupaVentas } from '../Tools';
export default function Corte({ open, close, fecha, guardar, reabrir, ubicacion }) {
  const auth = useAuth()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const componentRef = useRef();
  const { getCorte } = useCortes()

  const [elcorte, setElcorte] = useState(null)
  const [lafecha, setLafecha] = useState(fecha)
  const [mediasCajasCount, setMediasCajasCount] = useState(0)
  const [verFolios, setVerFolios] = useState(false)
  const [verDetalle, setVerDetalle] = useState(true)
  const [confirm, setConfirm] = useState(false)
  const [working, setWorking] = useState(false)

  const [productos, setProductos] = useState([])

  const [tabSelected, setTab] = useState(1)
  const handleChangeTab =(event, value) => {
    setTab(value)
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

  useEffect(() => {
    if (lafecha && ubicacion) {
      setWorking(true)
      getCorte(ubicacion._id, lafecha).then(res => {
        setElcorte(res)
        setWorking(false)
        setProductos( agruparPorObjeto(res.items, "compraItem") )
      })
    }
    return () => setElcorte(null)
  }, [lafecha, ubicacion]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (elcorte !== null) {
      let cuenta = 0
      elcorte.items.map((el) => {
        if (!Number.isInteger(el.empaques)) {
          return cuenta++
        }
        return false
      })
      setMediasCajasCount(cuenta)
    }
    return () => setMediasCajasCount(0)
  }, [elcorte])

  useEffect(() => {
    if (fecha) {
      setLafecha(fecha)
    }
    return () => setLafecha("")
  }, [fecha])

  function handleChange(value) {
    setLafecha(value)
    // onChangeFecha(value)
  }

  function fechaSig() {
    let sig = moment(lafecha)
    sig.add(1, "days")
    handleChange(sig.format("YYYY-MM-DD"))
  }

  function fechaAnt() {
    let ant = moment(lafecha)
    ant.subtract(1, "days")
    handleChange(ant.format("YYYY-MM-DD"))
  }

  function closeConfirm() {
    setConfirm(false)
  }

  function cierraCorte() {
    setWorking(true)
    guardar(elcorte)
      .then(() => {
        setWorking(false)
        close()
      })
  }

  function toggleVerDetalle() {
    setVerDetalle(!verDetalle)
  }
  function toggleVerFolios() {
    setVerFolios(!verFolios)
  }
  const handleReabrir = (id, fecha) => {
    setWorking(true)
    reabrir(id, fecha)
      .then(res => {
        setWorking(false)
        showMessage(res.message, res.status)
        close()
      })
  }
  return !working ?
    <Dialog
      open={open}
      onClose={close}
      maxWidth="lg"
      fullWidth
    >
      {elcorte === null || working === true ? <Typography align="center" >Cargando...</Typography> :
        <React.Fragment>
          <DialogTitle disableTypography>
            <Grid container >
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">{elcorte.ubicacion.nombre}</Typography>
                <Typography className={classes.textoMiniFacheron} color={elcorte.status === "CERRADO" ? "secondary" : "primary"} >
                  {elcorte.status}
                </Typography>
                <Typography className={classes.textoMiniFacheron}>{lafecha}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="center">
                  {auth.user.level > 2 ? null :
                    <IconButton onClick={fechaAnt}>
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
                    <IconButton onClick={fechaSig}>
                      <NavigateNextIcon />
                    </IconButton>
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" align="right">
                  <IconButton onClick={handlePrint}>
                    <PrintIcon />
                  </IconButton>
                  Total: ${formatNumber(elcorte.total, 2)}
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent ref={componentRef}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Tabs
                    value={tabSelected}
                    onChange={handleChangeTab}
                    centered
                >
                    <Tab label="Ventas" value={0}/>
                    <Tab label="Resumen de ventas" value={1}/>
                    <Tab label="Ventas por producto" value={2} />
                </Tabs>
              </Grid>

              <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
              
              {elcorte.resumenVentas.length === 0 ? null :
                <Grid item xs={12} className={classes.paperContorno}>
                  {elcorte.resumenVentas.map((el, i) => (
                    <React.Fragment key={i}>
                      <Grid container >
                        <Grid item xs={2} sm={2}><Typography variant="body2" className={classes.textoMirame} >#{el.compra.folio} | {moment(el._id[0].createdAt).format("DD/MM")}</Typography></Grid>
                        <Grid item xs={10} sm={3}>
                          <Typography variant="body2" >{el.producto.descripcion}</Typography></Grid>
                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.empaques, 2)}</Typography></Grid>
                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.cantidad, 2)}</Typography></Grid>
                        <Grid item xs={3} sm={1}><Typography align="right" variant="body2" >${formatNumber((el.importe / el.cantidad), 2)}</Typography></Grid>
                        <Grid item xs={3} sm={2}><Typography align="right" variant="body2" >${formatNumber(el.importe, 2)}</Typography></Grid>
                      </Grid>
                      <Divider />
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
                        {formatNumber(sumEmpaques(elcorte.resumenVentas), 1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Typography align="right" className={classes.textoMiniFacheron}>
                        Total kilos
                      </Typography>
                      <Typography
                        className={classes.textoMirame}
                        align="right"
                      >
                        {formatNumber(sumCantidad(elcorte.resumenVentas), 2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={1}><Typography> </Typography></Grid>
                    <Grid item xs={3} sm={2}>
                      <Typography align="right" className={classes.textoMiniFacheron}>
                        Total ventas
                      </Typography>
                      <Typography
                        className={classes.textoMirame}
                        align="right"
                      >
                        ${formatNumber(sumImporte(elcorte.resumenVentas), 2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid item xs={12}>
                    <Typography
                      className={classes.textoMiniFacheron}
                      align="right"
                    >
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
              }
            </Grid>



            <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 0}>
                {elcorte.ventas.length > 0 ?
                  <Grid item xs={12}>
                    <Typography component="div" align="center">
                      Ver ventas
                      <Switch
                        checked={verFolios}
                        onChange={toggleVerFolios}
                      />
                      Ver detalle
                      <Switch
                        checked={verDetalle}
                        onChange={toggleVerDetalle}
                      />
                    </Typography>
                  </Grid>
                  : null
                }

                {verFolios === false ? null :
                  <Grid item xs={12} className={classes.paperContorno}>
                    <Typography variant="h6" align="center">VENTAS</Typography>
                    <Divider />
                    <Grid container spacing={1}>
                      {elcorte.ventas.map((item, i) => (
                        <VentaBasic venta={item} key={i} />
                      ))}
                      <Grid item xs={12}>
                        <Divider />
                        <Typography className={classes.textoMirame} align="right">${formatNumber(elcorte.tventas, 2)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                }

                {verDetalle === false ? null :
                  <Grid item xs={12} className={classes.paperContorno}>
                    <Typography variant="h6" align="center">DETALLE DE VENTAS</Typography>
                    <Divider />
                    <Grid container spacing={1}>
                      {elcorte.items.map((item, i) => (
                        <VentaItem item={item} key={i} />
                      ))}
                      <Grid item xs={3} sm={9}>
                        <Typography align="right">{formatNumber(sumEmpaques(elcorte.items), 1)}</Typography>
                      </Grid>
                      <Grid item xs={3} sm={1}>
                        <Typography align="right">{formatNumber(sumCantidad(elcorte.items), 2)}</Typography>
                      </Grid>
                      <Grid item xs={3} sm={1}>
                        <Typography align="center"> -- </Typography>
                      </Grid>
                      <Grid item xs={3} sm={1}>
                        <Typography align="right">${formatNumber(elcorte.tventas, 2)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                }
            </Grid>

            <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 0}>
              <ListaVentas ventas={elcorte.items} />  
            </Grid>
            <Grid container value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
              { productos.map((producto, index) => (
                <VentaItemPrecios item={producto} 
                  precios={agrupaVentas( elcorte.items.filter(vta => vta.compraItem._id === producto._id ), "precio")} 
                  key={index}
                  basic
                  corte
                />  
              ))}
            </Grid>

              {elcorte.ingresos.length === 0 ? null :
                <IngresosList data={elcorte.ingresos} />
              }

              {elcorte.egresos.length === 0 ? null :
                <Grid item xs={12} className={classes.paperContorno}>
                  <Typography variant="h6" align="center">EGRESOS</Typography>
                  {elcorte.egresos.map((egreso, i) => (
                    <EgresoBasic data={egreso} key={i} />
                  ))}
                  <Divider />
                  <Typography className={classes.textoMirame} color="secondary" align="right">-${formatNumber(elcorte.tegresos, 2)}</Typography>
                </Grid>
              }
              {elcorte.creditos.length === 0 ? null :
                <Grid item xs={12} className={classes.paperContorno}>
                  <Typography variant="h6" align="center">CRÉDITOS</Typography>
                  {elcorte.creditos.map((credito, i) => (
                    <CxcBasic cxc={credito} key={i} />
                  ))}
                  <Divider />
                  <Typography
                    className={classes.textoMirame}
                    align="right" color="secondary">- ${formatNumber(elcorte.tcreditos, 2)}
                  </Typography>
                  <Typography
                    className={classes.textoMirame}
                    align="right" color="primary">+ ${formatNumber(elcorte.tacuenta, 2)}
                  </Typography>
                </Grid>
              }

              <Grid item xs={12} >
                <Divider />
                <Typography className={classes.textoMiniFacheron} align="right">Total Corte:</Typography>
                <Typography variant="h6" align="right">${formatNumber(elcorte.total, 2)}</Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={close}>salir</Button>
            {
              elcorte.status === "ABIERTO" ?
                <Button
                  className={classes.botonMagico}
                  onClick={() => setConfirm(true)}
                >Cerrar
                </Button>
                :
                auth.user.level > 2 ? null :
                  <Button
                    className={classes.botonCosmico}
                    onClick={() => handleReabrir(elcorte.ubicacion._id, lafecha)}
                  >
                    Reabrir
                  </Button>
            }
            <ConfirmDialog
              id="confirma cierre de corte"
              keepMounted
              open={confirm}
              close={closeConfirm}
              corte={elcorte}
              cierraCorte={cierraCorte}
            />
          </DialogActions>

        </React.Fragment>
      }
    </Dialog>
    : <Backdrop open={true} className={classes.backdrop}>
      <Typography>Cargando..</Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
}