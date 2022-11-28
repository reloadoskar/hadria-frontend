import React, {useReducer, useContext, useState}from 'react';
import useStyles from '../hooks/useStyles'
import { 
	MenuItem, 	
	TextField, Grid, Button, Dialog, Slide, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core';
import reducer from '../reducers/UbicacionesReducer';
import { UbicacionContext } from './UbicacionContext';
import { useAuth } from '../auth/use_auth';
import { useSnackbar } from 'notistack';
const initialState = {
	nombre: '',
	tipo: 'SUCURSAL'
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function UbicacionesDialog({ isShowing, open, close }) {
	const {user} = useAuth()
	const {ubicacions, addUbicacion} = useContext(UbicacionContext)
    const classes = useStyles();
	const [values, dispatch] = useReducer(reducer, initialState)
	const tipos = ["SUCURSAL", "ADMINISTRACIÓN", "BANCO", "BODEGA/ALMACÉN"]
	const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
	const [trabajando, setTrabajando] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault()
		if(ubicacions.length<20){
			setTrabajando(true)
			addUbicacion(user, values).then(res=>{
				showMessage(res.message, res.status)
				dispatch({type: 'reset'})
				setTrabajando(false)
				close()
			}).catch(err=>{
				setTrabajando(false)
				showMessage(err.message, 'error')
			})
		}else{
			showMessage('Limite de ubicaciones alcanzado, actualice su servicio', 'error')
		}
    }

    return (
        <Grid item container justifyContent="center">
			<Grid item >
				<Button className={classes.botonGenerico} onClick={open}>
					+ Agregar una Ubicacion
				</Button>

				<Dialog fullWidth open={isShowing} onClose={close} TransitionComponent={Transition} maxWidth="sm">
					<DialogTitle>Nueva Ubicación</DialogTitle>	
					<form onSubmit={handleSubmit}>
					<DialogContent>
							<Grid container spacing={2} >
								<Grid item xs={12} md={6}>
									<TextField
										autoFocus
										required
										id="nombre"
										label="Nombre del Ubicacion"
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
							</Grid>
							
					</DialogContent>
					<DialogActions>
						<Button className={classes.botonSimplon} onClick={close} >Cancelar</Button>
						{!trabajando ? <Button className={classes.botonGenerico} type="submit">Guardar</Button> : <CircularProgress size={30} /> }
					</DialogActions>
					</form>
				</Dialog>
			</Grid>
        </Grid>
    );
}
