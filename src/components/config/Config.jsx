import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, IconButton, Input, Paper, Button, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import useEmpresa from './useEmpresa'
import {formatNumber, sumImporte} from '../Tools'
import useStyles from '../hooks/useStyles';
import PagarAhora from './PagarAhora';
export default function Config(){
    const Empresa = useEmpresa()
    const [pagarAhora, setPagar] = useState(false)
    const classes = useStyles()
    const [empresa, setEmpresa] = useState({
        nombre:'',
        rfc: '',
        pagos: []

    })
    const [editMode, setEditmode] = useState(false)

    useEffect(()=>{
        Empresa.get().then( resp => {
            setEmpresa(resp.empresa)
        })
    },[])

    const handleChange = (field, value) => {
        setEmpresa({...empresa, [field]: value})
    }

    const updateEmpresa = (empresa) => {
        Empresa.update(empresa).then(resp =>{
            setEditmode(false)
        })
    }

    return (
        <Container maxWidth="md">
            <Grid container >

                    {editMode || !empresa ? 
                        <React.Fragment>
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
                                <IconButton onClick={()=>updateEmpresa(empresa)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={()=>setEditmode(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Grid item xs={11}><Typography variant="h4">Empresa</Typography> </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={()=> setEditmode(true)}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Divider />
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
                            <Divider />
                            <Grid tem xs={12}>
                                <Typography variant="h4">Plan</Typography>
                                {empresa.saldo > 0 ? 
                                    <Paper classes={{root: classes.suspended}} elevation={2}>
                                        <Typography variant="h6" align="center">Tiene un saldo de $ {formatNumber(empresa.saldo,1)}, evite la suspension del servicio.</Typography>
                                    </Paper>
                                    : null
                                }
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">{empresa.plan}</Typography>
                                <Typography>Duraci&oacute;n: {empresa.duracion} años</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>Inici&oacute;</Typography>
                                <Typography variant="h6">{empresa.fechaInicio}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>Finaliza</Typography>
                                <Typography variant="h6">{empresa.fechaFinal}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align="right">Costo</Typography>                                
                                <Typography align="right" variant="h6">$ {formatNumber(empresa.costo,1)}</Typography>
                                {empresa.saldo>0?
                                    <React.Fragment>
                                        <Typography align="right">Saldo</Typography>
                                        <Typography align="right" variant="h6" color="secondary">$ {formatNumber(empresa.saldo,1)}</Typography>
                                        <Button 
                                            className={classes.botonCosmico}
                                            fullWidth
                                            onClick={()=>setPagar(true)}
                                            >
                                            Pagar ahora
                                        </Button>
                                    </React.Fragment>
                                    : null
                                }
                            </Grid>
                            {empresa.pagos.length > 0 ?
                                <Grid item container xs={12}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Pagos</Typography>
                                    </Grid>
                                    {empresa.pagos.map((pago, i) =>(
                                        <React.Fragment key={i}>
                                            <Grid item xs={2} >
                                                <Typography>{pago.fecha}</Typography>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Typography>{pago.descripcion}</Typography>
                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography align="right">$ { formatNumber(pago.importe,1)}</Typography>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    <Grid item xs={12}>
                                        <Typography align="right">$ {formatNumber(sumImporte(empresa.pagos),1)}</Typography>
                                    </Grid>
                                </Grid>
                                : null
                            }

                        </React.Fragment>                        
                    }   

            </Grid>
            <PagarAhora open={pagarAhora} close={()=>setPagar(false)}/>
        </Container>
    )
}