import React, { useState, useContext, useEffect } from 'react';
import { InversionContext  } from './InversionContext'
import { useSnackbar } from 'notistack'
import { Card, CardContent, Dialog, Grid, Typography, Badge, IconButton, Button, Collapse, DialogContent, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useStyles from '../hooks/useStyles';
import EgresoBasic from '../egresos/EgresoBasic'
import CreateCapital from './CreateCapital';
import { formatNumber, sumImporte } from '../Tools';
export default function Inversion({inversion, open}){
    const [verAddCapital, setVerAdd] = useState(false)
    const {removeInversion} = useContext(InversionContext)
    const [verInversion, setVerInversion] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }    
    const classes = useStyles()

    const [totalInvertido, setTotalInv] = useState(0)
    const [totalVenta, setTotalVenta] = useState(0)
    const [resultado, setResultado] = useState(0)

    useEffect(()=>{
        if(inversion){
            let ti = sumImporte(inversion.gastos)
            setTotalInv(ti)
            let re = totalVenta - ti
            setResultado(re)
        }
    },[inversion])
    
    const cancelarInversion = (id) => {
        removeInversion(id).then(res=>{
            showMessage(res.message, res.status)
        })
    }
    const agregarCapital = () => {

    }
    const handleClick = () => {
        setVerInversion(!verInversion)
    }
    return !inversion ? null :
        <Grid item xs={12} sm={12}>
        <Card>
            <CardContent>
            <Grid item container xs={12} >
                <Grid item xs={3} sm={1}>
                    <Typography className={classes.textoMiniFacheron}>{inversion.fecha}</Typography>
                    <Typography className={classes.textoMirame}>{inversion.folio}</Typography>
                </Grid>
                <Grid item xs={9} sm={6}>
                    <Typography >{inversion.provedor.nombre}</Typography>
                    <Typography className={classes.textoMiniFacheron} >{inversion.descripcion}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography >{inversion.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography align="right" className={classes.textoMiniFacheron}>INVERTIDO</Typography>
                    <Typography align="right" >${formatNumber(totalInvertido)}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography align="right" className={classes.textoMiniFacheron}>RESULTADO</Typography>
                    <Typography align="right" >${formatNumber(resultado)}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography align='right'>
                        <Badge variant="dot" color="secondary">
                            <IconButton onClick={handleClick}>
                                <VisibilityIcon />
                            </IconButton>
                        </Badge>
                        <IconButton onClick={()=>cancelarInversion(inversion._id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Typography>
                </Grid>
                {verInversion ? 
                        <Grid item xs={12}>
                    <Collapse in={verInversion} >
                        <Card classes={{root: classes.paperGris}}>
                            <CardContent>
                                <Grid container spacing ={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">CAPITAL INVERTIDO</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">
                                            <IconButton onClick={()=>setVerAdd(true)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Typography>

                                        <CreateCapital open={verAddCapital} close={()=>setVerAdd(false)} inversion={inversion._id} />

                                    </Grid>
                                    <Grid item xs={12}>
                                    {inversion.gastos.length > 0 ?
                                        inversion.gastos.map((gasto, i)=>(
                                            <EgresoBasic egreso={gasto} key={i} />
                                        ))
                                    : <Typography>No se encontraron datos</Typography>}
                                    </Grid>
                                    <Grid item xs={12}></Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Collapse>
                        </Grid>
                : null}
            </Grid>
            </CardContent>
        </Card>
        </Grid>
}