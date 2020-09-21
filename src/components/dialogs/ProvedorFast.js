import React, {useReducer}from 'react';

// Material UI
import { TextField, Grid, Button, Dialog, Slide, DialogContent, DialogTitle } from '@material-ui/core';

//HOOKS

//REDUCER
import reducer from '../reducers/ProvedorsReducer';

const initialState = {
	nombre: '',
    clave: '',
    rfc: '',
    direccion: 'NO DISP',
    tel1: '5555555555',
    email: 'nomail@mail.com',
    cta1: '1234567890',
    diasDeCredito: '10',
    comision: '10',
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProvedorsDialog({ addProvedor, open, close }) {

	const [values, dispatch] = useReducer(reducer, initialState)

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
				<DialogContent>
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
							
							
							<Grid container justify="flex-end">
                    			<Button type="submit" variant="contained" color="primary" >Guardar</Button>
							</Grid>
						</Grid>
						
                    </form>

                </DialogContent>
				
				

            </Dialog>
        </div>
    );
}
