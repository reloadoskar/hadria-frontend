import React, {createContext, useState} from 'react'
import { getClientes, saveCliente, deleteCliente, updateCliente, getCuentasxCliente } from '../api'
export const ClienteContext = createContext()

const ClienteContextProvider = (props) => {
    const [clientes, setClientes] = useState([])
    const [cuentasxCliente, setCuentas] = useState([])

    const loadClientes = async () => {
        const res = await getClientes()
        setClientes(res.clientes)
        return res
    }

    const findCliente = (search) => {
        return clientes.filter(cliente=>cliente.nombre.indexOf(search) !== -1)
    }

    const loadCuentasxCliente = async () => {
        const res = await getCuentasxCliente()
        setCuentas(res.cuentas)
        return res
    }

    const addCliente = async (cliente) => {
        const res = await saveCliente(cliente)
        setClientes([...clientes, res.cliente])
        return res
    }

    const removeCliente = async (id) => {
        const res = await deleteCliente(id)
        setClientes(clientes.filter(cliente => cliente._id !== id))
        return res
    }

    const editCliente = async (cliente) => {
        const res = await updateCliente(cliente)
        return res
    }
    return (
        <ClienteContext.Provider value={{
            clientes,
            loadClientes,
            addCliente,
            removeCliente,
            editCliente,
            findCliente,
            loadCuentasxCliente,
            cuentasxCliente
        }}>
            {props.children}
        </ClienteContext.Provider>
    )
}

export default ClienteContextProvider;