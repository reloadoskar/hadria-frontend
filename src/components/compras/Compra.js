import React, { useEffect, useState, useContext } from 'react'
import {
  Dialog, DialogContent, Divider, Grid, IconButton, Slide,
  Typography, Tooltip, Tabs, Tab, Container
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import CachedIcon from '@material-ui/icons/Cached';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from '../hooks/useStyles'
import ResumenVentas from '../ventas/ResumenVentas'
import EgresoBasic from '../egresos/EgresoBasic'
import { sumImporte, formatNumber } from '../Tools'
import ListaVentas from '../ventas/ListaVentas';
import Liquidacion from '../liquidacion/Liquidacion';

import { useSnackbar } from 'notistack'
import { ComprasContext } from './CompraContext'
import VentasReportes from '../ventas/VentasReportes'
// import InventarioPorUbicacion from '../inventario/InventarioPorUbicacion';
import useCompras from './useCompras';
import { useAuth } from '../auth/use_auth';
import moment from 'moment'
import LiquidacionContextProvider from '../liquidacion/LiquidacionContext';
import CompraInventario from './CompraInventario';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function Compra({ open, close, compra }) {
  const auth = useAuth()
  const [laCompra, setLaCompra] = useState(null)
  const { cerrarCompra } = useContext(ComprasContext)
  const classes = useStyles()
  const { recuperarVentas, recuperarGastos } = useCompras()
  // const [liquidacionDialog, setLiquidacionDialog] = useState(false)
  const [costoFinal, setCostoFinal] = useState(0)
  const [totalVenta, setTotalVenta] = useState(0)
  // const [totalGastos, setTotalGastos] = useState(0)
  // const [totalPagos, setTotalPagos] = useState(0)
  const [resultado, setResultado] = useState(0)

  const [tabSelected, setTab] = useState(2)
  const selectTab = (event, selected) => {
    setTab(selected)
  }

  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

  useEffect(() => {
    if (compra) {
      setLaCompra(compra)
    }
    return () => setLaCompra(null)
  }, [compra])

  useEffect(() => {
    if (laCompra) {
      let tv = sumImporte(laCompra.ventaItems)
      // let tg = sumImporte(laCompra.gastos)
      // let tp = sumImporte(laCompra.pagos)
      let cf = laCompra.totalGastos + laCompra.totalPagos
      setCostoFinal(cf)
      setTotalVenta(tv)
      // setTotalGastos(tg)
      // setTotalPagos(tp)           
      setResultado(tv - cf)
    }
    return () => resetValues()
  }, [laCompra])

  const resetValues = () => {
    setTotalVenta(0)
    // setTotalPagos(0)
    // setTotalGastos(0)
    setResultado(0)
  }

  const cerrarComp = (id) => {
    showMessage("Cerrando...", "info")
    cerrarCompra(id)
      .then(res => {
        close()
        setLaCompra({ ...laCompra, status: 'CERRADO' })
        showMessage(res.message, res.status)
      })
      .catch(err => {
        showMessage("No se pudo cerrar la compra \n" + err, "error")
      })
  }

  const handleClose = () => {
    setLaCompra(null)
    setTab(2)
    close()
  }

  const handleSpecial = () => {
    recuperarVentas(laCompra._id).then(res => {
      console.log(res)
    })

    recuperarGastos(laCompra._id).then(res => {
      console.log(res)
    })
  }
  return laCompra === null ? null :
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid container spacing={2} className={classes.paperContorno} >
            <Grid item container xs={12} className={laCompra.status === "ACTIVO" ? classes.paperVerde : classes.paperGris} alignItems="center">
              <Grid item xs={12} sm={9}>
                <Typography variant='h6' align="center">{laCompra.status}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography component="div" align="center">
                  {auth.user.level === 0 ?
                    <IconButton
                      aria-label="close"
                      onClick={handleSpecial}
                    >
                      <CachedIcon />
                    </IconButton>
                    : null
                  }

                  <Tooltip title="Cerrar" arrow>
                    <IconButton
                      aria-label="Cerrar"
                      onClick={() => cerrarComp(laCompra._id)}
                    >
                      {laCompra.status === "ACTIVO" ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                  </Tooltip>

                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Typography>

              </Grid>

            </Grid>
            <Grid item container xs={12} >
              <Grid item xs={12} sm>
                <Typography variant="h6">#{laCompra.folio} - {laCompra.clave}</Typography>
                <Typography className={classes.textoMiniFacheron}>{moment(laCompra.fecha).format("dddd DD [de] MMMM [del] YYYY")}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography align="center" variant="h6">{laCompra.provedor.nombre} | {laCompra.tipoCompra.tipo}</Typography>
              </Grid>
              <Grid item xs={12} sm>
                <Typography align="right" variant="h6"  >Remisi&oacute;n: {laCompra.remision}</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={3}>
                <Typography align="center" className={classes.textoMiniFacheron}>TOTAL VENTAS:</Typography>
                <Typography className={classes.textoMirame} variant="h5" align="center" >
                  ${formatNumber(totalVenta,2)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="center" className={classes.textoMiniFacheron}>COSTO INICIAL:</Typography>
                <Typography className={classes.textoMirame} variant="h5" align="center" >
                  ${formatNumber(laCompra.importe,2)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="center" className={classes.textoMiniFacheron}>COSTO FINAL:</Typography>
                <Typography className={classes.textoMirameSangron} variant="h5" align="center" >
                  ${formatNumber(costoFinal,2)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="center" className={classes.textoMiniFacheron}>RESULTADO:</Typography>
                <Typography
                  className={resultado > 0 ? classes.textoMirameExito : classes.textoMirameSangron}
                  variant="h5"
                  align="center"
                >
                  ${formatNumber(resultado,2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>

            <Grid item xs={12} className={classes.paperContorno}>
              <Tabs
                value={tabSelected}
                onChange={selectTab}
                indicatorColor="primary"
                textColor="primary"
                centered>
                <Tab label="Resumen" value={2} />
                <Tab label="Ventas" value={4} />
                <Tab label="Inventario" value={1} />
                <Tab label="Gastos y Pagos" value={3} />
                <Tab label="Reportes" value={5} />
                <Tab label="Liquidación" value={6} />
              </Tabs>
              <Container>
                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 1}>
                  <CompraInventario items={laCompra.items} />
                </div>
                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 2}>
                  <ResumenVentas compra={laCompra} items={laCompra.items} ventas={laCompra.ventaItems} />
                </div>
                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 3}>
                  {laCompra.gastos.length > 0 ?
                    <Grid item xs={12} container>
                      <Grid item xs={12}>
                        <Typography align="center" className={classes.textoMirame} >Gastos</Typography>
                        <Divider />
                        {laCompra.gastos.filter(gasto => gasto.importe > 0).map((gasto, i) => (
                          <EgresoBasic data={gasto} key={i} />
                        ))}
                        <Divider />
                      </Grid>
                      <Grid item xs={12} >
                        <Typography align="right" className={classes.textoMiniFacheron} >
                          TOTAL GASTOS:
                        </Typography>
                        <Typography align="right" className={classes.textoSangron} >
                          ${formatNumber(sumImporte(laCompra.gastos), 2)}
                        </Typography>
                      </Grid>
                    </Grid>
                    : null
                  }

                  {laCompra.pagos.length > 0 ?
                    <Grid item xs={12} container>
                      <Grid item xs={12}>
                        <Typography align="center" className={classes.textoMirame} >Pagos</Typography>
                        <Divider />
                        {laCompra.pagos.filter(gasto => gasto.importe > 0).map((gasto, i) => (
                          <EgresoBasic data={gasto} key={i} />
                        ))}
                        <Divider />
                      </Grid>
                      <Grid item xs={12} >
                        <Typography align="right" className={classes.textoMiniFacheron} >
                          TOTAL PAGOS:
                        </Typography>
                        <Typography align="right" className={classes.textoSangron} >
                          ${formatNumber(sumImporte(laCompra.pagos, 2))}
                        </Typography>
                      </Grid>
                    </Grid>
                    : null
                  }
                </div>

                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 4}>
                  <ListaVentas ventas={laCompra.ventaItems} />
                </div>

                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 5}>
                  <VentasReportes items={laCompra.items} ventas={laCompra.ventaItems} />
                </div>
                <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 6}>
                  <LiquidacionContextProvider>
                    <Liquidacion compra={laCompra} />
                  </LiquidacionContextProvider>
                </div>
              </Container>
            </Grid>


          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
}