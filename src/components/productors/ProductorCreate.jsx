import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, TextField, Button } from '@material-ui/core';
import useStyles from "../hooks/useStyles"
import { useSnackbar } from 'notistack'
import {ProductorContext} from './ProductorContext'
const initProductor = {
  nombre: '',
  clave: '',
  rfc: '',
  direccion: '',
  tel1: '',
  email: '',
  cta1: '0123456789',
  diasDeCredito: 7,
  comision: 10,
}

export default function ProductorCreate({ add, open, close }) {
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
    addProductor(productor).then( res=>{
      showMessage(res.message, res.status)
      setGuardando(false)
      close()
      setProductor(initProductor)
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
          		<Grid item xs={12} md={12}>
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
          				required
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
          				required
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
          				required
          				fullWidth
          				id="email"
          				label="email"
          				type="email"
          				variant="outlined"
          				value={productor.email}
          				onChange={(e) => handleChange('email', e.target.value)}
          				/>
          		</Grid>
          		<Grid item xs={12} md={12}>
          			<TextField
          				required
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