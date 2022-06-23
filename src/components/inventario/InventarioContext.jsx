import React, {createContext, useState} from 'react'
import { 
    getInventario, 
    getInventarioBy, 
    // getInventarioxUbicacion,
    moveInventario 
} from '../api'
// import { agruparPorObjeto } from '../Tools'
export const InventarioContext = createContext()

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    // const [inventarioUbicacion, setInventarioUbicacion] = useState([])
    
    const loadInventarioGeneral = async () => {
        let res = await getInventario()
        setInventario(res.inventario)
        return res
    }

    const loadInventarioUbicacion = async (ubicacion) => {
        let res = await getInventarioBy(ubicacion)
        setInventario(res.inventario)
        return res
    }

    const moverInventario = async (movimiento) => {
        // console.log(movimiento.itemsel)
		let mov = await moveInventario(movimiento)
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

    // useEffect(()=>{
    //     if(inventario.length>0){
    //         setInventarioUbicacion(agruparPorObjeto(inventario, "ubicacion"))
    //     }
    // },[inventario])

    return (
        <InventarioContext.Provider value={{
            inventario,
            moverInventario,
            loadInventarioGeneral,
            loadInventarioUbicacion
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider