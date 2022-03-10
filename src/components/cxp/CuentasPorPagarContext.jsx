import React, { createContext, useState } from 'react'
import { 
    // getEgresos, 
    saveEgreso, 
    // getCuentasPorPagar, 
    // savePagoACuentaPorPagar, 
    // deleteEgreso,
    // updateEgreso
  } from '../api'
export const CuentasPorPagarContext = createContext()

const CuentasPorPagarContextProvider = (props) => {
    const [cuentasProductor, setCuentasPorPagar] = useState([])
    
    const addPago = async (pago) => {
        const res = await saveEgreso(pago)
        setCuentasPorPagar([...cuentasProductor, res.egreso])
        return res
    }

    const cargarCuentas = (cuentas) => {
        return setCuentasPorPagar(cuentas)
    }

    const removerCuenta = (id) =>{
        return setCuentasPorPagar(cuentasProductor.filter(cuenta=>cuenta._id !== id))
    }
    return (
        <CuentasPorPagarContext.Provider value={{
            cuentasProductor,
            addPago,
            cargarCuentas,
            removerCuenta
        }}>
            {props.children}
        </CuentasPorPagarContext.Provider>
    )
}

export default CuentasPorPagarContextProvider