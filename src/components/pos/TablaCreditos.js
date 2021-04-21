import React from 'react';
import { 
	Card, 
	Typography, 
	CardContent, 
	Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {sumImporte, formatNumber } from '../Tools'
export default function TablaCreditos({ data }) {
	
	return (
		<Card >				
			<CardContent>				
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
