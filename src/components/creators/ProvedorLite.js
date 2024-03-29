import React, {useReducer}from 'react';

// Material UI
import { TextField, Grid, Button, Dialog, Slide, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

//REDUCER
import reducer from '../reducers/ProvedorsReducer';
import useStyles from '../hooks/useStyles';

import {generadorDeClaves} from '../Tools'
import { useAuth } from '../auth/use_auth';
import { useProductors } from '../productors/ProductorContext';
const initialState = {
	nombre: '',
	sexo: 'H',
    clave: generadorDeClaves(5), 
    rfc: '',
    direccion: 'NO DISPONIBLE',
    tel1: '5500009999',
	email: '',
	banco: "SIN BANCO",
    cta1: '1112200000000',
    diasDeCredito: '10',
    comision: '10',
	ref: ''
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProvedorLite({ open, close }) {
	const {user} = useAuth()
	const {addProductor} = useProductors()
	const [values, dispatch] = useReducer(reducer, initialState)
	const classes = useStyles()
    const handleSubmit = (event) => {
        event.preventDefault()
		addProductor(user, values)
        dispatch({type: 'reset'})
        close()
    }

    return (
        <div>
            <Dialog maxWidth="md" open={open} onClose={close} TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Nuevo Productor</DialogTitle>
                <form onSubmit={handleSubmit}>
				<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoFocus
									required
                                    id="nombre"
                                    label="Nombre del productor"
                                    fullWidth
                                    margin="normal"
									variant="outlined"
									value={values.nombre}
									onChange={(e) => dispatch({type: 'nombre', value: e.target.value})}
									/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="ref"
									label="Referencia"
									fullWidth
									margin="normal"
									variant="outlined"
									value={values.ref}
									onChange={(e) => dispatch({type: 'ref', value: e.target.value})}
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
