import React, {useState}from 'react';

import { 
	TextField, Grid, Button, Dialog, 
	// AppBar, Toolbar, IconButton, Typography, 
	Slide, MenuItem, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';

//HOOKS
import useUnidades from '../hooks/useUnidades'
import useEmpaques from '../hooks/useEmpaques'
import useStyles from '../hooks/useStyles'
import {searchBy as search} from '../Tools'
const initialState = {
	clave: '',
    descripcion: '',
	costo: '',
    unidad: '',
    empaque: '',	
    precio1: '',
    precio2: '',
    precio3: '',
    existeDescripcion: false,
    existeClave: false,
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function CrearProducto({ addProducto, open, close, products }) {
	const {unidades} = useUnidades()
	const {empaques} = useEmpaques()
    const classes = useStyles();
    const [values, setValues] = useState(initialState)
	const [isReady, setIsReady] = useState(false)
	const isItReady = () => {
		if(
			values.descripcion !== '' && 
			values.clave !=='' &&
			values.costo !=='' &&
			values.unidad !== '' &&
			values.empaque !== '' &&
			values.precio1 !== ''
		){
			return setIsReady(true)
		}
	}
    const handleChange = (field, value) => {
		isItReady()
        var busqueda = ''
        switch (field){
            case 'descripcion':
                var desc = value.toUpperCase()
				busqueda = search('descripcion', desc, products)
				var arrayCadena = desc.split(" ")
				var c =""
				for (var i=0; i < arrayCadena.length; i++) {
					var palabra = arrayCadena[i]
					c = c + palabra.charAt(0)
				}

                if(busqueda.length > 1){
                    // console.log(busqueda)
                    return setValues({
                        ...values, 
						[field]: desc,
						clave: c,
                        existeDescripcion: false
                    })
                }
                if(busqueda.length === 1){
                    return setValues({...values, 
						[field]: desc,
						clave: c,
                        existeDescripcion: true})
                }
                if(busqueda.length === 0){
                    return setValues({...values, 
						[field]: desc,
						clave: c,
                        existeDescripcion: false
                        })
                }
                break;
                
            case 'clave':
                var clave = value
                busqueda = search('clave', value.toUpperCase(), products)
                if(busqueda.length > 1){
                    // console.log(busqueda)
                    return setValues({
                        ...values, 
                        [field]: clave.toUpperCase(),
                        existeClave: false
                    })
                }
                if(busqueda.length === 1){
                    return setValues({...values, 
                        [field]: clave.toUpperCase(),
                        existeClave: true})
                }
                if(busqueda.length === 0){
                    return setValues({...values, 
                        [field]: clave.toUpperCase(),
                        existeClave: false
                        })
                }
                // return setValues({...values, [field]: clave.toUpperCase()})
                break;
            case 'reset':
				return setValues(initialState)
				
			case 'costo':
				var p1 = parseFloat(value) + ( parseFloat(value) * 1)
				var p2 = parseFloat(value) + ( parseFloat(value) * .5)
				var p3 = parseFloat(value) + ( parseFloat(value) * .10)
				return setValues({...values,
					costo: value,
					precio1: p1,
					precio2: p2,
					precio3: p3
				})
            default:
				return setValues({...values, [field]: value})
        }
    }
        
    
    const handleSubmit = (event) => {
        event.preventDefault()
		addProducto(values)
		handleClose()
	}
	
	const handleClose = () => {
		handleChange('reset')
		close()
	}

    return (            
    	<Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
			
			<DialogTitle>Nuevo Producto</DialogTitle>
			
			<DialogContent>
				
				<Grid container spacing={1}>
					
					<Grid item xs={12}>
						
						<TextField
							autoFocus
							required
							id="descripcion"
							label="Descripción"
                            fullWidth
                            error={values.existeDescripcion}
							margin="normal"
							variant="outlined"
							value={values.descripcion}
							onChange={(e) => handleChange('descripcion', e.target.value)}
						/>
					</Grid>
					
					<Grid item xs={12} md={4}>
						<TextField
                            required
                            error={values.existeClave}
							id="clave"
							label="Clave"
							fullWidth
							margin="normal"
							variant="outlined"
							value={values.clave}
                            // onChange={(e) => dispatch({type: 'clave', value: e.target.value})}
                            onChange={(e) => handleChange('clave', e.target.value)}
						/>
					</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									required
									fullWidth
									select
									id="unidad"
									label="Unidad"
									margin="normal"
									variant="outlined"
									value={values.unidad}
                                    // onChange={(e) => dispatch({type: 'unidad', value: e.target.value})}
                                    onChange={(e) => handleChange('unidad', e.target.value)}
									>
									{unidades.map((el, index) => (
										<MenuItem key={index} value={el._id}>{el.unidad + "(" + el.abr + ")"}</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									required
									fullWidth
									select
									id="empaque"
									label="Empaque"
									margin="normal"
									variant="outlined"
									value={values.empaque}
                                    // onChange={(e) => dispatch({type: 'empaque', value: e.target.value})}
                                    onChange={(e) => handleChange('empaque', e.target.value)}
									>
									{empaques.map((el, index) => (
										<MenuItem key={index} value={el._id}>{el.empaque}</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField
									required
									fullWidth
									id="costo"
									label="Costo"
									type="number"
									margin="normal"
									variant="outlined"
									value={values.costo}
									// onChange={(e) => dispatch({type: 'costo', value: e.target.value})}
									onChange={(e) => handleChange('costo', e.target.value)}
									/>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField
									required
									fullWidth
									id="precio1"
									label="Precio de Lista"
									type="number"
									margin="normal"
									variant="outlined"
									value={values.precio1}
                                    // onChange={(e) => dispatch({type: 'precio1', value: e.target.value})}
                                    onChange={(e) => handleChange('precio1', e.target.value)}
									/>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField
									fullWidth
									id="precio2"
									label="Precio de Mayoreo"
									type="number"
									margin="normal"
									variant="outlined"
									value={values.precio2}
                                    onChange={(e) => handleChange('precio2', e.target.value)}
									/>

							</Grid>
							<Grid item xs={12} md={3}>
								<TextField
									fullWidth
									id="precio3"
									label="Precio Especial"
									type="number"
									margin="normal"
									variant="outlined"
									value={values.precio3}
                                    onChange={(e) => handleChange('precio3', e.target.value)}
									/>
							</Grid>
						</Grid>
						
				</DialogContent>

				<DialogActions>
					<Button className={classes.botonSimplon} onClick={handleClose}>cancelar</Button>
					<Button 
						disabled= {isReady ? false : true}
						className={classes.botonGenerico} onClick={(e) => handleSubmit(e)}>Guardar</Button>
				</DialogActions>

            </Dialog>
    );
}