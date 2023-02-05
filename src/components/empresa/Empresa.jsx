import React from 'react'
import { useContext, useState } from 'react'

import { Card, Input, CardContent, Grid, Typography, IconButton, Paper, Button, Container } from '@material-ui/core'

import { EmpresaContext } from './EmpresaContext'

import useStyles from '../hooks/useStyles'

import EditIcon from '@material-ui/icons/Edit'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close'

import { formatNumber } from '../Tools'
import { planes } from '../empresa/Planes'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
import Plan from './Plan'
export default function Empresa() {
  const { user } = useAuth()
  const { empresa, editEmpresa, crearEmpresa } = useContext(EmpresaContext)
  const [editMode, setEditMode] = useState(false)
  const classes = useStyles()

  const [data, setData] = useState(empresa)

  const handleChange = (type, value) => {
    setData({ ...data, [type]: value })
  }

  const actualizaEmpresa = () => {
    if (!empresa) {
      crearEmpresa(user, data).catch(err => {
        console.log(err)
      })
    }else{
      data._id = empresa._id
      editEmpresa(user, data).then(() => {
        setEditMode(false)
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return !editMode ? !empresa ? null :
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid container spacing={2} className={classes.paperContorno}>
          <Grid item xs={11}><Typography variant="h4">Empresa</Typography> </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" >{empresa.nombre}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >RFC: {empresa.rfc}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >Direcci&oacute;n: {empresa.calle} {empresa.numero}, {empresa.colonia}, {empresa.municipio}, {empresa.estado}, C.P: {empresa.cp}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >Tel&eacute;fono: {empresa.telefono}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >e-mail: {empresa.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Redes sociales:</Typography>
            <IconButton
              disabled={!empresa.facebook ? true : false}
            >
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton
              disabled={!empresa.facebook ? true : false}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container className={classes.paperContorno}>
          <Grid item xs={12}>
            <Typography variant="h4">Plan</Typography>
            {empresa.saldo > 0 ?
              <Paper classes={{ root: classes.suspended }} elevation={2}>
                <Typography variant="h6" align="center">Tiene un saldo de $ {formatNumber(empresa.saldo, 1)}, evite la suspension del servicio.</Typography>
              </Paper>
              : null
            }
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className={classes.textoMirame}>{empresa.plan}</Typography>
            <Typography>Duraci&oacute;n: {empresa.duracion} mes</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Inici&oacute;</Typography>
            <Typography variant="h6">{moment(empresa.fechaInicio).format("DD-MM-YYYY")}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Finaliza</Typography>
            <Typography variant="h6">{moment(empresa.fechaFinal).format("DD-MM-YYYY")}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography align="right">Costo</Typography>
            <Typography align="right">${formatNumber(empresa.costo, 1)} equivalente a:</Typography>
            <Typography align="right" variant="h6" className={classes.textoMirame}>$ {formatNumber((empresa.costo / 12), 1)} MXN / mes*</Typography>
            <Typography align="right" className={classes.textoMiniFacheron}>* precio sujeto a cambios.</Typography>

            {empresa.saldo > 0 ?
              <React.Fragment>
                <Typography align="right">Saldo</Typography>
                <Typography align="right" variant="h6" color="secondary">$ {formatNumber(empresa.saldo, 1)}</Typography>
                <Button
                  className={classes.botonCosmico}
                  fullWidth
                // onClick={()=>setPagar(true)}
                >
                  Pagar ahora
                </Button>
              </React.Fragment>
              : null
            }
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={3}>
          {planes.map((plan, i) => (
            <Plan plan={plan} empresa={empresa} key={i} />
          ))}
        </Grid>
      </Grid>
    </Container>
    :
    <Container>
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <Typography>Informaci&oacute;n de la Empresa:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              name="Nombre"
              fullWidth
              placeholder="Nombre de la Empresa"
              value={data.nombre || ""}
              onChange={(e) => handleChange('nombre', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="rfc"
              fullWidth
              placeholder="RFC (Registro Federal de Contribuyentes)"
              value={data.rfc || ""}
              onChange={(e) => handleChange('rfc', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="calle"
              placeholder="Calle"
              value={data.calle || ""}
              onChange={(e) => handleChange('calle', e.target.value)}
            />
            <Input
              type="number"
              name="numero"
              placeholder="Número"
              value={data.numero || ""}
              onChange={(e) => handleChange('numero', e.target.value)}
            />
            <Input
              name="colonia"
              placeholder="Colonia"
              value={data.colonia || ""}
              onChange={(e) => handleChange('colonia', e.target.value)}
            />
            <Input
              name="municipio"
              placeholder="Municipio/Alcaldia/Localidad"
              value={data.municipio || ""}
              onChange={(e) => handleChange('municipio', e.target.value)}
            />
            <Input
              name="estado"
              placeholder="Estado"
              value={data.estado || ""}
              onChange={(e) => handleChange('estado', e.target.value)}
            />
            <Input
              type="number"
              name="cp"
              placeholder="C&oacute;odigo Postal"
              value={data.cp || ""}
              onChange={(e) => handleChange('cp', e.target.value)}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography>Contacto:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Input
                type="number"
                name="telefono"
                fullWidth
                placeholder="Tel&eacute;fono"
                value={data.telefono || ""}
                onChange={(e) => handleChange('telefono', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="email"
                name="email"
                fullWidth
                placeholder="E-mail"
                value={data.email || ""}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography>Redes Sociales:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Input
                name="facebook"
                fullWidth
                placeholder="Facebook"
                value={data.facebook || ""}
                onChange={(e) => handleChange('facebook', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="instagram"
                fullWidth
                placeholder="Instagram"
                value={data.instagram || ""}
                onChange={(e) => handleChange('instagram', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <IconButton onClick={() => actualizaEmpresa(empresa)}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setEditMode(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Container>

}