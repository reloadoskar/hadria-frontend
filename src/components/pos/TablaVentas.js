import React from 'react';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Paper';
import { IconButton, Typography, CardContent, Grid, Divider } from '@material-ui/core';
import {sumImporte, formatNumber } from '../Tools'
import {ticketVentasCorte} from "../api"
import PrintIcon from '@material-ui/icons/Print';
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(3),
		width: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 650,
	},
}));

export default function TablaVentas({ table, data }) {
	const classes = useStyles();
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
		<div className={classes.root}>
			<Card className={classes.paper}>
				
				<CardContent>
					<Grid container direction="row-reverse">
						<Grid item >
						<IconButton onClick={() => handleClick(data)}>
							<PrintIcon />
						</IconButton>
						</Grid>
					</Grid>
					<Grid container spacing={2} >
						<Grid item xs md={5}>Venta</Grid>
						<Grid item xs md={6}>Detalle</Grid>
						<Grid item xs md={1}><Typography align="right">Importe</Typography></Grid>
					</Grid>

						{data.map((row, index) => (
						<div key={index}>
						<Grid container  spacing={2} alignItems="center">
							<Grid item xs md={5}>
								<Typography variant="body2">
									{row.folio} / {row.ubicacion.nombre} / {row.tipoPago} / {row.cliente.nombre}
								</Typography>
							</Grid>
		
							<Grid item xs md={5}>
								{
									!row.items ? ''
									:
									<div>
										{
											row.items.map((item, i) => (
												<div key={i}>
												<Divider />
												<Grid container>
													<Grid item xs={12} md={6}>
														<Typography variant="body2" children={item.compra.folio+":"+item.compra.clave+ " " +item.producto.descripcion} />
													</Grid>
													<Grid item xs={12} md={4}>
														<Typography variant="body2" align="right">
															{item.empaques}-{item.cantidad} x {item.precio} = 
														</Typography>
													</Grid>
													<Grid item xs={12} md={2}>
														<Typography variant="body2" align="right">
															$ {formatNumber(item.importe)}
														</Typography>
													</Grid>
												</Grid>
												</div>
											))
										}	
									</div>
								}
							</Grid>
											
                            <Grid item xs  md={2}>
								<Typography align="right" variant="body2" children={"$"+formatNumber(row.importe)} />
							</Grid>

						</Grid>
						<Divider />	
						</div>													
							))}

						<Grid container justify="flex-end">
							<Typography>
								$ {formatNumber(sumImporte(data))}
							</Typography>
						</Grid>
				</CardContent>

			</Card>
		</div>
	);
}
