import React from 'react'
import moment from 'moment'
import 'moment/locale/es-mx';
import useStyles from '../hooks/useStyles'
import { Container, MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, Typography, CircularProgress, } from '@material-ui/core';
import { findLocationById, getAvailableLocationId, getLocationId } from './accessSelection'

export default function Acceso({ accesando, ubicacions = [], ubicacion="", fecha="", access, handleChange, user }) {
	const classes = useStyles();
	const handleSubmit = (e) => {
		e.preventDefault()
		access()
	}

	return (
		<Container maxWidth="xs">
			<Card >
				<CardHeader
					title="Selección de Ubicación"
					subheader={moment().format("dddd DD, MMMM YYYY")}
				/>
				{ubicacions === null ?
					<React.Fragment>
						<Typography variant="h6" align="center">Cargando..</Typography>
						<Typography variant="h6" align="center"><CircularProgress /></Typography>
					</React.Fragment>
					:
					<CardContent>
						{accesando ?
							<React.Fragment>
								<Typography variant="h6" align="center"> Accesando... </Typography>
								<Typography variant="h6" align="center"> <CircularProgress /></Typography>
							</React.Fragment>
							:
							<form onSubmit={(e) => handleSubmit(e)}>
								{user.level < 3 ?
									<React.Fragment>
										<TextField
											id="ubicacion"
											label="Selecciona una ubicación"
											autoFocus
											select
											required
											fullWidth
											margin="normal"
											variant="outlined"
											value={getAvailableLocationId(ubicacions, ubicacion)}
											onChange={(e) => handleChange('ubicacion', findLocationById(ubicacions, e.target.value))}
										>
											{ubicacions === null ?
												<MenuItem>Cargando...</MenuItem>
												:
												ubicacions.map((option, index) => {
													if (option.tipo === 'SUCURSAL') {
														return (
															<MenuItem key={index} value={getLocationId(option)}>
																{option.nombre}
															</MenuItem>
														)
													} else {
														return false
													}
												})
											}
										</TextField>
										<TextField
											id="fecha"
											type="date"
											value={fecha}
											fullWidth
											margin="normal"
											variant="outlined"
											onChange={e => handleChange('fecha', e.target.value)}
										/>
									</React.Fragment>
									:
									<React.Fragment>
										<Typography variant="h5" align="center" >{!ubicacion ? null : ubicacion.nombre}</Typography>
										<Typography variant="h5" align="center" >{fecha === '' ? null : fecha}</Typography>
									</React.Fragment>
								}

								<Grid container justifyContent="flex-end">
									<Button
										fullWidth
										className={classes.botonAzuloso}
										disabled={!getAvailableLocationId(ubicacions, ubicacion) || !fecha}
										type="button"
										variant="contained"
										color="primary"
										size="large"
										onClick={(e) => handleSubmit(e)}>Acceder</Button>
								</Grid>

							</form>
						}
					</CardContent>
				}
			</Card>
		</Container>
	)
}