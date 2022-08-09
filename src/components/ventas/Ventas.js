import React, { useContext } from 'react'
import { Grid, Container, Typography } from '@material-ui/core';
// import moment from 'moment'
import { VentaContext } from './VentaContext';
import BuscadorVenta from './BuscadorVenta';
import SelectorDeRango from './SelectorDeRango';
import VentasReporter from './VentasReporter';

const Ventas = () => {
	const {rango, ventasPorSemana, trabajando} = useContext(VentaContext)
	// const month = moment().format('MM')
	// const year = moment().format('YYYY')

	// useEffect(()=>{

	// },[month, year])

	// useEffect(()=>{

	// },[])
	return (
		<Container>
			<Grid container spacing={2} alignItems="center">
				{/* SELECCION RANGO DE FECHAS */}
				<Grid item xs={12} sm={8}>
					<SelectorDeRango />
				</Grid>

				<Grid item xs={12} sm={4}>
					<BuscadorVenta />
				</Grid>
				
				{/* LISTA DE VENTAS */}
				<Grid item xs={12}>
					{trabajando? <Typography align="center">Buscando...</Typography> :
						ventasPorSemana.length >0 ?
							<VentasReporter data={ventasPorSemana} rango={rango} />
						: null 
					}
					
					

				</Grid>				
			</Grid>
		</Container>
	)
}

export default Ventas