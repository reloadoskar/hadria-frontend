import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import { formatNumber, sumImporte, sumEmpaques, sumCantidad } from '../Tools'
export default function CorteResumenVentas({corte, mediasCajasCount}) {
	const classes = useStyles()

	return (
		<Grid container className={classes.paperContorno}>
			<Grid item xs={12}>
				<Typography className={classes.textoMirame} align="center">RESUMEN</Typography>
			</Grid>
			{corte.ventaPorCompraItem.sort((a, b) => a.compra.folio - b.compra.folio).map((el, i) => (
				<React.Fragment key={i}>
					<Grid container >
						<Grid item xs={2} sm={2}><Typography variant="body2" className={classes.textoMirame} >#{el.compra.folio} | {moment(el.compraItem.createdAt).format("DD/MM HH:mm")}</Typography></Grid>
						<Grid item xs={10} sm={3}>
							<Typography variant="body2" >{el.compraItem.producto.descripcion} {el.compraItem.clasificacion}</Typography>
						</Grid>
						<Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.empaques, 2)}</Typography></Grid>
						<Grid item xs={3} sm={2}><Typography align="right" variant="body2" >{formatNumber(el.cantidad, 2)}</Typography></Grid>
						<Grid item xs={3} sm={1}><Typography align="right" variant="body2" >${formatNumber((el.importe / el.cantidad), 2)}</Typography></Grid>
						<Grid item xs={3} sm={2}><Typography align="right" variant="body2" >${formatNumber(el.importe, 2)}</Typography></Grid>
					</Grid>
				</React.Fragment>
			))}
			<Divider />
			<Grid container>
				<Grid item xs={3} sm={7}>
					<Typography align="right" className={classes.textoMiniFacheron}>
						Total cajas
					</Typography>
					<Typography
						className={classes.textoMirame}
						align="right"
					>
						{formatNumber(sumEmpaques(corte.ventaItems), 1)}
					</Typography>
				</Grid>
				<Grid item xs={3} sm={2}>
					<Typography align="right" className={classes.textoMiniFacheron}>
						Total kilos
					</Typography>
					<Typography
						className={classes.textoMirame}
						align="right">
						{formatNumber(sumCantidad(corte.ventaItems), 2)}
					</Typography>
				</Grid>
				<Grid item xs={3} sm={1}><Typography> </Typography></Grid>
				<Grid item xs={3} sm={2}>
					<Typography align="right" className={classes.textoMiniFacheron}>
						Total ventas
					</Typography>
					<Typography
						className={classes.textoMirame}
						align="right">
						${formatNumber(sumImporte(corte.ventaItems), 2)}
					</Typography>
				</Grid>
				<Divider />
				<Grid item xs={12}>
					<Typography
						className={classes.textoMiniFacheron}
						align="right">
						Cajas vacías
					</Typography>
					<Typography
						className={classes.textoMirame}
						align="right"
					>
						{formatNumber((mediasCajasCount / 2), 1)}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}