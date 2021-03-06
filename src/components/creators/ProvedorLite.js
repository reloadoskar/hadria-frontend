import React, {useReducer}from 'react';

// Material UI
import { TextField, Grid, Button, Dialog, Slide, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

//HOOKS

//REDUCER
import reducer from '../reducers/ProvedorsReducer';
import useStyles from '../hooks/useStyles';

const initialState = {
	nombre: '',
    clave: '',
    rfc: '',
    direccion: 'NO DISP',
    tel1: '',
    email: '',
    cta1: '1234567890',
    diasDeCredito: '10',
    comision: '10',
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProvedorLite({ addProvedor, open, close }) {

	const [values, dispatch] = useReducer(reducer, initialState)
	const classes = useStyles()
    const handleSubmit = (event) => {
        event.preventDefault()
		addProvedor(values)
        dispatch({type: 'reset'})
        close()
    }

    return (
        <div>
            <Dialog maxWidth="md" open={open} onClose={close} TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Nuevo Proveedor</DialogTitle>
                <form onSubmit={handleSubmit}>
				<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
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
							<Grid item xs={12}>
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
							
							<Grid item xs>
								<TextField
                                    required
									fullWidth
									id="tel1"
									label="Teléfono"
									type="number"
									margin="normal"
									variant="outlined"
									value={values.tel1}
									onChange={(e) => dispatch({type: 'tel1', value: e.target.value})}
									/>
							</Grid>
							
							
						</Grid>

						

                </DialogContent>
                
                <DialogActions>
					
                    	<Button className={classes.botonSimplon} onClick={close} >Cancelar</Button>
                    	<Button className={classes.botonGenerico} type="submit" >Guardar</Button>
					
                </DialogActions>
                </form>
				
				

            </Dialog>
        </div>
    );
}
