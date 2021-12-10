import React, { useState, useEffect, useContext } from 'react'
import { Button, Container, Grid, Typography, Menu, MenuItem } from '@material-ui/core'
import { InversionContext } from './InversionContext'
import { useSnackbar } from 'notistack'
import useStyles from '../hooks/useStyles'
import moment from 'moment'
import InversionsList from './InversionsList'
import InversionCreate from './InversionCreate'
import Inversion from './Inversion'
import InversionBasic from './InversionBasic'

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
  let now = new Date()
  const [anchorEl, setAnchorEl] = useState(null)
  const { inversions, inversion, loadInversions, addInversion, removeInversion, setInversions } = useContext(InversionContext)
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const classes = useStyles()

  const [month, setMonth] = useState(now.getMonth() + 1)
  const [verCrearInv, setVerCrear] = useState(false)
  const [verInversion, setVerInv] = useState(false)

  useEffect(() => {
    loadInversions(month)
  }, [month])

  const openCrearInversion = () => {
    setVerCrear(true)
  }

  const onChangeMonth = (mes) => {
    setInversions([])
    setMonth(mes)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChange = (mes) => {
    onChangeMonth(mes)
    handleClose()
  }
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}><Typography variant="h6" align="center">Inversiones</Typography></Grid>
        <Grid item xs={12}>
          <Button className={classes.botonGenerico} onClick={() => openCrearInversion()}>
            + Crear Inversi&oacute;n
          </Button>
          <InversionCreate open={verCrearInv} close={() => setVerCrear(false)} create={addInversion} />
        </Grid>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              onClick={handleClick}
              className={classes.botonsoteGenerico}
              children={
                meses[month]
              }
            />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              onClose={handleClose}
            >
              {meses.map((mes, i) => (
                <MenuItem onClick={() => handleChange(i)} key={i} children={mes} />
              ))}
            </Menu>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Typography variant="h2" align="center">{inversions ? inversions.length : null}</Typography>
            <Typography align="center">Inversiones</Typography>
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={1}></Grid>
          {inversions.map((inversion, i) => (
            <InversionBasic data={inversion} key={i} verInversion={()=>setVerInv(true)} />
          ))}
        </Grid>
          <Inversion data={inversion} open={verInversion} close={()=>setVerInv(false)}/>
      </Grid>
    </Container>
  )
}