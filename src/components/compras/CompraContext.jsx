import React, { createContext, useState } from 'react'
import { getCompras, cancelCompra, closeCompra, saveCompra, getCompra, getComprasActivas } from '../api'

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
    
    const cerrarCompra = async (id) => {
        const res = await closeCompra(id)
        return res
    }

    const selectCompra = (compraSelected) => {
        setCompra(compraSelected)
    }

    const comprasActivas = async () => {
        const res = await getComprasActivas()
        setCompras(res.compras)
        return res
    }

    const findCompra = async (id) => {
        const res = await getCompra(id)
        setCompra(res)
    }

    return (
        <ComprasContext.Provider
            value={{compras, compra, loadCompras, addCompra, removeCompra, selectCompra, cerrarCompra, comprasActivas, findCompra}}
        >
            {props.children}
        </ComprasContext.Provider>
    )
}

export default ComprasContextProvider