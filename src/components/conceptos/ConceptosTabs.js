import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Box, Container } from '@material-ui/core/';

import ConceptosEgresos from './ConceptosEgresos'
import Unidades from './Unidades'
import Empaques from './Empaques'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Container
			spacing={2}
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Container>
	);
}

export default function ConceptosTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Conceptos de Egresos" />
					<Tab label="Unidades" />
					<Tab label="Empaques" />
				</Tabs>
			</Paper>
			<TabPanel value={value} index={0}>
				<ConceptosEgresos />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Unidades />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Empaques />
			</TabPanel>
		</div>
	);
}