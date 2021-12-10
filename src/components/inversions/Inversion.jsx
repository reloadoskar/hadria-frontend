import React, { useState, useContext, useEffect } from 'react';
import { InversionContext } from './InversionContext'
import { EgresoContext } from "../egresos/EgresoContext"
import { useSnackbar } from 'notistack'
import { Card, Slide, CardContent, Dialog, Grid, Typography, Badge, IconButton, Button, Collapse, DialogContent, TextField, ClickAwayListener, Box, Menu, MenuItem, Container } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useStyles from '../hooks/useStyles';
import EgresoBasic from '../egresos/EgresoBasic'
import CreateCapital from './CreateCapital';
import { formatNumber, sumImporte } from '../Tools';
import EgresosList from '../egresos/EgresosList';
import CountUpAnimation from '../tools/CountUpAnimation'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Inversion({ data, open, close }) {
  const { removeInversion, selectInversion } = useContext(InversionContext)
  const { egresos, setEgresos } = useContext(EgresoContext)
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl)

  const [inversion, setInversion] = useState(null)
  const [totalInvertido, setTotalInv] = useState(0)
  const [totalVenta, setTotalVenta] = useState(0)
  const [resultado, setResultado] = useState(0)

  const [verAddCapital, setVerAdd] = useState(false)
  const [verMas, setVerMas] = useState(false)

  useEffect(() => {
    if (data) {
      setInversion(data)
      setEgresos(data.gastos)
    }
    return () => limpiarComponente(null)
  }, [data])
  
  useEffect(() => {
    if(egresos){
      let ti = sumImporte(egresos)
      setTotalInv(ti)
      let re = totalVenta - ti
      setResultado(re)
    }
    return () => {
      
    }
  }, [egresos])

  useEffect(() => {
    if(!open){
      selectInversion(null)
    }
    return () => {
      limpiarComponente()
    }
  }, [open])

  const limpiarComponente = () => {
    setInversion(null)
    setResultado(0)
    setTotalVenta(0)
    setTotalInv(0)
  }

  const cancelarInversion = (id) => {
    removeInversion(id).then(res => {
      showMessage(res.message, res.status)
    })
  }
  const handleClick = () => {
    setVerMas(!verMas)
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const closeDialog = () => {
    close()
    handleClose()
  }

  const showAddCap = () => {
    setVerAdd(true)
    handleClose()
  }
  return !inversion ? null :
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={open}
      onClose={close}
    >
        <Box
          className={classes.inversionsBar} >
          <Grid container spacing={2} className={classes.center} alignItems="center">
            <Grid item xs>
              <Typography variant="h6">Inversi&oacute;n</Typography>
            </Grid>
            <Grid item xs={4} >
              <div>
                <Grid container spacing={2} alignItems="center" justifyContent='flex-end'>
                  <Grid item>
                    <Button
                      color='inherit'
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </Button>
                    <Menu
                      id="menu-inversion"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={showAddCap}>Agregar Capital</MenuItem>
                        <MenuItem>Importar Compra</MenuItem>
                        <MenuItem onClick={closeDialog}>Salir</MenuItem>
                      </Menu>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Box>
      <DialogContent>
        <Container maxWidth="lg">
        <Grid item container xs={12} >
          <Grid item xs={1} sm={1}>
            <Typography className={classes.textoMirame} variant="h6">{inversion.folio}</Typography>
          </Grid>
          <Grid item xs={9} sm={6}>
            <Typography variant="h6">{inversion.provedor.nombre}</Typography>
            <Typography className={classes.textoMirame}>{inversion.fecha}</Typography>
            <Typography className={classes.textoMiniFacheron} >{inversion.descripcion}</Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography >{inversion.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography align="right" >INVERTIDO</Typography>
            <CountUpAnimation num={totalInvertido} temp={1000}/>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography align="right" >RESULTADO</Typography>
            <CountUpAnimation num={resultado} temp={1200} />
          </Grid>          
          <Grid item xs={12}>
            <Card classes={{ root: classes.paperGris }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">CAPITAL INVERTIDO</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {egresos.length > 0 ?
                      egresos.map((egreso, i) => (
                        <EgresoBasic data={egreso} key={i} />
                      ))
                      : <Typography>No se encontraron datos</Typography>}
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <CreateCapital open={verAddCapital} close={() => setVerAdd(false)} inversion={inversion._id} />
        </Container>
      </DialogContent>
    </Dialog>
}