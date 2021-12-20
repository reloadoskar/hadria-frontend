import React, { useState, useContext } from 'react'
import { Button, Container, Grid, Typography, Menu, MenuItem } from '@material-ui/core'
import { InversionContext } from './InversionContext'
import { useSnackbar } from 'notistack'
import useStyles from '../hooks/useStyles'
import InversionCreate from './InversionCreate'
import Inversion from './Inversion'
import InversionBasic from './InversionBasic'
import { Meses } from '../tools/Meses'

export default function Inversions(props) {
  let now = new Date()
  const [anchorEl, setAnchorEl] = useState(null)
  const { inversions, inversion, loadInversions, addInversion, setInversions } = useContext(InversionContext)
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const classes = useStyles()

  const [month, setMonth] = useState(now.getMonth() + 1)
  const [verCrearInv, setVerCrear] = useState(false)
  const [verInversion, setVerInv] = useState(false)

  const openCrearInversion = () => {
    setVerCrear(true)
  }

  const onChangeMonth = (mes) => {
    setInversions([])
    setMonth(mes)
    loadInversions(mes)
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
                Meses[month]
              }
            />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              onClose={handleClose}
            >
              {Meses.map((mes, i) => (
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