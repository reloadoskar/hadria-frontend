import React, { useEffect, useRef, useState, useContext } from "react"
import { Tabs, Tab, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Button, IconButton, CircularProgress, Backdrop, Box } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import PrintIcon from '@material-ui/icons/Print';
import GraficaHorasDeVenta from "./GraficaHorasDeVenta";
import ConfirmDialog from './ConfirmDialog'
import EgresoBasic from '../egresos/EgresoBasic'
import CxcBasic from '../cxc/CxcBasic'
import { formatNumber } from '../Tools'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { useSnackbar } from 'notistack';
import IngresosList from '../ingresos/IngresosList';
import { useAuth } from '../auth/use_auth'
import {useCortes} from './useCortes';
import CorteResumenVentas from "./CorteResumenVentas";
import CorteDetalleVentas from "./CorteDetalleVentas";
import { InventarioContext } from "../inventario/InventarioContext";
import InventarioCorteUbicacion from "../inventario/inventarioCorteUbicacion";

export default function Corte({ open, close, fecha, ubicacion}) {
	const {user} = useAuth()
	const { corte, getCorte, guardarCorte, reOpen, mediasCajasCount } = useCortes()
	const {selectInventarioUbicacion} = useContext(InventarioContext)
	const auth = useAuth()
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const [lafecha, setLafecha] = useState(fecha)
	const componentRef = useRef();
	const [confirm, setConfirm] = useState(false)
	const [working, setWorking] = useState(false)
	const [tabSelected, setTab] = useState(1)
	const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

	useEffect(() => {
		if (ubicacion && lafecha) {
			getCorte(user, ubicacion._id, lafecha).then(res => {
				selectInventarioUbicacion(ubicacion._id)
				return res
				
			}).catch(err=>{
				showMessage(err.message, 'error')
			})
		}
	}, [ubicacion, lafecha]) // eslint-disable-line react-hooks/exhaustive-deps

	function handleChange(value) {
		setLafecha(value)
	}
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	const handleChangeTab = (event, value) => {
		setTab(value)
	}

	const handleReabrir = (id, fecha) => {
		setWorking(true)
		reOpen(user, id, fecha)
			.then(res => {
				setWorking(false)
				showMessage(res.message, res.status)
				close()
			})
			.catch(err => {
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
		guardarCorte(user, mcorte)
		.then(res => {
			showMessage(res.message, res.status)
			setWorking(false)
			close()
		})
		.catch(err => {
			showMessage("No se pudo cerrar. 🕷️" + err, "error")
			setWorking(false)
		})
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
							Total: ${formatNumber(
								corte.ventaItems.reduce((acc,itm)=>acc+=itm.importe,0) +
								corte.ingresos.reduce((acc,itm)=>acc+=itm.importe,0) -
								corte.creditos.reduce((acc,itm)=>acc+=itm.importe,0) +
								corte.creditos.reduce((acc,itm)=>acc+=itm.acuenta,0) -
								corte.egresos.reduce((acc,itm)=>acc+=itm.importe,0) , 2
								)}
						</Typography>
					</Grid>
				</Grid>
			</DialogTitle>
			{working ? <Typography align="center" >Cargando...</Typography> :
				<DialogContent ref={componentRef}>
					<Box displayPrint="none" display="block">
						<Grid item xs={12}>
							<Tabs
								value={tabSelected}
								onChange={handleChangeTab}
								centered
							>
								<Tab label="Ventas" value={1} />
								<Tab label="Inventario" value={2} />
								<Tab label="Info" value={3} />
							</Tabs>
						</Grid>
					</Box>

					<Grid container value={tabSelected} role="tabpanel" hidden={tabSelected !== 1}>

						{!corte.ventaPorCompraItem ? null : corte.ventaPorCompraItem.length === 0 ? null :
							<React.Fragment>
								<CorteResumenVentas corte={corte} mediasCajasCount={mediasCajasCount} />
								<CorteDetalleVentas corte={corte} />
							</React.Fragment>
						}

						{corte.ingresos.length === 0 ? null :
							<IngresosList data={corte.ingresos} className={classes.paperPaginaConSalto} />
						}

						{corte.egresos.length === 0 ? null :
							<Grid item xs={12} className={`${classes.paperContorno} ${classes.paperPaginaConSalto}`}>
								<Typography className={classes.textoMirame} align="center">EGRESOS</Typography>
								{corte.egresos.map((egreso, i) => (
									<EgresoBasic data={egreso} key={i} />
								))}
								<Divider />
								<Typography className={classes.textoMirame} color="secondary" align="right">-${formatNumber(
									corte.egresos.reduce((acc,itm)=>acc+=itm.importe,0), 2
								)}</Typography>
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
									align="right" color="secondary">- ${formatNumber(
										corte.creditos.reduce((acc,itm)=>acc+=itm.importe,0), 2
									)}
								</Typography>
								<Typography
									className={classes.textoMirame}
									align="right" color="primary">+ ${formatNumber(
										corte.creditos.reduce((acc,itm)=>acc+=itm.acuenta,0), 2
									)}
								</Typography>
							</Grid>
						}

						<Grid item xs={12} >
							<Divider />
							<Typography className={classes.textoMiniFacheron} align="right">Total Corte:</Typography>
							<Typography className={classes.textoMirame} variant="h6" align="right">$
								{formatNumber(
									corte.ventaItems.reduce((acc,itm)=>acc+=itm.importe,0) +
									corte.ingresos.reduce((acc,itm)=>acc+=itm.importe,0) -
									corte.creditos.reduce((acc,itm)=>acc+=itm.importe,0) +
									corte.creditos.reduce((acc,itm)=>acc+=itm.acuenta,0) -
									corte.egresos.reduce((acc,itm)=>acc+=itm.importe,0) , 2
								)}							
							</Typography>
						</Grid>

					</Grid>
						{auth.user.level>2?null:
							<Grid container value={tabSelected} role="tabpanel" hidden={tabSelected !== 2} className={classes.paperPaginaConSalto}>
								<InventarioCorteUbicacion />
							</Grid>
						}

					<Grid container value={tabSelected} role="tabpanel" hidden={tabSelected !== 3} className={classes.paperPaginaConSalto}>
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