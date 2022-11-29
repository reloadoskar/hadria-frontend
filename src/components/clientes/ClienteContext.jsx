import React, {createContext, useState} from 'react'
import { useContext } from 'react'
import { getClientes, saveCliente, deleteCliente, updateCliente, getCuentasxCliente } from '../api'
export const ClienteContext = createContext()

export const useClientes = () =>{
    return useContext(ClienteContext)
}

const ClienteContextProvider = (props) => {
    const [clientes, setClientes] = useState([])
    const [cuentasxCliente, setCuentas] = useState([])

    const loadClientes = async (user) => {
        const res = await getClientes(user)
        setClientes(res.clientes)
        return res
    }

    const findCliente = (search) => {
        return clientes.filter(cliente=>cliente.nombre.indexOf(search) !== -1)
    }

    const loadCuentasxCliente = async (user) => {
        const res = await getCuentasxCliente(user)
        setCuentas(res.cuentas)
        return res
    }

    const addCliente = async (user, cliente) => {
        const res = await saveCliente(user, cliente)
        setClientes([res.cliente, ...clientes])
        return res
    }

    const removeCliente = async (user, id) => {
        const res = await deleteCliente(user, id)
        setClientes(clientes.filter(cliente => cliente._id !== id))
        return res
    }

    const editCliente = async (user, cliente) => {
        const res = await updateCliente(user, cliente)
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