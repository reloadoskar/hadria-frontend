import React, {useState} from 'react'
import { Grid, Typography, Box, Tabs, Tab, Link } from '@material-ui/core'
import useStyles, { blue, danger }from '../hooks/useStyles'
import moment from 'moment'
import { formatNumber } from '../Tools'
import Venta from '../ventas/Venta'
import CoolProgressWtLabel from '../tools/CoolProgressWtLabel'
import { useAuth } from '../auth/use_auth'
export default function CorteDetalleVentas({corte}) {
	const auth = useAuth()
	const classes = useStyles()
		const [ventaSelected, setVentaSel] = useState(null)
		const [verVenta, setVerVenta] = useState(null)
	const [tabSelected, setTab] = useState(1)
	const handleChangeTab = (event, value) => {
		setTab(value)
	}
	const handleVerVenta = (vta) => {
		setVentaSel(vta)
		setVerVenta(true)
	}
	return (		
		<Grid item xs={12} className={classes.paperContorno}>
			<Box displayPrint="none" display="block">
				<Grid item xs={12}>
					<Tabs
						value={tabSelected}
						onChange={handleChangeTab}
						centered
					>
						<Tab label="Detalle de venta" value={1} />
						<Tab label="Ventas por folio" value={2} />
					</Tabs>
				</Grid>
			</Box>

			<Grid container value={tabSelected} role="tabpanel" hidden={tabSelected !== 1}>
				{corte.ventaPorCompraItem.sort((a, b) => a.compra.folio - b.compra.folio).map((el, i) => (
					<Grid container key={i} className={classes.paperSutil}>
						<Grid item xs={6}>
							<Typography className={classes.textoMirame}>
								#{el.compra.folio} | {moment(el.compraItem.createdAt).format("DD/MM")} {el.compraItem.producto.descripcion} {el.compraItem.clasificacion}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography className={classes.textoMirame} align="right">
								{formatNumber(el.compraItem.empaquesStock, 1)} de {formatNumber(el.compraItem.empaques, 1)} / {formatNumber(el.compraItem.stock, 2)} de {formatNumber(el.compraItem.cantidad, 2)}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<CoolProgressWtLabel
								variant="determinate"
								style={el.compraItem.stock * 100 / el.compraItem.cantidad < 30 ? danger : blue}
								value={
									(el.compraItem.stock * 100 / el.compraItem.cantidad)
								}
							/>
						</Grid>
						<Grid item container xs={12}>
							<Grid item xs={2}>
								<Typography variant="body2" className={classes.textoMiniFacheron} >folio</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="body2" className={classes.textoMiniFacheron} >cliente</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography variant="body2" align="right" className={classes.textoMiniFacheron} >empaques</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography variant="body2" align="right" className={classes.textoMiniFacheron} >cantidad</Typography>
							</Grid>
							<Grid item xs={1}>
								<Typography variant="body2" align="right" className={classes.textoMiniFacheron} >precio</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography variant="body2" align="right" className={classes.textoMiniFacheron} >importe</Typography>
							</Grid>
							{el.ventas.map((vta, i) => (
								<React.Fragment key={i}>
									<Grid item xs={2}>
										<Typography variant="body2" display="inline">
											#{vta.ventaFolio} {moment(vta.createdAt).format("HH:mm")}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography variant="body2" >{vta.venta.cliente.nombre}</Typography>
									</Grid>
									<Grid item xs={1}>
										<Typography variant="body2" align="right">{vta.empaques}</Typography>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2" align="right">{formatNumber(vta.cantidad, 2)}</Typography>
									</Grid>
									<Grid item xs={1}>
										<Typography variant="body2" align="right">${vta.precio}</Typography>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2" align="right">{formatNumber(vta.importe, 2)}</Typography>
									</Grid>
								</React.Fragment>
							))}
						</Grid>
						<Grid item xs={6}></Grid>
						<Grid item xs={1}><Typography align="right" variant="body2" className={classes.textoMirame}>{formatNumber(el.empaques, 2)}</Typography></Grid>
						<Grid item xs={2}><Typography align="right" variant="body2" className={classes.textoMirame}>{formatNumber(el.cantidad, 2)}</Typography></Grid>
						<Grid item xs={1}><Typography align="right" variant="body2" className={classes.textoMirame}>${formatNumber((el.importe / el.cantidad), 2)}</Typography></Grid>
						<Grid item xs={2}><Typography align="right" variant="body2" className={classes.textoMirame}>${formatNumber(el.importe, 2)}</Typography></Grid>
					</Grid>
				))}

			</Grid>

			<Grid container value={tabSelected} role="tabpanel" hidden={tabSelected !== 2}>
				{corte.ventas.length > 0 ?
					corte.ventas.sort((a,b)=>a.folio - b.folio).map((vta, i) => (
						<React.Fragment key={i}>
							<Grid xs={2}>
							{auth.user.level > 2 ? vta.folio :
								<Link onClick={()=>handleVerVenta(vta)}>#{vta.folio} </Link>
							} {moment(vta.createdAt).format("HH:mm")}</Grid>
							<Grid xs={6}>{vta.cliente.nombre}</Grid>
							<Grid xs={2}>{vta.tipoPago}</Grid>
							<Grid xs={2}><Typography align="right" variant="body2">$ {formatNumber(vta.importe,2)}</Typography></Grid>							
						</React.Fragment>
					))
					: null
				}
			</Grid>
			<Venta open={verVenta} close={() => setVerVenta(false)} venta={ventaSelected} />
		</Grid>
	)
}