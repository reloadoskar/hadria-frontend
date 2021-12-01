import React, { useContext, useState } from 'react';
import { Grid, TextField, Dialog, DialogContent, MenuItem, DialogActions, Button } from '@material-ui/core';
import useUbicacions from "../ubicaciones/useUbicacions"
import useStyles from "../hooks/useStyles"
import { EgresoContext } from "../egresos/EgresoContext"
import moment from 'moment'
export default function CreateCapital({ open, close, inversion }) {
  const hoy = moment().format("YYYY-MM-DD")
  const { addEgreso } = useContext(EgresoContext)
  const { ubicacions } = useUbicacions()
  const classes = useStyles()
  const [newCapital, setNewCaptial] = useState({
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
  })
  const handleChange = (field, value) => {
    setNewCaptial({ ...newCapital, [field]: value })
  }
  const guardar = () => {
    addEgreso(newCapital).then(res => {
      close()
    })
  }
  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="md"
    >
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
              value={newCapital.descripcion}
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
      <DialogActions>
        <Button className={classes.botonSimplon} onClick={close}>cancelar</Button>
        <Button className={classes.botonGenerico} onClick={guardar} >
          agregar
        </Button>
      </DialogActions>
    </Dialog>
  )
}