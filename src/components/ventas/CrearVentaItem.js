import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, Grid, Typography, TextField, DialogTitle, DialogActions, Button } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import useStyles from '../hooks/useStyles'
import Pesadas from '../inventario/Pesadas'

export default function CrearVentaItem(props){
    const classes = useStyles()
    const {open, close, elitem, add} = props
    const [item, setItem] = useState(null)
    const [empaques, setEmpaques] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precio, setPrecio] = useState('')
    const [importe, setImporte] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [verPesadas, setVerPesadas] = useState(false)
    const [pesadas, setPesadas] = useState([])
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
                if(value > item.stock){
                    setCantidad('')
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
    function openPesadas(){
        setVerPesadas(true)
    }
    function closePesadas(){
        setVerPesadas(false)
    }
    function addPesada(pesada){
        let lista = pesadas
        lista.push(pesada)
        let emps = lista.length
        let cant = Number
        if(emps===0){
            cant = pesada
        }else{
            cant = parseFloat(cantidad) + parseFloat(pesada)
        }
        setPesadas(lista)
        setEmpaques(emps)
        setCantidad(cant)
    }
    function delPesada(pesada, index){
        let lista = pesadas
            lista.splice(index,1);
        setPesadas(lista)
        let ncant = cantidad - pesada
        let nempq = empaques - 1
        setCantidad(ncant)
        setEmpaques(nempq)
        
    }
    const clearPesadas = () => {
        setPesadas([])
        setCantidad('')
        setEmpaques('')
    }
    return (
        <Dialog
            open={open} 
            fullWidth={true}
            maxWidth="sm" 
            onClose={() => handleClose()} 
        >
            {item === null ? null :
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{item.producto.descripcion} {item.empaquesStock}/{item.stock}</DialogTitle>
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
                                            required
                                            fullWidth
                                            value={empaques}
                                            onChange={(e) => handleChange('empaques',e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={pesadas.length >0 ? 9 : 12}>
                                                <TextField 
                                                    id="cantidad"
                                                    label="Kilos"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    value={cantidad}
                                                    onChange={(e) => handleChange('cantidad',e.target.value)}
                                                />
                                            </Grid> 
                                            {pesadas.length > 0 ? 
                                                <Grid item xs={3}>
                                                    <Button className={classes.botonGenerico} onClick={() => openPesadas()}>Ver pesadas</Button>
                                                </Grid>
                                                : null
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField 
                                            id="precio"
                                            label="Precio"
                                            variant="outlined"
                                            required
                                            fullWidth
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
                open={verPesadas} 
                close={closePesadas} 
                pesadas={pesadas} 
                addPesada={addPesada}
                delPesada={delPesada}
                clearPesadas={clearPesadas}
            />
        </Dialog>
    )
}