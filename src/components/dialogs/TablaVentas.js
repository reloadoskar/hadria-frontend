import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Paper';
import { Typography, CardHeader, CardContent, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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

export default function TablaVentas({ table, data }) {
	const classes = useStyles();
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
						<Grid item xs>Folio</Grid>
						<Grid item xs>Ubicación</Grid>
						<Grid item xs>Cliente</Grid>
						<Grid item xs>Tipo</Grid>
						<Grid item xs>Importe</Grid>
					</Grid>

					<Grid container>
						{data.map((row, index) => (
							<Grid item xs={12} key={index}>
								<ExpansionPanel>
									<ExpansionPanelSummary>
										<Grid container spacing={2}>
											
											<Grid item md  >
												<Typography variant="body2" children={row.folio} />
											</Grid>
													
											<Grid item md  >
												<Typography variant="body2" children={row.ubicacion.nombre} />
											</Grid>
										
                                        	<Grid item md >
												<Typography variant="body2" children={row.cliente.nombre} />
											</Grid>
												
											<Grid item md >
												<Typography align="right" variant="body2" children={row.tipoPago} />
											</Grid>
											
                                            <Grid item md  >
												<Typography align="right" variant="body2" children={"$"+formatNumber(row.importe)} />
											</Grid>

													

										</Grid>
									</ExpansionPanelSummary>
										{!row.items ? '' 
											:
											<ExpansionPanelDetails>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Clave</TableCell>
                                                            <TableCell>Descripción</TableCell>
                                                            <TableCell>Cantidad</TableCell>
                                                            <TableCell>Empaques</TableCell>
                                                            <TableCell>Precio</TableCell>
                                                            <TableCell>Importe</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {row.items.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell><Typography children={item.compra.folio} /></TableCell>
                                                                <TableCell><Typography children={item.producto.descripcion} /></TableCell>
                                                                <TableCell><Typography children={item.cantidad} /></TableCell>
                                                                <TableCell><Typography children={item.empaques} /></TableCell>
                                                                <TableCell><Typography children={item.precio} /></TableCell>
                                                                <TableCell><Typography children={item.importe} /></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>    

                                                </Table>					
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
