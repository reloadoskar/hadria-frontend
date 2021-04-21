import { Card, CardHeader, Dialog, DialogContent, Divider, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CompraItem from '../compras/CompraItem'
import { formatNumber, sumImporte } from '../Tools'
import CrearVentaItem from './CrearVentaItem'
import VentaItem from './VentaItem'

export default function CrearVenta(props){
    const {elinventario, laubicacion, lafecha} = props
    const [inventario, setInventario] = useState(null)
    const [ubicacion, setUbicacion] = useState(null)
    const [fecha, setFecha] = useState(null)
    const [venta, setVenta] = useState(null)
    const [items, setItems] = useState([])
    const [itemSelected, setItemSelected] = useState(null)
    const [ventaItemDialog, setVentaItemDialog] = useState(false)
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

    function addItem(item){
        item.ubicacion = ubicacion
        item.fecha = fecha
        let itms = items
        itms.push(item)
        setItems(itms)
    }

    function delItem(index){
        let itms = items
        itms.splice(index, 1)
        setItems(itms)
    }
    return (
        <Dialog
            open={true}
            fullScreen
        >
            {inventario === null || fecha === null || ubicacion === null ? null :
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {
                                inventario.length === 0 ?
                                    <Typography align="center" >No hay productos</Typography>
                                    :
                                    inventario.map((item, i) => (
                                        <CompraItem elitem={item} key={i} action={selectItem} />
                                    ))
                            }
                        </Grid>
                        <Grid item sm={6}>
                            {items.length <= 0 ? null : 
                                <Card>
                                    <CardHeader 
                                        title={ "Items: " + items.length}
                                    />
                                    
                                    <Divider />
                                    {items.map((item, i)=> (
                                        <VentaItem basic={true} item={item} key={i} index={i} del={delItem} />
                                    ))}
                                    <Divider />
                                    <Typography align="right">${formatNumber(sumImporte(items),2 )}</Typography>
                                </Card>
                            }
                        </Grid>
                    </Grid>
                    <CrearVentaItem 
                        open={ventaItemDialog}
                        close={closeVentaItemDialog}
                        elitem={itemSelected}
                        add={addItem}                        
                    />
                </DialogContent>
            }

        </Dialog>
    )
}