import React, { useEffect } from 'react'
import { useContext, useState } from 'react'

import { Card, Input, CardContent, Grid, Typography, IconButton, Paper, Button, List, ListItem, ListItemIcon, ListItemText, Container } from '@material-ui/core'

import { EmpresaContext } from './EmpresaContext'

import useStyles from '../hooks/useStyles'

import EditIcon from '@material-ui/icons/Edit'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close'

import {formatNumber} from '../Tools'
import {planes} from '../empresa/Planes'
import moment from 'moment'
export default function Empresa(){
    const {editEmpresa, loadEmpresa} = useContext(EmpresaContext)
    const [empresa, setEmpresa] = useState()
    const [editMode, setEditMode] = useState(false)
    const classes = useStyles()
    
    // const [pagarAhora, setPagar] = useState(false)

    useEffect(()=>{
        loadEmpresa().then(res=>{
            setEmpresa(res.empresa)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (type, value) =>{
        switch (type){
            default:
                setEmpresa({...empresa, [type]: value})
                break
        }
    }

    const actualizaEmpresa = () => {
        editEmpresa(empresa).then(() => {
          setEditMode(false)
        })
    }

    return !empresa ? null : !editMode ? 
        <Container maxWidth="md">
            <Grid container spacing ={2}>
            <Grid container spacing={2} className={classes.paperContorno}>
                <Grid item xs={11}><Typography variant="h4">Empresa</Typography> </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={()=> setEditMode(true)}>
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
                        <FacebookIcon fontSize="large"/>
                    </IconButton>
                    <IconButton 
                        disabled={!empresa.facebook ? true : false}
                    >
                        <InstagramIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container className={classes.paperContorno}>
                <Grid item xs={12}>
                    <Typography variant="h4">Plan</Typography>
                    {empresa.saldo > 0 ? 
                        <Paper classes={{root: classes.suspended}} elevation={2}>
                            <Typography variant="h6" align="center">Tiene un saldo de $ {formatNumber(empresa.saldo,1)}, evite la suspension del servicio.</Typography>
                        </Paper>
                        : null
                    }
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" className={classes.textoMirame}>{empresa.plan}</Typography>
                    <Typography>Duraci&oacute;n: {empresa.duracion} años</Typography>
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
                    <Typography align="right">${ formatNumber(empresa.costo,1)} equivalente a:</Typography>                              
                    <Typography align="right" variant="h6" className={classes.textoMirame}>$ {formatNumber( (empresa.costo / 12),1)} MXN / mes*</Typography>
                    <Typography align="right" className={classes.textoMiniFacheron}>* precio sujeto a cambios.</Typography>

                    {empresa.saldo>0?
                        <React.Fragment>
                            <Typography align="right">Saldo</Typography>
                            <Typography align="right" variant="h6" color="secondary">$ {formatNumber(empresa.saldo,1)}</Typography>
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
                {planes.map((plan,i) => (
                    <Grid item container xs={4} key={i} >
                        <Paper classes={{root: classes.paperContorno}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    { empresa.plan === plan.nombre ?
                                        <Typography className={classes.textoMiniFacheron} align="center">Plan Actual</Typography>
                                        : null
                                    }
                                    <Typography 
                                        // className={classes.textoMirame} 
                                        className={
                                            empresa.plan === plan.nombre ? classes.textoSubrayado : classes.textoMirame
                                        } 
                                        align="center" variant="h6">
                                        {plan.nombre}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="center" > $ {formatNumber(plan.precio,2)} equivalente a</Typography>
                                    <Typography align="center" variant="h6" className={classes.textoMirame}>$ {formatNumber( (plan.precio / 12),1)} MXN / mes*</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <List>
                                    {plan.caracteristicas.map((el, i) => (
                                            <ListItem key={i}>
                                                <ListItemIcon>
                                                    <ArrowRightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={el}></ListItemText>
                                            </ListItem>
                                    ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
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
                                    value={empresa.nombre}
                                    onChange={(e)=> handleChange('nombre', e.target.value)}
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                <Input 
                                    name="rfc"
                                    fullWidth
                                    placeholder="RFC (Registro Federal de Contribuyentes)"
                                    value={empresa.rfc}
                                    onChange={(e)=> handleChange('rfc', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input 
                                    name="calle"
                                    placeholder="Calle"
                                    value={empresa.calle}
                                    onChange={(e)=> handleChange('calle', e.target.value)}
                                />
                                <Input 
                                    type="number"
                                    name="numero"
                                    placeholder="Número"
                                    value={empresa.numero}
                                    onChange={(e)=> handleChange('numero', e.target.value)}
                                />
                                <Input 
                                    name="colonia"
                                    placeholder="Colonia"
                                    value={empresa.colonia}
                                    onChange={(e)=> handleChange('colonia', e.target.value)}
                                />
                                <Input 
                                    name="municipio"
                                    placeholder="Municipio/Alcaldia/Localidad"
                                    value={empresa.municipio}
                                    onChange={(e)=> handleChange('municipio', e.target.value)}
                                />
                                <Input 
                                    name="estado"
                                    placeholder="Estado"
                                    value={empresa.estado}
                                    onChange={(e)=> handleChange('estado', e.target.value)}
                                />
                                <Input 
                                    type="number"
                                    name="cp"
                                    placeholder="C&oacute;odigo Postal"
                                    value={empresa.cp}
                                    onChange={(e)=> handleChange('cp', e.target.value)}
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
                                        value={empresa.telefono}
                                        onChange={(e)=> handleChange('telefono', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input 
                                        type="email"
                                        name="email"
                                        fullWidth
                                        placeholder="E-mail"
                                        value={empresa.email}
                                        onChange={(e)=> handleChange('email', e.target.value)}
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
                                        value={empresa.facebook}
                                        onChange={(e)=> handleChange('facebook', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input 
                                        name="instagram"
                                        fullWidth
                                        placeholder="Instagram"
                                        value={empresa.instagram}
                                        onChange={(e)=> handleChange('instagram', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <IconButton onClick={()=>actualizaEmpresa(empresa)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={()=>setEditMode(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                </CardContent>
            </Card>
        </Container>

}