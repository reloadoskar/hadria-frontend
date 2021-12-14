import React, { createContext, useState } from 'react'
import { getCompras, cancelCompra, closeCompra, saveCompra, getCompra, recuperaVentasCompra, getComprasActivas, recuperaGastosCompra } from '../api'

export const ComprasContext = createContext()

const ComprasContextProvider = (props) => {
    const [compras, setCompras] = useState([])
    const [compra, setCompra] = useState(null)
    
    const loadCompras = async (mes) => {
        const res = await getCompras(mes)
        setCompras(res.compras)
        return res
    }

    const addCompra = async (compra) => {
		const res = await saveCompra(compra)
        setCompras([...compras, res.compra])
		return res
	}

    const removeCompra = async (id) =>{
		const res = await cancelCompra(id)
		setCompras(compras.filter(compra => compra._id !== id))
		return res
	}

    const selectCompra = (compraSelected) => {
        setCompra(compraSelected)
    }
    return (
        <ComprasContext.Provider
            value={{compras, compra, loadCompras, addCompra, removeCompra, selectCompra}}
        >
            {props.children}
        </ComprasContext.Provider>
    )
}

export default ComprasContextProvider