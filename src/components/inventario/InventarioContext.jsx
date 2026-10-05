import React, {createContext, useState, useContext, useEffect, useRef} from 'react'
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
import { mergeById } from '../pagination'
import { createLatestRequest } from '../latestRequest'
export const InventarioContext = createContext()

export const useInventario = () =>{
    return useContext(InventarioContext)
}

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [movimientosPagination, setMovimientosPagination] = useState({hasMore: false, nextCursor: null, limit: 50})
    const [movimientosFecha, setMovimientosFecha] = useState(null)
    const [cambios, setCambios] = useState([])
    const [inventarioPorUbicacion, setInventarioPorUbicacion] = useState([])
    const [ubicacionInventario, setUbicacionInventario] = useState(null)
    const movementRequests = useRef(createLatestRequest())

    useEffect(()=>{
        if(inventario){

            console.log("el inventario cambió:")
            console.log(inventario)
            let ipu = agruparPorObjeto(inventario, 'ubicacion')

            console.log("y ahora esta asi por ubicación:")
            console.log(ipu)
            return setInventarioPorUbicacion(ipu)
        }
        return setInventarioPorUbicacion([])
    },[inventario])
    
    const loadInventarioGeneral = async (user) => {
        setInventario([])
        let res = await getInventario(user)
        setInventario(res.inventario)
        // let ipu = agruparPorObjeto(res.inventario, 'ubicacion')
        // setInventarioPorUbicacion(ipu)
        // localStorage.setItem('inventario', JSON.stringify(res.inventario))
        // localStorage.setItem('inventarioUbicacion', JSON.stringify(ipu))
        return res
    }

    const loadInventarioUbicacion = async (user, ubicacion) => {        
        let res = await getInventarioBy(user, ubicacion)
        setUbicacionInventario(res.inventario)
        // localStorage.setItem('ubicacionInventario', JSON.stringify(res.inventario))
        return res
    }

    const loadMovimientos = async (user, fecha, append = false) =>{
        const requestId = movementRequests.current.next()
        if(!append) setMovimientos([])
        const cursor = append ? movimientosPagination.nextCursor : null
        const res = await getMovimientos(user, fecha, {limit: 50, cursor})
        if(movementRequests.current.isCurrent(requestId)){
            setMovimientos(current => append ? mergeById(current, res.movimientos) : res.movimientos)
            setMovimientosPagination(res.pagination || {hasMore: false, nextCursor: null, limit: 50})
            setMovimientosFecha(fecha)
        }
        return res
    }

    const loadMoreMovimientos = async (user) => {
        if(!movimientosFecha || !movimientosPagination.hasMore) return null
        return loadMovimientos(user, movimientosFecha, true)
    }

    const loadCambios = async (user, fecha) =>{
        setCambios([])
        let res = await getCambios(user, fecha)
        setCambios(res.cambios)
        // localStorage.setItem('cambios', JSON.stringify(res.cambios))
        return res
    }

    const moverInventario = async (user, movimiento) => {
        // console.log(movimiento.itemsel)
		let mov = await moveInventario(user, movimiento)
            setMovimientos([mov.movimiento , ...movimientos])
            // console.log(inventario) ✅
        let itm = inventario.filter(it=>it._id=== movimiento.itemsel._id)
        // console.log(itm[0])
        if(mov){
            // console.log(itm)
            if(itm){
                itm[0].stock-=movimiento.itemselcantidad
                itm[0].empaquesStock-=movimiento.itemselempaques
                setInventario([...inventario, mov.compraItem])
            }
        }
	    return mov
	}

    const limpiarInventario = () =>{
        setInventario([])
    }

    const selectInventarioUbicacion = (ubicacionid)=>{
        if(inventarioPorUbicacion.length>0){
            let invsel = inventarioPorUbicacion.filter(ub=>ub._id === ubicacionid)
            setUbicacionInventario(invsel[0])
        }else{
            console.log("no se selecciono nada")
        }
    }

    const resetInventario = ()=>{
        setInventario([])
        setMovimientos([])
        setCambios([])
        setInventarioPorUbicacion([])
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
        setCambios([...cambios, res.respuesta])
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
            inventarioPorUbicacion,
            ubicacionInventario,
            movimientos,
            cambios,
            crearSolicitudCambio,
            moverInventario,
            loadCambiosUbicacion,
            loadInventarioGeneral,
            loadInventarioUbicacion,
            loadMovimientos,
            loadMoreMovimientos,
            movimientosPagination,
            loadCambios,
            limpiarInventario,
            selectInventarioUbicacion,
            resetInventario,
            deleteMovimiento, setInventario, setCambios, setInventarioPorUbicacion, surtirCambio, aceptarCambio
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider