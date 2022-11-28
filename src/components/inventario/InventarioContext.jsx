import React, {createContext, useState, useContext} from 'react'
import { 
    getInventario, 
    getInventarioBy, 
    // getInventarioxUbicacion,
    moveInventario,
    getMovimientos,
    eliminarMovimiento
} from '../api'
import { agruparPorObjeto } from '../Tools'
export const InventarioContext = createContext()

export const useInventario = () =>{
    return useContext(InventarioContext)
}

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [inventarioUbicacion, setInventarioUbicacion] = useState([])
    const [ubicacionInventario, setUbicacionInventario] = useState(null)
    
    const loadInventarioGeneral = async (user) => {
        setInventario([])
        let res = await getInventario(user)
        setInventario(res.inventario)
        let ipu = agruparPorObjeto(res.inventario, 'ubicacion')
        setInventarioUbicacion(ipu)
        return res
    }

    const loadInventarioUbicacion = async (user, ubicacion) => {        
        let res = await getInventarioBy(user, ubicacion)
        setUbicacionInventario(res.inventario)
        return res
    }

    const loadMovimientos = async (user, fecha) =>{
        setMovimientos([])
        let res = await getMovimientos(user, fecha)
        setMovimientos(res.movimientos)
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

    return (
        <InventarioContext.Provider value={{
            inventario,
            inventarioUbicacion,
            ubicacionInventario,
            movimientos,
            moverInventario,
            loadInventarioGeneral,
            loadInventarioUbicacion,
            loadMovimientos,
            limpiarInventario,
            selectInventarioUbicacion,
            resetInventario,
            deleteMovimiento
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider