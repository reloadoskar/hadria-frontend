import React, {createContext, useState} from 'react'
import { useContext } from 'react'
import { getEmpresa, updateEmpresa, saveEmpresa } from '../api'
export const EmpresaContext = createContext()

export const useEmpresa = () =>{
    return useContext(EmpresaContext)
}

const EmpresaContextProvider = (props) => {
    const [empresa, setEmpresa] = useState(null)

    const loadEmpresa = async (user) => {
        const res = await getEmpresa(user)
        setEmpresa(res.empresa)
        return res
    }

    const crearEmpresa = async (user, data) =>{
        let res = await saveEmpresa(user, data)
        setEmpresa(res.empresa)
        return res
    }

    const editEmpresa = async (user, empresa) => {
        const res = await updateEmpresa(user, empresa)
        setEmpresa(res.empresa)
        return res
    }

    return (
        <EmpresaContext.Provider value={{
            empresa,
            crearEmpresa,
            setEmpresa,
            loadEmpresa,
            editEmpresa
        }}>
            {props.children}
        </EmpresaContext.Provider>
    )
}

export default EmpresaContextProvider