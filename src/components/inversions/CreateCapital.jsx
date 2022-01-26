import React, { useContext, useState } from 'react';
import { Grid, TextField, Dialog, DialogContent, MenuItem, DialogActions, Button, DialogTitle, Typography } from '@material-ui/core';
import useStyles from "../hooks/useStyles"
import { EgresoContext } from "../egresos/EgresoContext"
import moment from 'moment'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';

export default function CreateCapital({ open, close, inversion }) {
  const hoy = moment().format("YYYY-MM-DD")
  const init = {
    compra: 1,
    inversion: inversion,
    ubicacion: "",
    fecha: hoy,
    descripcion: "",
    importe: 0,
    saldo: 0,
    tipoPago: "CAPITAL",
    concepto: "INVERSION",
    tipo: "INVERSION"
  }
  const { addEgreso } = useContext(EgresoContext)
  const { ubicacions } = useContext(UbicacionContext)
  const classes = useStyles()
  const [newCapital, setNewCaptial] = useState(init)
  const [guardando, setGuardando] = useState(false)
  const handleChange = (field, value) => {
    setNewCaptial({ ...newCapital, [field]: value })
  }
  const guardar = () => {
    setGuardando(true)
    addEgreso(newCapital).then(res => {
      close()
      setGuardando(false)
    })
  }

  const handleClose = () => {
    close()
    setNewCaptial(init)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogTitle>Agregar Capital</DialogTitle>
        {guardando ? <Typography variant="h6" align='center'>Guardando...</Typography>
          :
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="fecha"
                  label="Fecha"
                  type="date"
                  fullWidth
                  value={newCapital.fecha}
                  variant="outlined"
                  onChange={(e) => handleChange('fecha', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="ubicacion"
                  required
                  fullWidth
                  label="Ubicacion"
                  select
                  variant="outlined"
                  value={newCapital.ubicacion}
                  onChange={(e) => handleChange('ubicacion', e.target.value)}
                >
                  {ubicacions.map((ubicacion, i) => (
                    <MenuItem value={ubicacion} key={i}>
                      {ubicacion.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="descripcion"
                  fullWidth
                  label="Descripcion"
                  variant="outlined"
                  value={newCapital.descripcion.toUpperCase()}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="importe"
                  type="number"
                  fullWidth
                  label="Importe"
                  variant="outlined"
                  value={newCapital.importe}
                  onChange={(e) => handleChange('importe', e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
        }
      <DialogActions>
        <Button className={classes.botonSimplon} onClick={handleClose} >cancelar</Button>
        <Button className={classes.botonGenerico} onClick={guardar} disabled={guardando}>
          agregar
        </Button>
      </DialogActions>
    </Dialog>
  )
}