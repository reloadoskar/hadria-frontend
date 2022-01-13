import React, {createContext, useState} from 'react'
import { getClientes, saveCliente, deleteCliente, updateCliente } from '../api'
export const ClienteContext = createContext()

const ClienteContextProvider = (props) => {
    const [clientes, setClientes] = useState([])

    const loadClientes = async () => {
        const res = await getClientes()
        setClientes(res.clientes)
        return res
    }

    const findCliente = (search) => {
        return clientes.filter(cliente=>cliente.nombre.indexOf(search) !== -1)
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
        }}>
            {props.children}
        </ClienteContext.Provider>
    )
}

export default ClienteContextProvider;