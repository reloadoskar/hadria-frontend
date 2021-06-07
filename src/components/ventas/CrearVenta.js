import React, { useEffect, useState } from 'react'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, Menu, MenuItem } from '@material-ui/core'
import CompraItems from '../compras/CompraItems'
import CrearVentaItem from './CrearVentaItem'
import CobrarDialog from '../pos/CobrarDialog'
import VentaItems from './VentaItems'
import useStyles from '../hooks/useStyles'

import { formatNumber, sumImporte } from '../Tools'
export default function CrearVenta({clientes, elinventario, laubicacion, lafecha, open, close, showMessage, addVenta}){
    const classes = useStyles()
    const [inventario, setInventario] = useState(null)
    
    const [itemSelected, setItemSelected] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [ventaItemDialog, setVentaItemDialog] = useState(false)
    const [cobrarDialog, setCobrarDialog] = useState(false)
    const [guardando, setGuardando] = useState(false)
    
    const [ubicacion, setUbicacion] = useState(null)
    const [fecha, setFecha] = useState(null)
    const [cliente, setCliente] = useState('')
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (items.length > 0){
            setTotal(sumImporte(items))
        }
        return () => setTotal(0)
    },[items])
    useEffect(() => {
        if (clientes){
            setCliente(clientes[0])
        }
    },[clientes])
    useEffect(() => {
        if(elinventario){
            setInventario(elinventario)
        }
        return () => setInventario(null)
    },[elinventario])
    
    useEffect(() => {
        if(laubicacion){
            setUbicacion(laubicacion)
        }
        return () => setUbicacion(null)
    },[laubicacion])
    useEffect(() => {
        if(lafecha){
            setFecha(lafecha)
        }
        return () => setFecha(null)
    },[lafecha])
    
    function selectItem(item){
        setItemSelected(item)
        openVentaItemDialog()
    }

    function openVentaItemDialog(){
        setVentaItemDialog(true)
    }

    function closeVentaItemDialog(){
        setVentaItemDialog(false)
        setItemSelected(null)
    }

    const seleccionaCliente = (cliente) => {
        setCliente(cliente)
    }

    function addItem(item){
        item.ubicacion = ubicacion
        item.fecha = fecha
        let itms = items
        itms.push(item)
        setItems(itms)
        item.itemOrigen.stock -= item.cantidad
        item.itemOrigen.empaquesStock -= item.empaques

    }

    function delItem(index, item){
        item.itemOrigen.stock += parseFloat(item.cantidad)
        item.itemOrigen.empaquesStock += parseFloat(item.empaques)
        
        let itms = items
        itms.splice(index, 1)
        setItems(itms)
    }

    const handleKeyPress = (e) => {
        if(e.key === "x" || e.key === "X"){
            toggleCobrarDialog()
        }
    }

    const closeSelect = () => {
        setAnchorEl(null)
    }

    const toggleCobrarDialog = () => {
        setCobrarDialog(!cobrarDialog)
    }
    const guardarVenta = (venta) => {
        setGuardando(true)
        venta.ubicacion = ubicacion
        venta.fecha = fecha
        venta.items = items
        venta.cliente = cliente
        venta.total = sumImporte(items)
        console.log(venta)
        addVenta(venta).then(res => {
            setGuardando(false)
            showMessage(res.message, res.status)
            toggleCobrarDialog()
            handleClose()
        })
    }

    const handleClose = () => {
        setItemSelected(null)
        setItems([])
        setTotal(0)
        close()
    }
    return (
        <React.Fragment>            
            <Dialog
                onKeyPress={(e) => handleKeyPress(e)}
                open={open}
                onClose={()=>handleClose()}
                maxWidth="lg"
                fullWidth
            >
                {inventario === null || fecha === null || ubicacion === null ? null :
                    <React.Fragment>
                        <DialogContent>                            
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12} sm={4}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>Cliente</Typography>
                                    <Button 
                                        onClick={(e) => setAnchorEl(e.currentTarget)}
                                        fullWidth
                                    >
                                        {cliente.nombre ? cliente.nombre : "slecciona un cliente"} 
                                        <ExpandMoreIcon />
                                    </Button>
                                    <Menu
                                        id="seleccionar-cliente"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={closeSelect}
                                        >
                                        {clientes !== undefined ? 
                                            clientes.map(cliente => (
                                                <MenuItem 
                                                    key={cliente._id} 
                                                    onClick={() =>{
                                                        seleccionaCliente(cliente)
                                                        closeSelect()
                                                }}
                                                >
                                                {cliente.nombre}
                                                </MenuItem>
                                            ))
                                            :
                                            null
                                        }        
                                    </Menu>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="center" className={classes.textoMiniFacheron}>
                                        Productos disponibles
                                    </Typography>
                                    <CompraItems inventario={inventario} selectItem={selectItem}/>
                                    <CrearVentaItem 
                                        open={ventaItemDialog}
                                        close={closeVentaItemDialog}
                                        elitem={itemSelected}
                                        add={addItem}                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VentaItems items={items} eliminar={delItem}/>
                                </Grid>

                                

                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            {items.length > 0 ? 
                                <Button 
                                    size="large"
                                    fullWidth
                                    disabled={items.length > 0 ? false : true}
                                    className={ sumImporte(items) === 0 ? classes.botonGenerico : classes.botonCosmico}
                                    onClick={() => toggleCobrarDialog()}
                                    variant="contained"
                                    startIcon={<MonetizationOnIcon />}
                                >
                                    Cobrar ${formatNumber( sumImporte(items) )} (x)
                                </Button>
                                : null
                            }
                            <CobrarDialog 
                                open={cobrarDialog} 
                                close={toggleCobrarDialog}
                                cliente={cliente}
                                total={sumImporte(items)} 
                                showMessage={showMessage}
                                guardarVenta={guardarVenta}
                                guardando={guardando}
                            />
                        </DialogActions>
                    </React.Fragment>
                }

            </Dialog>
        </React.Fragment>
    )
}