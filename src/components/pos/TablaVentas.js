import React, {useState} from 'react';
import { useSnackbar } from 'notistack';
import Card from '@material-ui/core/Paper';
import { IconButton, Typography, CardContent, Grid, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import {sumImporte, formatNumber } from '../Tools'
import {ticketVentasCorte, ticketVenta } from "../api"
import PrintIcon from '@material-ui/icons/Print'
import ReceiptIcon from '@material-ui/icons/Receipt';
import CancelIcon from '@material-ui/icons/Cancel'
import useStyles from '../hooks/useStyles';
import useUser from '../hooks/useUser'
export default function TablaVentas(props){
	const classes = useStyles()
	const {user} = useUser()
	const {data, cancelar} = props
	const [confirm, setConfirm] = useState(false)
	const [venta, setVenta] = useState('')
	const { enqueueSnackbar } = useSnackbar()
	const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
	const handleClick = (data) => {
		ticketVentasCorte(data).then(res =>{
            if(res.status === 'error'){
                showMessage(res.message, res.status)
            }
            else{
                showMessage("Se imprimieron las ventas", "success")
            }
        })
	}
	const confirmDialog = (venta) => {
		setConfirm(true)
		setVenta(venta)
	}

	const cancelVenta = () => {
		cancelar(venta._id).then(res=>{
			console.log(res)
			setConfirm(false)
			setVenta('')
		})
	}

	function printTicket(venta){
		ticketVenta(venta).then(res=>{
			if(res.status === 'warning'){
                showMessage(res.message, res.status)
            }
            else{
                showMessage("Se imprimió la venta.", "success")
            }
		})
	}
	return (

			<Card >
				
				<CardContent>
					<Grid container direction="row-reverse">
						<Grid item >
						<IconButton onClick={() => handleClick(data)}>
							<PrintIcon />
						</IconButton>
						</Grid>
					</Grid>

					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Folio</TableCell>
								<TableCell>Tipo</TableCell>
								<TableCell>Cliente</TableCell>
								<TableCell>Detalle</TableCell>
								<TableCell align="right">Importe</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>							
							{data.map((row, index) => (
								<TableRow key={index}>
									<TableCell>
										<Typography variant="body2">
											#{row.folio}
										</Typography>
									</TableCell>
								
									<TableCell>
										<Typography variant="body2">
											{row.tipoPago}
										</Typography>
									</TableCell>
								
									<TableCell>
										<Typography variant="body2">
											{row.cliente.nombre}
										</Typography>
									</TableCell>
									<TableCell>
										<Table size="small">
											<TableBody>
											{ !row.items ? '' :
												row.items.map((item, i) => (
													<TableRow key={i}>
														<TableCell>{item.compra.folio+":"+item.compra.clave}</TableCell>
														<TableCell>{item.producto.descripcion}</TableCell>
														<TableCell>{item.empaques}/{item.cantidad} x {item.precio}</TableCell>
														<TableCell>$ {formatNumber(item.importe)}</TableCell>
													</TableRow>
												))
											}
											</TableBody>
										</Table>
									</TableCell>
									<TableCell>
										<Typography align="right" variant="body2" children={"$"+formatNumber(row.importe)} />
									</TableCell>
										{row.tipoPago === 'CANCELADO' ? null :
										<TableCell align="right" >
											{user.level>1 ? null :
												<IconButton onClick={() => confirmDialog(row)}>
													<CancelIcon />
												</IconButton>
											}
											<IconButton onClick={() => printTicket(row)}>
												<ReceiptIcon />
											</IconButton>
										</TableCell>
										}
								</TableRow>
							))}
							<TableRow>
								<TableCell align="right" colSpan={4} >TOTAL</TableCell>
								<TableCell align="right" >$ {formatNumber(sumImporte(data))}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>

				<Dialog
					classes={{paper: classes.suspended}}   
					open={confirm} onClose={()=>setConfirm(false)}>
					<DialogContent>
						¿De verdad deseas cancelar la venta?
					</DialogContent>
					<DialogActions>
						<Button color="inherit" onClick={() => setConfirm(false)}>no</Button>
						<Button color="inherit" onClick={()=> cancelVenta(venta)}>si</Button>
					</DialogActions>
				</Dialog>

			</Card>
	);
}
