import React, {useState}from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Grid, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//HOOKS
import useUnidades from '../hooks/useUnidades'
import useEmpaques from '../hooks/useEmpaques'

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
		background: '#1E2F23',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

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

export default function CrearProducto({ addProducto, isShowing, close, search }) {
	const {unidades} = useUnidades()
	const {empaques} = useEmpaques()
    const classes = useStyles();
    const [values, setValues] = useState(initialState)

    const handleChange = (field, value) => {
        var busqueda = ''
        switch (field){
            case 'descripcion':
                var desc = value
                busqueda = search('descripcion', value.toUpperCase())
                if(busqueda.length > 1){
                    // console.log(busqueda)
                    return setValues({
                        ...values, 
                        [field]: desc.toUpperCase(),
                        existeDescripcion: false
                    })
                }
                if(busqueda.length === 1){
                    return setValues({...values, 
                        [field]: desc.toUpperCase(),
                        existeDescripcion: true})
                }
                if(busqueda.length === 0){
                    return setValues({...values, 
                        [field]: desc.toUpperCase(),
                        existeDescripcion: false
                        })
                }
                break;
                
            case 'clave':
                var clave = value
                busqueda = search('clave', value.toUpperCase())
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
            default:
                return setValues({...values, [field]: value})
        }
    }
        
    
    const handleSubmit = (event) => {
        event.preventDefault()
		addProducto(values)
		handleChange('reset')
	}
	
	const handleClose = () => {
		handleChange('reset')
		close()
	}

    return (
        <div>
            
            <Dialog fullScreen open={isShowing} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Producto
            			</Typography>
                        <Button color="inherit" onClick={handleClose}>
                            Salir
            			</Button>
                    </Toolbar>
                </AppBar>
				
				<Container>
                	<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoFocus
									required
									id="descripcion"
									label="Descripción"
									helperText={values.existeDescripcion ? "Ya existe el producto" : "Descripción del producto"}
                                    fullWidth
                                    error={values.existeDescripcion}
									margin="normal"
									variant="outlined"
									value={values.descripcion}
									// onChange={(e) => dispatch({type: 'descripcion', value: e.target.value})}
									onChange={(e) => handleChange('descripcion', e.target.value)}
									/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
                                    required
                                    error={values.existeClave}
									id="clave"
									label="Clave"
									helperText="Clave de producto, máximo 4 caracteres."
									fullWidth
									margin="normal"
									variant="outlined"
									value={values.clave}
                                    // onChange={(e) => dispatch({type: 'clave', value: e.target.value})}
                                    onChange={(e) => handleChange('clave', e.target.value)}
									/>
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									required
									fullWidth
									select
									id="unidad"
									label="Unidad"
									helperText="Unidad de compra del producto."
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
							<Grid item xs={6} md={4}>
								<TextField
									required
									fullWidth
									select
									id="empaque"
									label="Empaque"
									helperText="Empaque del producto."
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
							<Grid item xs={6} md={3}>
								<TextField
									required
									fullWidth
									id="costo"
									label="Costo"
									type="number"
									helperText="Costo del producto."
									margin="normal"
									variant="outlined"
									value={values.costo}
									// onChange={(e) => dispatch({type: 'costo', value: e.target.value})}
									onChange={(e) => handleChange('costo', e.target.value)}
									/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									fullWidth
									id="precio1"
									label="Precio de Lista"
									type="number"
									helperText="Precio de lista."
									margin="normal"
									variant="outlined"
									value={values.precio1}
                                    // onChange={(e) => dispatch({type: 'precio1', value: e.target.value})}
                                    onChange={(e) => handleChange('precio1', e.target.value)}
									/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									id="precio2"
									label="Precio de Mayoreo"
									type="number"
									helperText="Precio de Mayoreo."
									margin="normal"
									variant="outlined"
									value={values.precio2}
                                    // onChange={(e) => dispatch({type: 'precio2', value: e.target.value})}
                                    onChange={(e) => handleChange('precio2', e.target.value)}
									/>

							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									id="precio3"
									label="Precio Especial"
									type="number"
									helperText="Precio especial para clientes especiales."
									margin="normal"
									variant="outlined"
									value={values.precio3}
                                    // onChange={(e) => dispatch({type: 'precio3', value: e.target.value})}
                                    onChange={(e) => handleChange('precio3', e.target.value)}
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