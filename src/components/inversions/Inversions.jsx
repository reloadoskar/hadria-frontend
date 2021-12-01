import React, { useState, useEffect, useContext } from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { InversionContext } from './InversionContext'
import { useSnackbar } from 'notistack'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import InversionsList from './InversionsList'
import InversionCreate from './InversionCreate'
import Inversion from './Inversion'

var meses = []
meses[0] = "";
meses[1] = "Enero";
meses[2] = "Febrero";
meses[3] = "Marzo";
meses[4] = "Abril";
meses[5] = "Mayo";
meses[6] = "Junio";
meses[7] = "Julio";
meses[8] = "Agosto";
meses[9] = "Septiembre";
meses[10] = "Octubre";
meses[11] = "Noviembre";
meses[12] = "Diciembre";

export default function Inversions(props) {
  const { inversions, inversion, loadInversions, addInversion, removeInversion } = useContext(InversionContext)
  const [crearInversion, setCrearInversion] = useState(false)
  let now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  useEffect(() => {
    loadInversions(month)
  }, [month])
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const openCrearInversion = () => {
    setCrearInversion(true)
  }
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}><Typography variant="h6" align="center">Inversiones</Typography></Grid>
        <Grid item xs={12}>
          <Button className={classes.botonGenerico} onClick={() => openCrearInversion()}>
            + Crear Inversi&oacute;n
          </Button>
          <InversionCreate open={crearInversion} close={() => setCrearInversion(false)} create={addInversion} />
        </Grid>
        <Grid item xs={12}>
          <InversionsList inversions={inversions} meses={meses} mes={month} />
        </Grid>
      </Grid>
    </Container>
  )
}