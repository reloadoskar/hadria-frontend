import React, {createContext, useState} from 'react'
import { 
    getInventario, 
    getInventarioBy, 
    // getInventarioxUbicacion,
    // moveInventario 
} from '../api'

export const InventarioContext = createContext()

const InventarioContextProvider = (props) => {
    const [inventario, setInventario] = useState([])
    
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

    return (
        <InventarioContext.Provider value={{
            inventario,
            loadInventarioGeneral,
            loadInventarioUbicacion
        }} >
            {props.children}
        </InventarioContext.Provider>
    )
}

export default InventarioContextProvider