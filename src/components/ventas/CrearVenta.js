import React, { useEffect, useState, useContext } from 'react'
import { useMediaQuery } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Grid, Typography, Menu, MenuItem, Backdrop } from '@material-ui/core'
import CompraItems from '../compras/CompraItems'
import CrearVentaItem from './CrearVentaItem'
import CobrarDialog from '../pos/CobrarDialog'
import VentaItems from './VentaItems'
import useStyles from '../hooks/useStyles'
import { ticketVenta, ticketSalida } from '../api'
import { formatNumber, sumImporte } from '../Tools'
import Ticket from './Ticket'
import { IngresoContext } from '../ingresos/IngresoContext'
import { PesadasContext } from '../inventario/PesadasContext';
import { ClienteContext } from '../clientes/ClienteContext';
import { useAuth } from '../auth/use_auth';
export default function CrearVenta({ laubicacion, lafecha, inventario }) {
	const {user} = useAuth()
	const { addVenta } = useContext(IngresoContext)
	const { clearLista } = useContext(PesadasContext)
	const { clientes } = useContext(ClienteContext)
	const { enqueueSnackbar } = useSnackbar()
	const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
	const classes = useStyles()
	const isMobile = useMediaQuery('(max-width: 720px)')

	const [ticket, setTicket] = useState(null)
	const [imprimir, setImprimir] = useState(false)

	const [itemSelected, setItemSelected] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const [ventaItemDialog, setVentaItemDialog] = useState(false)
	const [cobrarDialog, setCobrarDialog] = useState(false)
	const [guardando, setGuardando] = useState(false)

	const [ubicacion, setUbicacion] = useState(null)
	const [fecha, setFecha] = useState(null)
	const [cliente, setCliente] = useState('')
	const [items, setItems] = useState([])

	useEffect(() => {
		if (clientes) {
			setCliente(clientes[0])
		}
	}, [clientes])

	useEffect(() => {
		if (laubicacion) {
			setUbicacion(laubicacion)
		}
		return () => setUbicacion(null)
	}, [laubicacion])
	useEffect(() => {
		if (lafecha) {
			setFecha(lafecha)
		}
		return () => setFecha(null)
	}, [lafecha])

	function selectItem(item) {
		setItemSelected(item)
		openVentaItemDialog()
	}

	function openVentaItemDialog() {
		setVentaItemDialog(true)
	}

	function closeVentaItemDialog() {
		setVentaItemDialog(false)
		setItemSelected(null)
	}

	const seleccionaCliente = (cliente) => {
		setCliente(cliente)
	}

	function addItem(item) {
		item.ubicacion = ubicacion
		item.fecha = fecha
		let itms = items
		itms.push(item)
		setItems(itms)
		item.itemOrigen.stock -= item.cantidad
		item.itemOrigen.empaquesStock -= item.empaques
	}
	function delItem(index, item) {
		item.itemOrigen.stock += parseFloat(item.cantidad)
		item.itemOrigen.empaquesStock += parseFloat(item.empaques)
		let itms = items
		itms.splice(index, 1)
		setItems(itms)
	}
	const handleKeyPress = (e) => {
		if (e.key === "x" || e.key === "X") {
			toggleCobrarDialog()
		}
	}

	const closeSelect = () => {
		setAnchorEl(null)
	}

	const toggleCobrarDialog = () => {
		setCobrarDialog(!cobrarDialog)
	}
	const guardarVenta = (venta) => {
		setGuardando(true)
		venta.ubicacion = ubicacion
		venta.fecha = fecha
		venta.items = items
		venta.cliente = cliente
		venta.total = sumImporte(items)
		venta.importe = sumImporte(items)
		try {
			addVenta(user, venta)
			.then(res => {
				setGuardando(false)
				venta.folio = res.venta.folio
				if (isMobile) {
					setTicket(venta)
					setImprimir(true)
				} else {
					ticketVenta(venta).then(resb => {
						if (resb.status === 'warning') {
							showMessage(resb.message, resb.status)
						} else {
							ticketSalida(res.venta)
						}
					})
				}
				showMessage(res.message, res.status)
				toggleCobrarDialog()
				handleClose()
			}).catch(err=>{
					showMessage(err.message, 'error')
					setGuardando(false)
			})
		} catch (err) {
			console.log(err)
			showMessage("Red saturada", "error")
		}
	}

	const handleClose = () => {
		setItemSelected(null)
		setItems([])
		clearLista()
		setCliente(clientes[0])
	}

	const noPrint = () => {
		setImprimir(false)
		setTicket(null)
	}
	return (
		<Grid container spacing ={2} onKeyPress={(e) => handleKeyPress(e)}>
			<Grid item xs={12}>
				
			</Grid>
			<Backdrop className={classes.backdrop} open={imprimir} onClick={noPrint}>
				<Ticket data={ticket} noPrint={noPrint} />
			</Backdrop>

			{inventario === null || fecha === null || ubicacion === null ? null :
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12} sm={4}>
						<Typography align="center" className={classes.textoMiniFacheron}>Cliente</Typography>
						<Button
							onClick={(e) => setAnchorEl(e.currentTarget)}
							fullWidth
						>
							{cliente.nombre ? cliente.nombre : "slecciona un cliente"}
							<ExpandMoreIcon />
						</Button>
						<Menu
							id="seleccionar-cliente"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={closeSelect}
						>
						{clientes.length > 0 ?
							<React.Fragment>
								{clientes.filter(clnt => clnt.ubicacion === "").map(cliente => (
									<MenuItem
										key={cliente._id}
										onClick={() => {
											seleccionaCliente(cliente)
											closeSelect()
										}}
									>
										{cliente.nombre}
									</MenuItem>
								))}
								{clientes.filter(clnt => clnt.ubicacion !== undefined)
									.filter(cl => cl.ubicacion._id === ubicacion._id)
									.map(cliente => (
										<MenuItem
											key={cliente._id}
											onClick={() => {
												seleccionaCliente(cliente)
												closeSelect()
											}}
										>
											{cliente.nombre}
										</MenuItem>
									))}
							</React.Fragment>
							:
							null
						}
						</Menu>
					</Grid>

					<Grid item xs={12}>
						<Typography align="center" className={classes.textoMiniFacheron}>
							Productos disponibles
						</Typography>
						<CompraItems inventario={inventario} selectItem={selectItem} />
						<CrearVentaItem
							open={ventaItemDialog}
							close={closeVentaItemDialog}
							elitem={itemSelected}
							add={addItem}
						/>
					</Grid>

					<Grid item xs={12}>
						<VentaItems items={items} eliminar={delItem} />
					</Grid>

				</Grid>
}		
			<Grid item xs={12}>
				{items.length > 0 ?
					<Button
						size="large"
						fullWidth
						disabled={items.length > 0 ? false : true}
						className={sumImporte(items) === 0 ? classes.botonGenerico : classes.botonCosmico}
						onClick={() => toggleCobrarDialog()}
						variant="contained"
						startIcon={<MonetizationOnIcon />}
					>
						Cobrar ${formatNumber(sumImporte(items))} (x)
					</Button>
					: null
				}
				<CobrarDialog
					open={cobrarDialog}
					close={toggleCobrarDialog}
					cliente={cliente}
					total={sumImporte(items)}
					showMessage={showMessage}
					guardarVenta={guardarVenta}
					guardando={guardando}
				/>
			</Grid>
		</Grid>
	)
}