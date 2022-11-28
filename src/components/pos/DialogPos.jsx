import React, { useState, useContext, useEffect } from 'react'
import { Container, Grid, Button, Dialog, Typography, DialogContent, Collapse } from '@material-ui/core'
import CrearVenta from '../ventas/CrearVenta'
import Reloj from '../herramientas/reloj'
import Corte from '../cortes/Corte'
import useStyles from '../hooks/useStyles'
import CobroDialog from './CobroDialog'
import EgresoDialog from './EgresoDialog'
import PagarDialog from './PagarDialog'
import IngresoCreate from '../ingresos/IngresoCreate'
import { EgresoContext } from '../egresos/EgresoContext'
import { IngresoContext } from '../ingresos/IngresoContext'
import { InventarioContext } from '../inventario/InventarioContext'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
export default function DialogPos({ open, close, ubicacion, fecha, showMessage, cxcPdv, addPagoCxc }) {
	const {user} = useAuth()
	const [ configuracion ] = useState({ ingreso: false, cobrar: false, pagar: false, gasto: false })
	const { resetEgresos, loadCuentasPorPagar } = useContext(EgresoContext)
	const { resetIngresos, loadCuentasPorCobrarPdv } = useContext(IngresoContext)
	const { ubicacionInventario } = useContext(InventarioContext)
	const classes = useStyles()
	const [corteDialog, setCorteDialog] = useState(false)
	const [cxcDialog, setCxcDialog] = useState(false)
	const [egresoDialog, setEgresoDialog] = useState(false)
	const [pagoDialog, setPagoDialog] = useState(false)
	const [selectClasificacion, openSelectClass] = useState(false)

	const [verCrearIngreso, setVerCrearIngreso] = useState(false)
	const [clasificacionSelected, setClasSel] = useState("")
	const [inventarioCLasificacion, setInventarioc] = useState([])

	useEffect(() => {
		if (ubicacionInventario) {
			try {
				setInventarioc(ubicacionInventario.filter(itm => itm.clasificacion === clasificacionSelected))
			} catch (error) {
				console.log(error)
			}
		}
	}, [clasificacionSelected, ubicacionInventario])

	useEffect(() => {
		const loadAll = async () => {
			const res = await Promise.all([
				resetEgresos(),
				resetIngresos(),
				loadCuentasPorPagar(user),
				loadCuentasPorCobrarPdv(user)
			])
			return res
		}
		loadAll().then(() => {

		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const toggleCxcDialog = () => {
		setCxcDialog(!cxcDialog)
	}
	const togglePagoDialog = () => {
		setPagoDialog(!cxcDialog)
	}
	const toggleEgesoDialog = () => {
		setEgresoDialog(!egresoDialog)
	}

	const showCorte = () => setCorteDialog(true)
	const closeDialogCorte = () => setCorteDialog(false)
	const closeDialogPago = () => setPagoDialog(false)
	return (
		<Dialog
			open={open}
			onClose={() => { close() }}
			fullScreen
		>
			<DialogContent>
				<Grid container spacing={2} alignItems="flex-start">

					{/* CABECERA */}
					<Grid item xs={12} container justifyContent="center">
						<Grid item xs={6} sm={4}>
							<Typography variant="h6" align="center">{ubicacion ? ubicacion.nombre : "ups!"}</Typography>
						</Grid>
						<Grid item xs={6} sm={4}>
							<Typography variant="h6" align="center">{moment(fecha).format("dddd MMMM D, YYYY")}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}><Reloj /></Grid>
					</Grid>
					{/* TERMINA CABECERA */}

					{/* BOTONES MENU */}
					<Grid item xs={3} container spacing={1} >
						<Grid item xs={12}>
							<Button
								fullWidth
								onClick={() => openSelectClass(!selectClasificacion)}
								className={classes.botonGenerico}
							>
								Nueva venta +
							</Button>
							<Container>
								<Collapse in={selectClasificacion}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Button
												fullWidth
												className={classes.botonAzuloso}
												onClick={() => setClasSel('S/C')}>
												S/C
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Button
												fullWidth
												className={classes.botonAzuloso}
												onClick={() => setClasSel('LINEA')}>
												LINEA
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Button fullWidth
												className={classes.botonCosmico}
												onClick={() => setClasSel('MAYOREO')}>
												MAYOREO
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Button
												fullWidth
												className={classes.botonMagico}
												onClick={() => setClasSel('MENUDEO')}>
												MENUDEO
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Button
												fullWidth
												className={classes.botonNegroso}
												onClick={() => setClasSel('CASCADO')}>
												CASCADO
											</Button>
										</Grid>
									</Grid>
								</Collapse>
							</Container>

						</Grid>
						{!configuracion.ingreso? null :
							<Grid item xs={12}>
								<Button
									fullWidth
									onClick={() => setVerCrearIngreso(true)}
									className={classes.botonGenerico}
								>
									Nuevo ingreso +
								</Button>
								<IngresoCreate
									open={verCrearIngreso}
									close={() => setVerCrearIngreso(false)}
									ubicacion={ubicacion}
									fecha={fecha}
								/>
							</Grid>
						}

						{!configuracion.cobrar? null :
							<Grid item xs={12}>
								<Button
									fullWidth
									onClick={() => toggleCxcDialog()}
									className={classes.botonGenerico}
								>
									Cobrar +
								</Button>
								<CobroDialog
									open={cxcDialog}
									fecha={fecha}
									cuentas={cxcPdv}
									cobrar={addPagoCxc}
									ubicacion={ubicacion}
									close={toggleCxcDialog}
									showMessage={showMessage}
								/>
							</Grid>
						}

						{!configuracion.pagar? null :
							<Grid item xs={12}>
								<Button
									fullWidth
									onClick={() => togglePagoDialog()}
									className={classes.botonGenerico}
								>
									Pagar -
								</Button>
								<PagarDialog
									fecha={fecha}
									ubicacion={ubicacion}
									open={pagoDialog}
									close={closeDialogPago}
								/>
							</Grid>
						}

						{!configuracion.gasto? null :
							<Grid item xs={12}>
								<Button
									fullWidth
									onClick={() => toggleEgesoDialog()}
									className={classes.botonGenerico}
								>
									Nuevo gasto -
								</Button>
								<EgresoDialog
									fecha={fecha}
									ubicacion={ubicacion}
									open={egresoDialog}
									close={toggleEgesoDialog}
									showMessage={showMessage}
								/>
							</Grid>
						}
						<Grid item xs={12}>
							<Button
								fullWidth
								onClick={() => showCorte()}
								className={classes.botonCosmico}
							>
								Revisar Corte
							</Button>
							{corteDialog ?
								<Corte
									open={corteDialog}
									close={closeDialogCorte}
									ubicacion={ubicacion}
									fecha={fecha}
									pov= {true}
								/>
								: null
							}
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								onClick={() => close()}
								className={classes.botonSimplon}
							>
								Salir
							</Button>
						</Grid>
					</Grid>
					{/* TERMINAN BOTONES */}

					<Grid item xs={9} container>
						<CrearVenta
							laubicacion={ubicacion}
							lafecha={fecha}
							inventario={inventarioCLasificacion}
						/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	)
}