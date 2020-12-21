import React, {useReducer}from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { 
	MenuItem, 
	Container, TextField, Grid, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//HOOKS

//REDUCER
import reducer from '../reducers/UbicacionesReducer';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#28666E'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const initialState = {
	nombre: '',
	tipo: 'SUCURSAL'
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function UbicacionesDialog({ addUbicacion, isShowing, toggle }) {
    const classes = useStyles();
	const [values, dispatch] = useReducer(reducer, initialState)
	const tipos = ["SUCURSAL", "ADMINISTRACION", "BANCO"]
    const handleSubmit = (event) => {
        event.preventDefault()
		addUbicacion(values)
		dispatch({type: 'reset'})
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={toggle}>
                + Agregar una Ubicacion
      		</Button>
            <Dialog fullScreen open={isShowing} onClose={toggle} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nueva <b>Ubicación</b>
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
                                    label="Nombre del Ubicacion"
                                    helperText="Ingresa el Nombre del Ubicacion"
                                    fullWidth
                                    margin="normal"
									variant="outlined"
									value={values.nombre}
									onChange={(e) => dispatch({type: 'nombre', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									select
									required
                                    id="tipo"
                                    label="Tipo"
                                    helperText="Ingresa el Tipo de Ubicación"
                                    fullWidth
                                    margin="normal"
									variant="outlined"
									value={values.tipo}
									onChange={(e) => dispatch({type: 'tipo', value: e.target.value})}
									>
									{
										tipos.map((option, index) => (
                                        	<MenuItem key={index} value={option}>
                                            	{option}
                                        	</MenuItem>
                                    	))
									}
									</TextField>
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
