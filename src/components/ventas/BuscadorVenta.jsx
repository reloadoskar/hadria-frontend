import React, { useState, useContext } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import {VentaContext} from './VentaContext'
import useStyles from '../hooks/useStyles';
import Venta from './Venta';
export default function BuscadorVenta() {
	const { enqueueSnackbar } = useSnackbar()
	const classes = useStyles()
	const {venta, verVenta} = useContext(VentaContext)
	const [buscando, setBuscando] = useState(false)
	const [dialog, setDialog] = useState(false)
	
	const [folio, setFolio] = useState('')
	const showMessage = (text, type) => {
		enqueueSnackbar(
			text,
			{
				variant: type,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if(folio.length > 0){
			setBuscando(true)
			verVenta(folio).then(res => {
				if (res.status === 'success') {
					setDialog(true)
				} else {
					setBuscando(false)
					showMessage(res.message, res.status)
				}
				setBuscando(false)
			})
		}
	}
	return buscando ? <Grid item xs={12}><Typography children="Buscando ... " /></Grid>	:
		<form onSubmit={handleSubmit}>
		<Grid container spacing={2}>
			<Grid item xs={12} sm={8}>
				<TextField
					size="small"
					fullWidth
					id="folio"
					label="Buscar Folio:"
					variant="outlined"
					type="number"
					value={folio}
					onChange={(e) => setFolio(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={2}>
				<Button 					
					className={classes.botonBasico} 
					type="submit" 
					variant="contained" 
					disabled={buscando}>Buscar
				</Button>
			</Grid>
			<Grid item>
				<Venta
					venta={venta}
					open={dialog}
					close={()=>setDialog(false)}
				/>
			</Grid>
		</Grid>
		</form>
}