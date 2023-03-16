import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, MenuItem, Switch, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import { useEmpleados } from '../empleados/EmpleadoContext'
import { useInventario } from './InventarioContext'
import { useAuth } from '../auth/use_auth'
export default function SurtirCambio({open, close, cambio, inventario}){
    const {user} = useAuth()
    const {empleados} = useEmpleados()
    const {surtirCambio} = useInventario()

    const { enqueueSnackbar } = useSnackbar()
	const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const [ubicacion, setUbic] = useState("")
    const [compraItem, setCompraItem] = useState("")
    const [pesob, setPesob] = useState(0)
    const [tara, setTara] = useState(0)
    const [peson, setPeson] = useState(0)
    const [empleado, setEmpleado] = useState("")
    const [descontarInventario, setDesc] = useState(false)
    
    const [surtiendo, setSurtiendo] = useState(false)

    useEffect(()=>{
        if(pesob>0){
            setPeson(pesob-tara)
        }
    },[pesob, tara])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setSurtiendo(true)
        console.info("surtiendo...")
        cambio.respuesta = {
            fecha: Date(),
            ubicacion: ubicacion.ubicacion,
            compraItem: compraItem,
            pesob: pesob,
            tara: tara,
            peson: peson,
            empleado: empleado,
            descontarInventario: descontarInventario
        }
        cambio.status="ENVIANDO"
        // console.log(respuesta)

        surtirCambio(user, cambio).then(res=>{
            setSurtiendo(false)
            showMessage(res.message,res.status)
            handleClose()
        }).catch(err=>{
            setSurtiendo(false)
            showMessage(err.message,"error")
        })
    }

    const handleClose = () => {
        close()
        setUbic("")
        setCompraItem("")
        setPesob(0)
        setTara(0)
        setPeson(0)
        setEmpleado("")
        setDesc(false)
    }
    return !cambio ? null :
        <Dialog 
            fullWidth
            maxWidth='xs'
            open={open} 
            onClose={close}
            >
            {surtiendo? <Typography variant='h5' align='center'>Surtiendo...</Typography> :
                <form onSubmit={handleSubmit}>
            <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Typography variant='h6'>
                                Surtir {cambio.piezas} pzs desde:
                            </Typography> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="ubicacion" 
                                label="Selecciona origen"
                                value={ubicacion}
                                onChange={(e)=>setUbic(e.target.value)}
                                select
                                fullWidth
                                >
                                {inventario.map((el,i)=>(
                                    <MenuItem value={el} key={i}>{el.ubicacion.nombre}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        { !ubicacion ? null :
                            <Grid item xs={12}>
                                <TextField
                                required
                                    id="compraItem" 
                                    label="Selecciona producto"
                                    value={compraItem}
                                    onChange={(e)=>setCompraItem(e.target.value)}
                                    select
                                    fullWidth>
                                    {ubicacion.items.map((el,i)=>(
                                        <MenuItem key={i} value={el}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <Typography>{el.compra.folio} - {el.producto.descripcion} {el.clasificacion}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography align="right">{el.empaquesStock} / {el.stock.toFixed(2)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        }

                        { !compraItem ? null : 
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <TextField 
                                        id='pesob'
                                        label='Peso bruto'
                                        inputProps={{ type: "number", min: 0, max: 999, step:"any" }}
                                        value={pesob}
                                        onChange={(e)=>setPesob(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField 
                                        id='tara'
                                        label='Tara'
                                        inputProps={{ type: "number", min: 0, max: 999, step:"any" }}
                                        value={tara}
                                        onChange={(e)=>setTara(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField

                                        id='neto'
                                        label='Peso Neto'
                                        inputProps={{ type: "number", min: 0, max: 999, step:"any", readOnly: true }}
                                        value={peson}
                                        onChange={(e)=>setPeson(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                    required
                                        id='repartidor'
                                        fullWidth
                                        label='Selecciona empleado repartidor'
                                        select
                                        value={empleado}
                                        onChange={(e)=>setEmpleado(e.target.value)}
                                    >
                                        {!empleados ? null :
                                            empleados.map((el,i)=>(
                                                <MenuItem key={i} value={el}>{el.nombre}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Switch disabled={peson===0?true:false} size="medium" checked={descontarInventario} onChange={()=>setDesc(!descontarInventario)} />}
                                        label="Descontar de inventario."
                                    />
                                </Grid>
                                
                            </React.Fragment>
                        }
                    </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>cancelar</Button>
                <Button variant='contained' color="primary" type='submit'>Surtir</Button>
            </DialogActions>
            </form>
                }
        </Dialog>
}