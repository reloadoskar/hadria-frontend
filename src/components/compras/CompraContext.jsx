import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { getCompras, cancelCompra, closeCompra, saveCompra, getCompra, getComprasActivas, updateCompra } from '../api'

export const ComprasContext = createContext()

export const useCompras = () =>{
    return useContext(ComprasContext)
}

const ComprasContextProvider = (props) => {
    const [compras, setCompras] = useState([])
    const [compra, setCompra] = useState(null)
    
    const loadCompras = async (user, mes, year) => {
        const res = await getCompras(user, mes, year)
        setCompras(res.compras)
        return res
    }

    const addCompra = async (user, compra) => {
		const res = await saveCompra(user, compra)
        setCompras([...compras, res.compra])
		return res
	}

    const removeCompra = async (user, id) =>{
		const res = await cancelCompra(user, id)
		setCompras(compras.filter(compra => compra._id !== id))
		return res
    }
    
    const cerrarCompra = async (user, id) => {
        const res = await closeCompra(user, id)
        return res
    }

    const selectCompra = (compraSelected) => {
        setCompra(compraSelected)
    }

    const comprasActivas = async (user) => {
        const res = await getComprasActivas(user)
        return res.compras
    }

    const findCompra = async (user, id) => {
        const res = await getCompra(user, id)
        setCompra(res)
    }

    const clearCompras = () => {
        setCompras([])
    }

    const editCompra = async (user, compra) =>{
        const res = await updateCompra(user, compra)
        return res
    }

    return (
        <ComprasContext.Provider
            value={{
                compras, 
                compra, 
                loadCompras, 
                addCompra, 
                removeCompra, 
                selectCompra, 
                cerrarCompra, 
                comprasActivas, 
                findCompra, 
                clearCompras,
                editCompra
            }}
        >
            {props.children}
        </ComprasContext.Provider>
    )
}

export default ComprasContextProvider