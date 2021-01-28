import React, {useReducer, useState}from 'react';

// Material UI
import useStyles from '../hooks/useStyles'
import { TextField, Grid, Button, Dialog, Typography, Slide, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

//HOOKS

//REDUCER
import reducer from '../reducers/ClientesReducer';


const initialState = {
	nombre: '',
    rfc: '',
    direccion: 'NO DISP',
    tel1: '1234567890',
    email: 'nomail@mail.com',
    diasDeCredito: 0,
    limiteDeCredito: 0,
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClientesDialog({ addCliente, isShowing, toggle }) {
    const classes = useStyles();
	const [values, dispatch] = useReducer(reducer, initialState)
	const [guardando, setGuardando] = useState(false)
    const handleSubmit = (event) => {
		setGuardando(true)
        event.preventDefault()
		addCliente(values)
		dispatch({type: 'reset'})
    }

    return (
        <div>
            <Button className={classes.botonGenerico} variant="contained" color="secondary" onClick={toggle}>
                + Agregar un Cliente
      		</Button>
			<Dialog 
				fullWidth
				// fullScreen 
				open={isShowing} 
				onClose={toggle} 
				TransitionComponent={Transition}
				maxWidth="lg"
				>
				<DialogTitle>Nuevo Cliente</DialogTitle>
                {/* <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Cliente
            			</Typography>
                        <Button color="inherit" onClick={toggle}>
                            Salir
            			</Button>
                    </Toolbar>
                </AppBar> */}
				<form onSubmit={handleSubmit}>
				{
					guardando === true ?
						<Typography variant="h5" align="center">Guardando...</Typography>
					:

						<DialogContent>
								<Grid container spacing={2}>
									<Grid item xs={12} md={8}>
										<TextField
											autoFocus
											required
											id="nombre"
											label="Nombre del cliente"
											helperText="Ingresa el Nombre del Cliente"
											fullWidth
											margin="normal"
											variant="outlined"
											value={values.nombre}
											onChange={(e) => dispatch({type: 'nombre', value: e.target.value})}
											/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											id="rfc"
											label="RFC"
											helperText="Registro Federal de Contribuyentes"
											fullWidth
											margin="normal"
											variant="outlined"
											value={values.rfc}
											onChange={(e) => dispatch({type: 'rfc', value: e.target.value})}
											/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											fullWidth
											id="direccion"
											label="Dirección"
											helperText="Dirección del Cliente."
											margin="normal"
											variant="outlined"
											value={values.direccion}
											onChange={(e) => dispatch({type: 'direccion', value: e.target.value})}
											/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											fullWidth
											id="tel1"
											label="Teléfono"
											type="number"
											helperText="Teléfono del Cliente."
											margin="normal"
											variant="outlined"
											value={values.tel1}
											onChange={(e) => dispatch({type: 'tel1', value: e.target.value})}
											/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											fullWidth
											id="email"
											label="email"
											type="email"
											helperText="Correo electrónico."
											margin="normal"
											variant="outlined"
											value={values.email}
											onChange={(e) => dispatch({type: 'email', value: e.target.value})}
											/>

									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											fullWidth
											id="diasDeCredito"
											label="Días de Crédito"
											type="number"
											helperText="Plazo en días que el cliente tiene para pagar."
											margin="normal"
											variant="outlined"
											value={values.diasDeCredito}
											onChange={(e) => dispatch({type: 'diasDeCredito', value: e.target.value})}
											/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											fullWidth
											id="limiteDeCredito"
											label="Límite de Crédito"
											type="number"
											helperText="Cantidad máxima que el cliente puede solicitar."
											margin="normal"
											variant="outlined"
											value={values.limiteDeCredito}
											onChange={(e) => dispatch({type: 'limiteDeCredito', value: e.target.value})}
											/>
									</Grid>
								</Grid>
								
						</DialogContent>
				}
				<DialogActions>
					<Button className={classes.botonSimplon} onClick={toggle}>Cancelar</Button>
                    <Button className={classes.botonGenerico} type="submit" >Guardar</Button>

				</DialogActions>
				</form>

            </Dialog>
        </div>
    );
}
