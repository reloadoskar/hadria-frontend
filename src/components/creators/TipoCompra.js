import React, {useState}from 'react';

// Material UI
import { TextField, Grid, Button, Dialog, Slide, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

//HOOKS

//REDUCER

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function TipoCompra({ creator, open, close, report }) {

	const [tipoCompra, setTipoCompra] = useState({tipo: ""})
    const classes = useStyles()
    const handleSubmit = (event) => {
        event.preventDefault()
        close()
        creator(tipoCompra)
            .then( res => {
                setTipoCompra({tipo: ''})
                report(res.message, res.status)
            })
    }

    const handleChange = (value) => {
        setTipoCompra({tipo: value.toUpperCase()})
    }

    return (
        <div>
            <Dialog maxWidth="md" open={open} onClose={close} TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Nuevo Tipo de Compra</DialogTitle>
                <form onSubmit={handleSubmit}>
				<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoFocus
									required
                                    id="tipo"
                                    label="Tipo de Compra"                                    
                                    fullWidth
                                    margin="normal"
									variant="outlined"
									value={tipoCompra.tipo}
									onChange={(e) => handleChange(e.target.value)}
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
