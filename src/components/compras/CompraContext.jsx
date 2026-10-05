import React, { createContext, useState, useRef } from 'react'
import { useContext } from 'react'
import { getCompras, 
    cancelCompra, 
    closeCompra, 
    saveCompra, 
    getCompra, 
    getComprasActivas, 
    createMerma,
    updateCompra } from '../api'
import { mergeById } from '../pagination'
import { createLatestRequest } from '../latestRequest'

export const ComprasContext = createContext()

export const useCompras = () =>{
    return useContext(ComprasContext)
}

const ComprasContextProvider = (props) => {
    const [compras, setCompras] = useState([])
    const [comprasPagination, setComprasPagination] = useState({hasMore: false, nextCursor: null, limit: 50})
    const [comprasTotals, setComprasTotals] = useState({operations: 0, costo: 0, venta: 0, gastos: 0, pagos: 0, resultado: 0})
    const [comprasPeriodo, setComprasPeriodo] = useState(null)
    const [compra, setCompra] = useState(null)
    const [itemCompra, setItemCompra] = useState(null)
    const requests = useRef(createLatestRequest())
    const detailRequests = useRef(createLatestRequest())
    
    const loadCompras = async (user, mesAnio, append = false) => {
        const requestId = requests.current.next()
        const cursor = append ? comprasPagination.nextCursor : null
        const res = await getCompras(user, mesAnio, {limit: 50, cursor}, !append)
        if(requests.current.isCurrent(requestId)){
            setCompras(current => append ? mergeById(current, res.compras) : res.compras)
            setComprasPagination(res.pagination || {hasMore: false, nextCursor: null, limit: 50})
            if(res.totals) setComprasTotals(res.totals)
            setComprasPeriodo(mesAnio)
        }
        return res
    }

    const loadMoreCompras = async user => {
        if(!comprasPeriodo || !comprasPagination.hasMore) return null
        return loadCompras(user, comprasPeriodo, true)
    }

    const addCompra = async (user, compra) => {
		const res = await saveCompra(user, compra)
        if(comprasPeriodo){
            await loadCompras(user, comprasPeriodo)
        }else{
            setCompras(current => [...current, res.compra])
        }
		return res
	}

    const removeCompra = async (user, id) =>{
		const res = await cancelCompra(user, id)
        if(comprasPeriodo){
            await loadCompras(user, comprasPeriodo)
        }else{
            setCompras(current => current.filter(compra => compra._id !== id))
        }
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
        const requestId = detailRequests.current.next()
        const res = await getCompra(user, id)
        const selected = res && res.data ? res.data.compra : null
        if(!detailRequests.current.isCurrent(requestId)) return null
        setCompra(selected)
        return selected
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
                loadMoreCompras,
                comprasPagination,
                comprasTotals,
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