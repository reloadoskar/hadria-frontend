import React, { useEffect, useState, useContext } from 'react'
import { Dialog, DialogContent, Grid, Typography, TextField, DialogTitle, DialogActions, Button } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import useStyles from '../hooks/useStyles'
import { PesadasContext } from '../inventario/PesadasContext' 
import Pesadas from '../inventario/Pesadas'
import {formatNumber,} from '../Tools'
export default function CrearVentaItem({open, close, elitem, add}){
    const { lista, neto} = useContext(PesadasContext)
    const classes = useStyles()
    const [item, setItem] = useState(null)
    const [empaques, setEmpaques] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precio, setPrecio] = useState('')
    const [importe, setImporte] = useState('')
    const [guardando, setGuardando] = useState(false)
    const handleFocus = (event) => event.target.select();
    
    useEffect(()=>{
        setCantidad(neto)
        setEmpaques(lista.length)
    },[lista, neto]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(elitem){
            setItem(elitem)
        }
        return () => setItem(null)
    }, [elitem])

    function handleChange(field, value){
        switch (field) {
            case 'empaques':
                if(value > item.empaquesStock ){
                    setEmpaques('')
                }else{
                    setEmpaques(value)
                }
                break;
            case 'cantidad':
                if(value === ''){setCantidad(0)}
                if(value > item.stock){
                    setCantidad(0)
                }else{
                    setCantidad(value)
                }
                if(precio !== ''){
                    setImporte(value * precio)
                }
                break
            case 'precio':
                setPrecio(value)
                if(cantidad !== ''){
                    setImporte(value * cantidad)
                }
                break
            default:
                break;
        }
    }

    function clearFields(){
        setCantidad('')
        setEmpaques('')
        setImporte('')
        setPrecio('')
        setGuardando(false)
        setItem(null)
    }

    function handleSubmit(e){
        e.preventDefault()
        setGuardando(true)

        let newItem = {
            itemOrigen: item,
            compraItem: item._id,
            compra: item.compra,
            producto: item.producto,
            cantidad: cantidad,
            empaques: empaques,
            precio: precio,
            importe: importe 
        }
        add(newItem)
        return handleClose()
    }

    function handleClose(){
        clearFields()
        close()
    }
    // function addPesada(pesada){
    //     let cant = Number
    //     if(cantidad===''){
    //         console.log('iniciando cantidad en 0:')
    //         cant=0
    //     }else{cant=cantidad}
    //     let lista = pesadas
    //         lista.push(pesada)
    //     let emps = lista.length
    //     if(emps===0){
    //         cant = pesada
    //     }else{
    //         cant += parseFloat(pesada)
    //         console.log(cant)
    //     }
    //     if(cant>item.stock){
    //         setPesadas(0)
    //         setEmpaques(0)
    //         setCantidad(item.stock)
    //     }
    //     setPesadas(lista)
    //     setEmpaques(emps)
    //     setCantidad(cant)
        
    // }
    // function delPesada(index){
    //     let psds = pesadas
    //         psds.splice(index,1);
    //     setPesadas(psds)
    //     let ncant = psds.reduce((acc,el)=> acc+= parseFloat(el), 0)
    //     let nempq = empaques - 1
    //     setCantidad(ncant)
    //     setEmpaques(nempq)        
    // }
    // const clearPesadas = () => {
    //     setPesadas([])
    //     setCantidad(0)
    //     setEmpaques(0)
    // }
    return (
        <Dialog
            open={open} 
            fullWidth={true}
            maxWidth="sm" 
            onClose={() => handleClose()} 
        >
            {item === null ? null :
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{item.producto.descripcion} {item.empaquesStock}/{ formatNumber(item.stock,2)}</DialogTitle>
                    {guardando === true ? 
                        <Zoom in={guardando}>
                            <Typography variant="h6" align="center">Agregando al carrito...</Typography>
                        </Zoom>
                        :
                        <Slide direction="up" in={!guardando}>
                            <DialogContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            id="empaques"
                                            label="Cajas"
                                            variant="outlined"
                                            autoFocus
                                            onFocus={handleFocus}
                                            fullWidth
                                            type="number"
                                            value={empaques}
                                            onChange={(e) => handleChange('empaques',e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField 
                                                    id="cantidad"
                                                    label="Kilos"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    type="number"
                                                    value={cantidad}
                                                    onChange={(e) => handleChange('cantidad',e.target.value)}
                                                />
                                            </Grid> 
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            id="precio"
                                            label="Precio"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            value={precio}
                                            onChange={(e) => handleChange('precio',e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            id="importe"
                                            label="Importe"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            value={importe}
                                            onChange={(e) => handleChange('importe',e.target.value)}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Slide>
                    }
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button 
                            disabled={guardando === true ? true : false}
                            type="submit" className={classes.botonGenerico}>Agregar</Button>
                    </DialogActions>
                </form>
            }
            <Pesadas
                item={elitem}    
            />
        </Dialog>
    )
}