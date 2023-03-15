import React, {createContext, useState, useContext} from 'react'
import { 
    getInventario, 
    getInventarioBy, 
    getCambiosUbicacion,
    getCambios,
    createSolicitudCambio,
    moveInventario,
    getMovimientos,
    eliminarMovimiento,
    stockUpCambio, acceptCambio
} from '../api'
import { agruparPorObjeto } from '../Tools'
export const InventarioContext = createContext()

export const useInventario = () =>{
    return useContext(InventarioContext)
}

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [cambios, setCambios] = useState([])
    const [inventarioUbicacion, setInventarioUbicacion] = useState([])
    const [ubicacionInventario, setUbicacionInventario] = useState(null)
    
    const loadInventarioGeneral = async (user) => {
        setInventario([])
        let res = await getInventario(user)
        setInventario(res.inventario)
        let ipu = agruparPorObjeto(res.inventario, 'ubicacion')
        setInventarioUbicacion(ipu)
        localStorage.setItem('inventario', JSON.stringify(res.inventario))
        localStorage.setItem('inventarioUbicacion', JSON.stringify(ipu))
        return res
    }

    const loadInventarioUbicacion = async (user, ubicacion) => {        
        let res = await getInventarioBy(user, ubicacion)
        setUbicacionInventario(res.inventario)
        localStorage.setItem('ubicacionInventario', JSON.stringify(res.inventario))
        return res
    }

    const loadMovimientos = async (user, fecha) =>{
        setMovimientos([])
        let res = await getMovimientos(user, fecha)
        setMovimientos(res.movimientos)
        localStorage.setItem('movimientos', JSON.stringify(res.movimientos))
        return res
    }

    const loadCambios = async (user) =>{
        setCambios([])
        let res = await getCambios(user)
        setCambios(res.cambios)
        localStorage.setItem('cambios', JSON.stringify(res.cambios))
        return res
    }

    const moverInventario = async (user, movimiento) => {
        // console.log(movimiento.itemsel)
		let mov = await moveInventario(user, movimiento)
            setMovimientos([mov.movimiento , ...movimientos])
        let itm = inventario.filter(it=>it._id=== movimiento.itemsel._id)
        // console.log(itm[0])
        if(mov){
            itm[0].stock-=movimiento.itemselcantidad
            itm[0].empaquesStock-=movimiento.itemselempaques
            setInventario([...inventario, {
                _id: movimiento,
                ubicacion: movimiento.destino,
                compra: movimiento.itemsel.compra,
                producto: movimiento.itemsel.producto,
                cantidad: movimiento.itemselcantidad,
                clasificacion: movimiento.clasificacion,
                stock: movimiento.itemselcantidad,
                empaques: movimiento.itemselempaques,
                empaquesStock: movimiento.itemselempaques
            }])
        }
	    return mov
	}

    const limpiarInventario = () =>{
        setInventario([])
    }

    const selectInventarioUbicacion = (ubicacionid)=>{
        if(inventarioUbicacion.length>0){
            let invsel = inventarioUbicacion.filter(ub=>ub._id === ubicacionid)
            setUbicacionInventario(invsel[0])
        }else{
            console.log("no se selecciono nada")
        }
    }

    const resetInventario = ()=>{
        setInventario([])
        setMovimientos([])
        setCambios([])
        setInventarioUbicacion([])
        setUbicacionInventario(null)
    }

    const deleteMovimiento = async (user, mov)=>{
        const res = await eliminarMovimiento(user, mov)
            if(res){
                setMovimientos([res.movimiento , ...movimientos])
            }
            return res
    }

    const loadCambiosUbicacion = async (user, ubicacion, fecha) => {
        const res = await getCambiosUbicacion(user, ubicacion, fecha)
        setCambios(res.cambios)
        return res
    }

    const crearSolicitudCambio = async (user, solicitud) => {
        const res = await createSolicitudCambio(user, solicitud)
        return res
    }

    const surtirCambio = async (user, respuesta) => {
        const res = await stockUpCambio(user, respuesta)
        return res
    }

    const aceptarCambio = async (user, firma) => {
        const res = await acceptCambio(user, firma)
        return res
    }

    return (
        <InventarioContext.Provider value={{
            inventario,
            inventarioUbicacion,
            ubicacionInventario,
            movimientos,
            cambios,
            crearSolicitudCambio,
            moverInventario,
            loadCambiosUbicacion,
            loadInventarioGeneral,
            loadInventarioUbicacion,
            loadMovimientos,
            loadCambios,
            limpiarInventario,
            selectInventarioUbicacion,
            resetInventario,
            deleteMovimiento, setInventario, setCambios, setInventarioUbicacion, surtirCambio, aceptarCambio
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider