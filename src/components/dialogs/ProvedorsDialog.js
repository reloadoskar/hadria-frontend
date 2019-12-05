import React, {useReducer}from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Grid, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//HOOKS

//REDUCER
import reducer from '../reducers/ProvedorsReducer';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#A63C06'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const initialState = {
	nombre: '',
    clave: '',
    rfc: '',
    direccion: '',
    tel1: '',
    email: '',
    cta1: '',
    diasDeCredito: '',
    comision: '',
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProvedorsDialog({ addProvedor, isShowing, toggle }) {
    const classes = useStyles();
	const [values, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = (event) => {
        event.preventDefault()
		addProvedor(values)
		dispatch({type: 'reset'})
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={toggle}>
                + Agregar un Provedor
      		</Button>
            <Dialog fullScreen open={isShowing} onClose={toggle} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Provedor
            			</Typography>
                        <Button color="inherit" onClick={toggle}>
                            Salir
            			</Button>
                    </Toolbar>
                </AppBar>
				
				<Container>
                	<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField
									autoFocus
									required
                                    id="nombre"
                                    label="Nombre del provedor"
                                    helperText="Ingresa el Nombre del Provedor"
                                    fullWidth
                                    margin="normal"
									variant="outlined"
									value={values.nombre}
									onChange={(e) => dispatch({type: 'nombre', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField
                                    required
									id="clave"
									label="Clave de Proveedor"
									helperText="Clave que se asignara a este Proveedor"
									fullWidth
									margin="normal"
									variant="outlined"
									value={values.clave}
									onChange={(e) => dispatch({type: 'clave', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={12} md={3}>
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
							<Grid item xs={6} md={4}>
								<TextField
									required
									fullWidth
									id="direccion"
									label="Dirección"
									helperText="Dirección del Provedor."
									margin="normal"
									variant="outlined"
									value={values.direccion}
									onChange={(e) => dispatch({type: 'direccion', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									required
									fullWidth
									id="tel1"
									label="Teléfono"
									type="number"
									helperText="Teléfono del Provedor."
									margin="normal"
									variant="outlined"
									value={values.tel1}
									onChange={(e) => dispatch({type: 'tel1', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
                                    required
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
							<Grid item xs={6} md={4}>
								<TextField
									required
									fullWidth
									id="cta1"
									label="Cuenta Bancaria"
									type="number"
									helperText="Cuenta para pagos al Provedor."
									margin="normal"
									variant="outlined"
									value={values.cta1}
									onChange={(e) => dispatch({type: 'cta1', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
                                    required
									fullWidth
									id="diasDeCredito"
									label="Días de Crédito"
									helperText="Plazo en días que el provedor te da para pagar."
									margin="normal"
									variant="outlined"
									value={values.diasDeCredito}
									onChange={(e) => dispatch({type: 'diasDeCredito', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
                                    required
									fullWidth
									id="comision"
									label="Comisión de Servicio"
									type="number"
									helperText="Comisión que se descuenta al Proveedor (%)."
									margin="normal"
									variant="outlined"
									value={values.comision}
									onChange={(e) => dispatch({type: 'comision', value: e.target.value})}
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
