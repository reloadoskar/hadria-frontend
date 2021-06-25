import React, { useState, useEffect } from 'react'
import { Card, Table, TableHead, TableRow, TableCell, TableBody, CardHeader, CardContent, Typography } from '@material-ui/core';
import { 
    sumCantidad, 
    sumEmpaques, 
    sumImporte,
    formatNumber,
} from '../Tools'
const ResumenVentas = ({data}) => {
	const [total, setTotal] = useState(0)
	const [tempaques, setTempaques] = useState(0)
	const [tcantidad, setTcantidad] = useState(0)
	const [precioProm, setPrecioProm] = useState(0)
    useEffect(() => {
        if(data){
			let ttl= sumImporte(data)
			let temp = sumEmpaques(data)
			let tcant = sumCantidad(data)
			setTotal(formatNumber(ttl))
			setTcantidad(formatNumber(tcant))
			setTempaques(formatNumber(temp))
			let pp = ttl / tcant
			setPrecioProm(formatNumber(pp,2))
        }
    }, [data])
	return(
		<Card>
			<CardHeader title="Resúmen de Ventas"></CardHeader>
			<CardContent>
				{
					data.length === 0 ?
						<Typography variant="h6" children="No se encontraron datos." align="center" />
					:
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Producto</TableCell>
								<TableCell align="right">Precio</TableCell>
								<TableCell align="right">Cantidad</TableCell>
								<TableCell align="right">Empaques</TableCell>
								<TableCell align="right">Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								data.map((el, index) => (
									<TableRow key={index}>
										<TableCell>{el.producto[0].descripcion}</TableCell>
										<TableCell align="right">{el._id.precio}</TableCell>
										<TableCell align="right">{el.cantidad}</TableCell>
										<TableCell align="right">{el.empaques}</TableCell>
										<TableCell align="right">{formatNumber(el.importe)}</TableCell>
									</TableRow>
								))
							}
							<TableRow selected>
								<TableCell align="right">Total</TableCell>
								<TableCell align="right">{precioProm}</TableCell>
								<TableCell align="right">{tcantidad}</TableCell>
								<TableCell align="right">{tempaques}</TableCell>
								<TableCell align="right">{total}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				}
			</CardContent>
		</Card>
	)
}

export default ResumenVentas