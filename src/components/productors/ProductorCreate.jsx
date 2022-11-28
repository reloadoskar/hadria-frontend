import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, TextField, Button, MenuItem } from '@material-ui/core';
import useStyles from "../hooks/useStyles"
import { useSnackbar } from 'notistack'
import {ProductorContext} from './ProductorContext'
import {generadorDeClaves} from '../Tools'
import { useAuth } from '../auth/use_auth';
const initProductor = {
  nombre: '',
  sexo: "H",
  clave: generadorDeClaves(5),
  rfc: '',
  direccion: '',
  tel1: '',
  email: '',
  cta1: '0123456789',
  diasDeCredito: 7,
  comision: 10,
  ref: ''
}

export default function ProductorCreate({ open, close }) {
	const {user} = useAuth()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const {addProductor} = useContext(ProductorContext)
  const [productor, setProductor] = useState(initProductor)
  const [guardando, setGuardando] = useState(false)
  const handleChange = (field, value) => {
    setProductor({...productor, [field]: value.toUpperCase() || value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setGuardando(true)
    addProductor(user, productor).then( res=>{
      showMessage(res.message, res.status)
      setGuardando(false)
      close()
      setProductor(initProductor)
    })
	.catch(err=>{
		showMessage(err.message, "error")
		setGuardando(false)
	})
  }
  return (
    <Dialog fullWidth open={open} onClose={close} maxWidth="md">
      <DialogTitle>Nuevo Productor</DialogTitle>
      <form onSubmit={handleSubmit}>
        { guardando === true ?
          <Typography variant="h5" align="center">Guardando...</Typography>
        :
          <DialogContent>
          	<Grid container spacing={2}>
          		<Grid item xs={10} md={10}>
          			<TextField
          				autoFocus
          				required
          				id="nombre"
          				label="Nombre del Productor"
          				fullWidth
          				variant="outlined"
          				value={productor.nombre}
          				onChange={(e) => handleChange('nombre', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={2} md={2}>
          			<TextField          				
						required
						select
          				id="sexo"
          				label="Sexo"
          				fullWidth
          				variant="outlined"
          				value={productor.sexo}
          				onChange={(e) => handleChange('sexo', e.target.value)}
          				>
						<MenuItem value="H">Hombre</MenuItem>
						<MenuItem value="M">Mujer</MenuItem>
						<MenuItem value="O">LGBT+</MenuItem>
					</TextField>
          		</Grid>
          		<Grid item xs={12}>
          			<TextField
          				id="ref"
          				label="Referencia"
          				fullWidth
          				variant="outlined"
          				value={productor.ref}
          				onChange={(e) => handleChange('ref',e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				required
          				id="clave"
          				label="Clave de Productor"
          				fullWidth
          				variant="outlined"
          				value={productor.clave.substring(0,4)}
          				onChange={(e) => handleChange('clave',e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				id="rfc"
          				label="RFC"
          				fullWidth
          				variant="outlined"
          				value={productor.rfc}
          				onChange={(e) => handleChange('rfc', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={12}>
          			<TextField
          				fullWidth
          				id="direccion"
          				label="Dirección"
          				variant="outlined"
          				value={productor.direccion}
          				onChange={(e) => handleChange('direccion',e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				fullWidth
          				id="tel1"
          				label="Teléfono"
          				type="number"
          				variant="outlined"
          				value={productor.tel1}
          				onChange={(e) => handleChange('tel1', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				fullWidth
          				id="email"
          				label="email"
          				type="email"
          				variant="outlined"
          				value={productor.email}
          				onChange={(e) => handleChange('email', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				fullWidth
          				id="banco1"
          				label="Banco"
          				variant="outlined"
          				value={productor.banco1}
          				onChange={(e) => handleChange('banco1', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				fullWidth
          				id="cta1"
          				label="Cuenta Bancaria"
          				type="number"
          				variant="outlined"
          				value={productor.cta1}
          				onChange={(e) => handleChange('cta1', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				required
          				fullWidth
          				id="diasDeCredito"
          				label="Días de Crédito"
          				variant="outlined"
          				value={productor.diasDeCredito}
          				onChange={(e) => handleChange('diasDeCredito', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={6}>
          			<TextField
          				required
          				fullWidth
          				id="comision"
          				label="Comisión de Servicio"
          				type="number"
          				variant="outlined"
          				value={productor.comision}
          				onChange={(e) => handleChange('comision', e.target.value)}
          				/>
          		</Grid>
          	</Grid>

          </DialogContent>
        }
        <DialogActions>
          	<Button className={classes.botonSimplon} onClick={close}>Cancelar</Button>
			<Button className={classes.botonGenerico} type="submit">Guardar</Button>
        </DialogActions>
      </form>

    </Dialog>

  )
}