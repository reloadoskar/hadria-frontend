import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, Grid, } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

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
		<div className={classes.root}>
			{
				inventario.length === 0 ?
					<Typography variant="h6" children="No se encontraron productos." align="center" />
				:
				inventario.map( (option, index) => (

				<ExpansionPanel key={option._id} index={index} expanded={expanded === option.clave} onChange={handleChange(option.clave)}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
						>
						<Typography className={classes.heading} variant="h2">{option.clave}</Typography>
						<Typography className={classes.secondaryHeading}>{option.items.length} productos en: {option.clave}</Typography>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails>

						<List className={classes.root}>
							<ListItem>
								<Grid container spacing={2}>
									<Grid item xs={2}>
										
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2" children="Empaques" />
									</Grid>
									<Grid item xs={4}>
										<Typography variant="body2" children="Descripción" />
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2" children="Cantidad" />
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body2" children="Precio" />
									</Grid>
								</Grid>
							</ListItem>

						{option.items.map((item, i) => (
							<ListItem button key={i} onClick={()=> iWantThisItem(item, i, option._id)}>
								<Grid container spacing={2}>

									<Grid item xs={2}>
										<ListItemIcon>
											<PostAddIcon />
										</ListItemIcon>
									</Grid>
									<Grid item xs={2}>
										<Typography children={item.empaquesStock} />
									</Grid>
									<Grid item xs={4} >
										<Typography>
											{item.producto.descripcion}
										</Typography>
									</Grid>
									<Grid item xs={2}>
										<Typography children={item.stock} />
									</Grid>
									<Grid item xs={2}>
										<Grid container justify="flex-end">
											<Typography>
												$ {item.producto.precio1}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</ListItem>

						))}
						</List>
						

						
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</div>
	);
}
