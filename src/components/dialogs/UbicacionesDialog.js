import React, {useReducer}from 'react';

// Material UI
import useStyles from '../hooks/useStyles'
import { 
	MenuItem, 	
	TextField, Grid, Button, Dialog, Slide, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

//HOOKS

//REDUCER
import reducer from '../reducers/UbicacionesReducer';


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
            <Button className={classes.botonGenerico} onClick={toggle}>
                + Agregar una Ubicacion
      		</Button>
            <Dialog fullWidth open={isShowing} onClose={toggle} TransitionComponent={Transition} maxWidth="sm">
				<DialogTitle>Nueva Ubicación</DialogTitle>	
                <form onSubmit={handleSubmit}>
				<DialogContent>
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
                    			
							</Grid>
						</Grid>
						
				</DialogContent>
				<DialogActions>
					<Button className={classes.botonSimplon} onClick={toggle} >Cancelar</Button>
					<Button className={classes.botonGenerico} type="submit">Guardar</Button>
				</DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
