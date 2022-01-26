import React, { useEffect, useState, useRef } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button, IconButton, Switch } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import PrintIcon from '@material-ui/icons/Print';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import VentaBasic from '../ventas/VentaBasic'
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
export default function Corte(props) {
  const { user, open, close, corte, fecha, onChangeFecha, guardar, reabrir } = props
  const classes = useStyles()
  const componentRef = useRef();
  const { enqueueSnackbar } = useSnackbar()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const [elcorte, setElcorte] = useState(null)
  const [lafecha, setLafecha] = useState("")
  const [mediasCajasCount, setMediasCajasCount] = useState(0)
  const [verFolios, setVerFolios] = useState(false)
  const [verDetalle, setVerDetalle] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [working, setWorking] = useState(false)
  useEffect(() => {
    if (corte) {
      setElcorte(corte)
    }
    return () => setElcorte(null)
  }, [corte])

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
    onChangeFecha(value)
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
      .then(res => {
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
  return (
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
                  {user.level > 2 ? null :
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
                  {user.level > 2 ? null :
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
              {elcorte.resumenVentas.length === 0 ? null :
                <Grid item xs={12} className={classes.paperContorno}>
                  <Typography variant="h6" align="center">RESUMEN VENTAS</Typography>
                  <Divider />
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
                      <VentaItem item={item} key={i}/>
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
                user.level > 2 ? null :
                  <Button
                    className={classes.botonCosmico}
                    onClick={() => handleReabrir(elcorte.ubicacion._id, lafecha)}
                  >
                    Reabrir
                            </Button>
            }
            <ConfirmDialog
              ubicacions={props.ubicacions}
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
  )
}