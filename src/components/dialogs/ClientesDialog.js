import React, {useReducer}from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Grid, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//HOOKS

//REDUCER
import reducer from '../reducers/ClientesReducer';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#BD4F6C'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

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

    const handleSubmit = (event) => {
        event.preventDefault()
		addCliente(values)
		dispatch({type: 'reset'})
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={toggle}>
                + Agregar un Cliente
      		</Button>
            <Dialog fullScreen open={isShowing} onClose={toggle} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
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
                </AppBar>
				
				<Container>
                	<form onSubmit={handleSubmit}>
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
							<Grid container justify="flex-end">
                    			<Button type="submit" variant="contained" color="primary" >Guardar</Button>
							</Grid>
						</Grid>
						
                </form>
				</Container>

            </Dialog>
        </div>
    );
}
