import React from 'react';
import { useSnackbar } from 'notistack';
import Card from '@material-ui/core/Paper';
import { IconButton, Typography, CardContent, Grid, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {sumImporte, formatNumber } from '../Tools'
import {ticketVentasCorte} from "../api"
import PrintIcon from '@material-ui/icons/Print';


export default function TablaVentas({ data }) {
	
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
								</TableRow>
							))}
							<TableRow>
								<TableCell align="right" colSpan={4} >TOTAL</TableCell>
								<TableCell align="right" >$ {formatNumber(sumImporte(data))}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>

			</Card>
	);
}
