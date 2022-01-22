import React, {createContext, useState} from 'react'
import { getEmpresa, updateEmpresa } from '../api'
export const EmpresaContext = createContext()

const EmpresaContextProvider = (props) => {
    const [empresa, setEmpresa] = useState(null)

    const loadEmpresa = async () => {
        const res = await getEmpresa()
        setEmpresa(res.empresa)
        return res
    }

    const editEmpresa = async (empresa) => {
        const res = await updateEmpresa(empresa)
        return res
    }

    return (
        <EmpresaContext.Provider value={{
            empresa,
            loadEmpresa,
            editEmpresa
        }}>
            {props.children}
        </EmpresaContext.Provider>
    )
}

export default EmpresaContextProvider