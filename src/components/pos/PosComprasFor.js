import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, Grid, } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {sumEmpaques, sumEmpStock, sumStock} from '../Tools'
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function PosComprasFor({inventario, wantThisItem, showMessage}) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const iWantThisItem = (item, index, compraId) =>{
		if(item.stock === 0){
			showMessage("Inventario agotado.", 'warning' )
		}else{
			wantThisItem(item, index, compraId)
		}
	}

	return (
		<div>
			{
				inventario.length === 0 ?
					<Typography variant="h6" children="No se encontraron productos." align="center" />
				:
				inventario.map( (compra, index) =>   {
					var cant = sumStock(compra.items) 
					var empDisp = sumEmpaques(compra.items) - sumEmpStock(compra.items) 
					if(cant > 0){
						return (
	
							<Accordion key={compra._id} index={index} expanded={expanded === compra.clave} onChange={handleChange(compra.clave)}>
								
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
									>
									<Typography variant="body2">{compra.folio + ":" + compra.clave} | </Typography>
									<Typography variant="subtitle2"> Disponible: {cant} | </Typography>
									<Typography variant="subtitle2" > Empaques vacios: {empDisp}</Typography>
								</AccordionSummary>
	
								<AccordionDetails>
	
									<List className={classes.root}>
										<ListItem>
											<Grid container spacing={2}>
												<Grid item xs={2}>
													
												</Grid>
												<Grid item xs={4}>
													<Typography variant="body2" children="Descripción" />
												</Grid>
												<Grid item xs={2}>
													<Typography 
													align="right"
													variant="body2" children="Emp" />
												</Grid>
												<Grid item xs={2}>
													<Typography 
													align="right"
													variant="body2" children="Cant" />
												</Grid>
												<Grid item xs={2}>
													<Typography 
													align="right"
													variant="body2" children="Precio" />
												</Grid>
											</Grid>
										</ListItem>
	
									{compra.items.map((item, i) => {
										if(item.stock === 0){
											return null
										}else{
											return(
												<ListItem button key={i} onClick={()=> iWantThisItem(item, i, compra._id)}>
													<Grid container spacing={2}>
			
														<Grid item xs={2}>
															<ListItemIcon>
																<PostAddIcon />
															</ListItemIcon>
														</Grid>
														<Grid item xs={4} >
															<Typography>																
																{item.producto.descripcion}																
															</Typography>															
														</Grid>
														<Grid item xs={2}>
															<Typography 
															align="right"
															children={item.empaquesStock} />
														</Grid>
														<Grid item xs={2}>
															<Typography 
															align="right"
															children={item.stock} />
														</Grid>
														<Grid item xs={2}>
															<Grid container justify="flex-end">
																<Typography align="right">
																	$ {item.producto.precio1}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</ListItem>

											)
										}
	
									})}
									</List>
								</AccordionDetails>
							</Accordion>
						)
					}
					else{
						return false
					}
					
				})
			}
		</div>
	);
}
