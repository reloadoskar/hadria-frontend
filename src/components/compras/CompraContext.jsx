import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { getCompras, 
    cancelCompra, 
    closeCompra, 
    saveCompra, 
    getCompra, 
    getComprasActivas, 
    createMerma,
    updateCompra } from '../api'

export const ComprasContext = createContext()

export const useCompras = () =>{
    return useContext(ComprasContext)
}

const ComprasContextProvider = (props) => {
    const [compras, setCompras] = useState([])
    const [compra, setCompra] = useState(null)
    const [itemCompra, setItemCompra] = useState(null)
    
    const loadCompras = async (user, mesAnio) => {
        const res = await getCompras(user, mesAnio)
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

    const crearMerma = async (user, data) =>{
        const res = await createMerma(user, data)
        return res
    }

    const selectItemCompra = (itemCompraSelected) => {
        setItemCompra(itemCompraSelected)
    }

    const updateItemCompra = (item) => {
        selectItemCompra(item)
    }

    return (
        <ComprasContext.Provider
            value={{
                compras, 
                compra, 
                itemCompra,
                loadCompras, 
                addCompra, 
                removeCompra, 
                selectCompra, 
                cerrarCompra, 
                comprasActivas, 
                findCompra, 
                clearCompras,
                editCompra,
                crearMerma,
                selectItemCompra, updateItemCompra
            }}
        >
            {props.children}
        </ComprasContext.Provider>
    )
}

export default ComprasContextProvider