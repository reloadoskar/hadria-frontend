import React, { useEffect, useState, useContext } from 'react'
import { Dialog, DialogContent, Grid, Typography, TextField, DialogTitle, Button } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import useStyles from '../hooks/useStyles'
import { PesadasContext } from '../inventario/PesadasContext'
import Pesadas from '../inventario/Pesadas'
import { formatNumber, } from '../Tools'
export default function CrearVentaItem({ open, close, elitem, add }) {
	const { lista, neto, tara, ttara, bruto } = useContext(PesadasContext)
	const classes = useStyles()
	const [item, setItem] = useState(null)
	const [empaques, setEmpaques] = useState('')
	const [cantidad, setCantidad] = useState('')
	const [precio, setPrecio] = useState('')
	const [importe, setImporte] = useState('')
	const [guardando, setGuardando] = useState(false)
	const handleFocus = (event) => event.target.select();

	useEffect(() => {
		if (item) {
			if (item.clasificacion !== "LINEA") {
				console.info("NO ES LINEA")
				setEmpaques(0)
			}
		}
	}, [item])

	useEffect(() => {
		if (lista.length > 0) {
			setCantidad(formatNumber(neto, 2))
			setEmpaques(lista.length)
		} else {
			setCantidad('')
		}
	}, [lista, neto]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (elitem) {
			setItem(elitem)
		}
		return () => setItem(null)
	}, [elitem])

	function handleChange(field, value) {
		switch (field) {
			case 'empaques':
				if (value > item.empaquesStock) {
					setEmpaques('')
				} else {
					setEmpaques(value)
				}
				break;
			case 'cantidad':
				if (value === '') { setCantidad(0) }
				if (value > item.stock) {
					setCantidad(0)
				} else {
					setCantidad(value)
				}
				if (precio !== '') {
					setImporte(value * precio)
				}
				break
			case 'precio':
				setPrecio(value)
				if (cantidad !== '') {
					setImporte(value * cantidad)
				}
				break
			default:
				break;
		}
	}

	function clearFields() {
		setCantidad('')
		setEmpaques('')
		setImporte('')
		setPrecio('')
		setGuardando(false)
		setItem(null)
	}

	function handleSubmit(e) {
		e.preventDefault()
		setGuardando(true)

		let newItem = {
			itemOrigen: item,
			compraItem: item._id,
			compra: item.compra,
			producto: item.producto,
			cantidad: cantidad,
			empaques: empaques,
			precio: precio,
			importe: importe,
			pesadas: lista,
			tara: tara,
			ttara: ttara,
			bruto: bruto,
			neto: neto
		}
		add(newItem)
		return handleClose()
	}

	function handleClose() {
		clearFields()
		close()
	}

	return !item ? null :
		<Dialog
			open={open}
			fullWidth={true}
			maxWidth="sm"
			onClose={() => handleClose()}
		>
			<DialogTitle disableTypography>
				<Grid container >
					<Grid item xs={8}>
						<Typography>
							{item.compra.folio} - {item.producto.descripcion} {item.clasificacion} 
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography align="right">
							{item.empaquesStock}/{formatNumber(item.stock, 2)}
						</Typography>
					</Grid>
				</Grid>
			</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						{guardando === true ?
							<Grid item xs={12}>
								<Zoom in={guardando}>
									<Typography variant="h6" align="center">Agregando al carrito...</Typography>
								</Zoom>
							</Grid>
							:
							<React.Fragment>
								<Grid item xs={12}>
									{item.clasificacion!=="LINEA"?null:
										<Pesadas
											item={elitem}
										/>
									}
								</Grid>

								<Grid item xs={12}>
									<Slide direction="up" in={!guardando}>
										<form onSubmit={handleSubmit}>
											<Grid container spacing={2} alignItems="center">
												<Grid item xs={12} md={3}>
													<TextField
														disabled={elitem.clasificacion === "LINEA" ? false : true}
														id="empaques"
														label="Cajas"
														variant="outlined"
														autoFocus
														onFocus={handleFocus}
														fullWidth
														type="number"
														value={empaques}
														onChange={(e) => handleChange('empaques', e.target.value)}
													/>
												</Grid>
												<Grid item xs={12} md={3}>
													<Grid container alignItems="center" spacing={2}>
														<Grid item xs={12}>
															<TextField
																id="cantidad"
																// type="number"
																label="Kilos"
																variant="outlined"
																required
																fullWidth
																InputProps={{ step: '1' }}
																value={cantidad}
																onChange={(e) => handleChange('cantidad', e.target.value)}
															/>
														</Grid>
													</Grid>
												</Grid>
												<Grid item xs={12} md={3}>
													<TextField
														id="precio"
														label="Precio"
														variant="outlined"
														required
														fullWidth
														type="number"
														value={precio}
														onChange={(e) => handleChange('precio', e.target.value)}
													/>
												</Grid>
												<Grid item xs={12} md={3}>
													<TextField
														id="importe"
														label="Importe"
														variant="outlined"
														required
														fullWidth
														readOnly
														type="number"
														value={importe}
														onChange={(e) => handleChange('importe', e.target.value)}
														InputProps={{
															readOnly: true,
														}}
													/>
												</Grid>
												<Grid item xs={12} container spacing={2} direction="row-reverse">
													<Grid item>
														<Button
															disabled={guardando === true ? true : false}
															type="submit" className={classes.botonGenerico}>
																Agregar
														</Button>							
													</Grid>
													<Grid item>
														<Button onClick={handleClose}>Cancelar</Button>
													</Grid>
												</Grid>
											</Grid>
										</form>
									</Slide>
								</Grid>								
							</React.Fragment>
						}
					</Grid>
			</DialogContent>
		</Dialog>
}