import React, {useState}from 'react';

// Material UI
import { TextField, Grid, Button, Dialog, Slide, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

//HOOKS

//REDUCER

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function TipoCompra({ creator, open, close, report }) {

	const [tipoCompra, setTipoCompra] = useState({tipo:''})

    const handleSubmit = (event) => {
        event.preventDefault()
        creator(tipoCompra)
            .then( res => {
                console.log(res)
                setTipoCompra('')
                report(res.message, res.status)
                close()
            })
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
									onChange={(e) => setTipoCompra({tipo: e.target.value})}
									/>
							</Grid>							
							
						</Grid>
						

                </DialogContent>
                <DialogActions>
                    <Button onClick={close} variant="contained" color="secondary" >Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary" >Guardar</Button>
                </DialogActions>
                </form>
				
				

            </Dialog>
        </div>
    );
}
