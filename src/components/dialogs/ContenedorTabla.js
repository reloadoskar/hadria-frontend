import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Paper';
import { Typography, CardHeader, CardContent, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import {sumImporte, capitalize, formatNumber } from '../Tools'

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

const getHeaders = (obj) => {
	// console.log(obj)
	let headers = []
    for (const prop in obj){
		// console.log("a ver: "+prop+"="+obj[prop])
		headers.push(prop)
        
    }
    return headers
}

export default function ContenedorTabla({ table, data }) {
	const classes = useStyles();
	var headers = getHeaders(data[0])
	// console.log(tableHead)
	return (
		<div className={classes.root}>
			<Card className={classes.paper}>
				<CardHeader 
					title={"$"+ sumImporte(data)} 
					titleTypographyProps={{
						align: "right",
						variant: "h4"
					}} 
					subheader={data.length + " "+ table} 
					subheaderTypographyProps={{
						align: "right"
					}}/>
				<CardContent>
					<Grid container spacing={2} >
						{headers.map((el, index) => {
							if(el === 'items'){
								return false
							}
							if(el === '_id'){
								return false								
							}
							else{
								return(
									<Grid item md key={index}>
										<Typography variant="body1" children={capitalize(el)} />
									</Grid>
								)
							}

						})}	

					</Grid>

					<Grid container>
						{data.map((row, index) => (
							<Grid item xs={12} key={index}>
								<ExpansionPanel>
									<ExpansionPanelSummary>
										<Grid container spacing={2}>
											{headers.map((el, i) => {
												if(el === '_id'){
													return null
												}
												if(el === 'folio'){
													return (
														<Grid item md key={i} >
															<Typography variant="body2" children={row.folio} />
														</Grid>
													)
												}
												if(el === 'ubicacion'){
													return (
														<Grid item md key={i} >
															<Typography variant="body2" children={row.ubicacion.nombre} />
														</Grid>
													)
												}
												if(el === 'cliente'){
													return (
														<Grid item md key={i} >
															<Typography variant="body2" children={row.cliente.nombre} />
														</Grid>
													)
												}
												if(el === 'importe'){
													return(
														<Grid item md key={i} >
															<Typography align="right" variant="body2" children={"$"+formatNumber(row.importe)} />
														</Grid>
													)
												}
												if(el === 'tipoPago'){
													return(
														<Grid item md key={i}>
															<Typography align="right" variant="body2" children={row.tipoPago} />
														</Grid>
													)

												}
												if(el === 'acuenta'){
													return(
														<Grid item md key={i}>
															<Typography align="right" variant="body2" children={row.acuenta} />
														</Grid>
													)

												}
												if(el === 'saldo'){
													return(
														<Grid item md key={i} >
															<Typography align="right" variant="body2" children={row.saldo} />
														</Grid>
													)

												}
												if(el === 'items'){
													return null
												}
												else{
													return(
															<Grid item md key={i} >
													 			<Typography variant="body2" children={row[el]} />
													 		</Grid>
													
													)
												}
											})}
											</Grid>
										</ExpansionPanelSummary>
										{!row.items ? '' 
											:
											<ExpansionPanelDetails>
												<Grid container >
													{row.items.map((item, index) => (
														<React.Fragment key={index}>
															<Grid item md>
																<Typography children={item.compra.clave} />
															</Grid>
															<Grid item md>
																<Typography align="right" children={item.empaques+"-" } />
															</Grid>
															<Grid item md>
																<Typography children={item.producto.descripcion} />
															</Grid>
															<Grid item md>
																<Typography align="right" children={item.cantidad} />
															</Grid>
															<Grid item md>
																<Typography align="right" children={"x"+item.precio} />
															</Grid>
															<Grid item md>
																<Typography align="right" children={"="+item.importe} />
															</Grid>
															<Divider />
														</React.Fragment>
													))}
												</Grid>
											</ExpansionPanelDetails>
										}
									</ExpansionPanel>							
								</Grid> 
							))}
						</Grid>

				</CardContent>

			</Card>
		</div>
	);
}
