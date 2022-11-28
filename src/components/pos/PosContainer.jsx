import React, { useState, useContext, useEffect } from 'react'
import { Dialog, DialogContent, Grid, Typography, Button, Container, Collapse } from '@material-ui/core'
import Reloj from '../herramientas/reloj'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
import IngresoCreate from '../ingresos/IngresoCreate'
import CobroDialog from './CobroDialog'
import PagarDialog from './PagarDialog'
import EgresoDialog from './EgresoDialog'
import Corte from '../cortes/Corte'
import { EgresoContext } from '../egresos/EgresoContext'
import { IngresoContext } from '../ingresos/IngresoContext'
import { InventarioContext } from '../inventario/InventarioContext'
import ClienteSelector from './ClienteSelector'
import InventarioSelector from './InventarioSelector'
import { useAuth } from '../auth/use_auth'

export default function PosContainer({ open, close, ubicacion, fecha }) {
	const {user} = useAuth()
	const { resetEgresos, loadCuentasPorPagar } = useContext(EgresoContext)
	const { resetIngresos, loadCuentasPorCobrarPdv } = useContext(IngresoContext)
	const { ubicacionInventario } = useContext(InventarioContext)
	const classes = useStyles()
	const [configuracion] = useState({ ingreso: false, cobrar: false, pagar: false, gasto: false })
	const [selectClasificacion, openSelectClass] = useState(false)
	const [clasificacionSelected, setClasSel] = useState("")
	const [verCrearIngreso, setVerCrearIngreso] = useState(false)
	const [cxcDialog, setCxcDialog] = useState(false)
	const [pagoDialog, setPagoDialog] = useState(false)
	const [egresoDialog, setEgresoDialog] = useState(false)
	const [corteDialog, setCorteDialog] = useState(false)

	const [inventarioClasificacion, setInventarioc] = useState([])

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
	return (
		<Dialog
			open={open}
			onClose={() => { close() }}
			fullScreen
		>
			<DialogContent>
				{/* CABECERA */}
				<Grid container>
					<Grid item xs={12} container justifyContent="center">
						<Grid item xs={6} sm={4}>
							<Typography variant="h6" align="center">{ubicacion ? ubicacion.nombre : "ups!"}</Typography>
						</Grid>
						<Grid item xs={6} sm={4}>
							<Typography variant="h6" align="center">{moment(fecha).format("dddd MMMM D, YYYY")}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}><Reloj /></Grid>
					</Grid>
				</Grid>
				{/* TERMINA CABECERA */}

				<Grid container spacing={2}>
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
						{!configuracion.ingreso ? null :
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

						{!configuracion.cobrar ? null :
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
									ubicacion={ubicacion}
									close={toggleCxcDialog}
								/>
							</Grid>
						}

						{!configuracion.pagar ? null :
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
									close={() => setPagoDialog(false)}
								/>
							</Grid>
						}

						{!configuracion.gasto ? null :
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
									close={() => setCorteDialog(false)}
									ubicacion={ubicacion}
									fecha={fecha}
									pov={true}
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

					<Grid item xs={9} container spacing={2}>
						
							<ClienteSelector ubicacion={ubicacion} />
						

						
							<InventarioSelector inventario={inventarioClasificacion} />
						
					</Grid>
				</Grid>

			</DialogContent>
		</Dialog>
	)
}