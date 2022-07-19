import React, {createContext, useState} from 'react'
import { 
    getInventario, 
    getInventarioBy, 
    // getInventarioxUbicacion,
    moveInventario,
    getMovimientos
} from '../api'
import { agruparPorObjeto } from '../Tools'
export const InventarioContext = createContext()

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [inventarioUbicacion, setInventarioUbicacion] = useState([])
    const [ubicacionInventario, setUbicacionInventario] = useState(null)
    
    const loadInventarioGeneral = async () => {
        setInventario([])
        let res = await getInventario()
        setInventario(res.inventario)
        let ipu = agruparPorObjeto(res.inventario, 'ubicacion')
        setInventarioUbicacion(ipu)
        return res
    }

    const loadInventarioUbicacion = async (ubicacion) => {
        setInventario([])
        setInventarioUbicacion([])
        let res = await getInventarioBy(ubicacion)
        setUbicacionInventario(res.inventario)
        return res
    }

    const loadMovimientos = async (month) =>{
        let res = await getMovimientos(month)
        setMovimientos(res.movimientos)
        return res
    }

    const moverInventario = async (movimiento) => {
        // console.log(movimiento.itemsel)
		let mov = await moveInventario(movimiento)
            setMovimientos([...movimientos, mov.movimiento])
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

    // useEffect(()=>{
    //     if(inventario.length>0){
    //         setInventarioUbicacion(agruparPorObjeto(inventario, "ubicacion"))
    //     }
    // },[inventario])

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
            selectInventarioUbicacion
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider