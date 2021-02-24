import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import { List, ListItem, Grid, } from '@material-ui/core';
import {formatNumber} from '../Tools'
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
	// const [expanded, setExpanded] = useState(false);

	// const handleChange = panel => (event, isExpanded) => {
	// 	setExpanded(isExpanded ? panel : false);
	// };

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
 				<List className={classes.root}>
					 <Grid container spacing={2}>
						 <Grid item xs>
						 	<Typography>Folio:</Typography>
						 </Grid>
						 <Grid item xs>
						 	<Typography>Producto</Typography>
						 </Grid>
						 <Grid item xs>
						 	<Typography>Empaques</Typography>
						 </Grid>
						 <Grid item xs>
						 	<Typography>Cantidad</Typography>
						 </Grid>
					 </Grid>
					{inventario.map( (item, i) =>   {
						if(item.stock >= 1 ){
							return(
					 			<ListItem button key={i} onClick={()=> iWantThisItem(item, i, item.compra._id)}>
									<Grid container spacing={2}>
										<Grid item xs>
											<Typography>{item.compra.folio}</Typography>
										</Grid>
										<Grid item xs>
											<Typography>{item.producto.descripcion}</Typography>
										</Grid>
										<Grid item xs>
											<Typography align="right">{formatNumber(item.empaquesStock,2)}</Typography>
										</Grid>
										<Grid item xs>
											<Typography align="right">{formatNumber(item.stock,2)}</Typography>
										</Grid>
									</Grid>
								</ListItem>
					 		)
						}
						else return null
					})}	
				</List>
							
					// var cant = sumStock(compra.items) 
					// var empDisp = sumEmpaques(compra.items) - sumEmpStock(compra.items) 
					// if(cant > 0){
						// return (
	
						// 	<Accordion key={compra._id} index={index} expanded={expanded === compra.clave} onChange={handleChange(compra.clave)}>
								
						// 		<AccordionSummary
						// 			expandIcon={<ExpandMoreIcon />}
						// 			aria-controls="panel1bh-content"
						// 			id="panel1bh-header"
						// 			>
						// 			<Typography variant="body2">{compra.folio + ":" + compra.clave} | </Typography>
						// 			<Typography variant="subtitle2"> Disponible: {cant} | </Typography>
						// 			<Typography variant="subtitle2" > Empaques vacios: {empDisp}</Typography>
						// 		</AccordionSummary>
	
						// 		<AccordionDetails>
	
						// 			<List className={classes.root}>
						// 				<ListItem>
						// 					<Grid container spacing={2}>
						// 						<Grid item xs={2}>
													
						// 						</Grid>
						// 						<Grid item xs={4}>
						// 							<Typography variant="body2" children="Descripción" />
						// 						</Grid>
						// 						<Grid item xs={2}>
						// 							<Typography 
						// 							align="right"
						// 							variant="body2" children="Emp" />
						// 						</Grid>
						// 						<Grid item xs={2}>
						// 							<Typography 
						// 							align="right"
						// 							variant="body2" children="Cant" />
						// 						</Grid>
						// 						<Grid item xs={2}>
						// 							<Typography 
						// 							align="right"
						// 							variant="body2" children="Precio" />
						// 						</Grid>
						// 					</Grid>
						// 				</ListItem>
	
						// 			{compra.items.map((item, i) => {
						// 				if(item.stock === 0){
						// 					return null
						// 				}else{
						// 					return(
						// 						<ListItem button key={i} onClick={()=> iWantThisItem(item, i, compra._id)}>
						// 							<Grid container spacing={2}>
			
						// 								<Grid item xs={2}>
						// 									<ListItemIcon>
						// 										<PostAddIcon />
						// 									</ListItemIcon>
						// 								</Grid>
						// 								<Grid item xs={4} >
						// 									<Typography>																
						// 										{item.producto.descripcion}																
						// 									</Typography>															
						// 								</Grid>
						// 								<Grid item xs={2}>
						// 									<Typography 
						// 									align="right"
						// 									children={item.empaquesStock} />
						// 								</Grid>
						// 								<Grid item xs={2}>
						// 									<Typography 
						// 									align="right"
						// 									children={item.stock} />
						// 								</Grid>
						// 								<Grid item xs={2}>
						// 									<Grid container justify="flex-end">
						// 										<Typography align="right">
						// 											$ {item.producto.precio1}
						// 										</Typography>
						// 									</Grid>
						// 								</Grid>
						// 							</Grid>
						// 						</ListItem>

						// 					)
						// 				}
	
						// 			})}
						// 			</List>
						// 		</AccordionDetails>
						// 	</Accordion>
						// )
					// }
					// else{
					// 	return false
					// }
					
			// 	})
			}
		</div>
	);
}
