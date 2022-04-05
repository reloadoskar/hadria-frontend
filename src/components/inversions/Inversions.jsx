import React, { useState, useContext, useEffect } from 'react'
import { Button, TextField, Container, Grid, Typography, Menu, MenuItem, Backdrop, CircularProgress } from '@material-ui/core'
import { InversionContext } from './InversionContext'
import useStyles from '../hooks/useStyles'
import InversionCreate from './InversionCreate'
import Inversion from './Inversion'
import InversionBasic from './InversionBasic'
import { Meses } from '../tools/Meses'
import moment from 'moment'
export default function Inversions() {
  let now = moment()
  const [anchorEl, setAnchorEl] = useState(null)
  const { inversions, inversion, loadInversions, addInversion, setInversions } = useContext(InversionContext)
  const classes = useStyles()

  const [month, setMonth] = useState(now.format("MM"))
  const [year, setYear] = useState(now.format("YYYY"))
  const [verCrearInv, setVerCrear] = useState(false)
  const [verInversion, setVerInv] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const loadAll = async () => {
      const res = await Promise.all([
        loadInversions(month, year)
      ])
      return res
    }
    loadAll().then(() => {
      setIsLoading(false)
      handleClose()
    })
  }, [month, year]) // eslint-disable-line react-hooks/exhaustive-deps

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
  
  return isLoading ?
    <Backdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button className={classes.botonGenerico} onClick={() => openCrearInversion()}>
            + Crear Inversi&oacute;n
          </Button>
          <InversionCreate open={verCrearInv} close={() => setVerCrear(false)} create={addInversion} />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="year"
              select
              value={year}
              fullWidth
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
            </TextField>
            <Button
              fullWidth
              onClick={handleClick}
              className={classes.botonsoteGenerico}
              children={
                Meses.filter(mes => mes.id === month).map(mes => mes.nombre)
              } />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handleClose}
            >
              {Meses.map((mes, i) => (
                <MenuItem onClick={() => onChangeMonth(mes.id)} key={i}>{mes.nombre}</MenuItem>
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
            <InversionBasic data={inversion} key={i} verInversion={() => setVerInv(true)} />
          ))}
        </Grid>
        <Inversion data={inversion} open={verInversion} close={() => setVerInv(false)} />
      </Grid>
    </Container>
}