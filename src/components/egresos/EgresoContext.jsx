import React, { useState, createContext } from 'react';
import { 
  getEgresos, 
  getEgresosMonthYear,
  saveEgreso, 
  getCuentasPorPagar, 
  savePagoACuentaPorPagar, 
  deleteEgreso,
  updateEgreso
} from '../api'

export const EgresoContext = createContext()

const EgresoContextProvider = (props) => {
  const [egresos, setEgresos] = useState(null)
  const [cuentasPorPagar, setCuentasPorPagar] = useState(null)

  const resetEgresos = () =>{
    setEgresos([])
  }
  
  const addEgreso = async (user, data) => {
    const res = await saveEgreso(user, data)
    setEgresos([...egresos, res.egreso])
    return res
  }

  const addPagoCxp = async (user, pago) => {
		let res = await savePagoACuentaPorPagar(user, pago)
    return res
	}

  const removeEgreso = async (user, id) => {
		const res = await deleteEgreso(user, id)
    setEgresos(egresos.filter(egreso => egreso._id !== id))
    return res
	}

  const loadEgresos = async (user, fecha) => {
		const res = await getEgresos(user, fecha)
		setEgresos(res.egresos)		
		return res
  }

  const loadEgresosMonthYear = async (user, month, year) =>{
    const res = await getEgresosMonthYear(user, month, year)
    setEgresos(res.egresos)
    return res
  }

  const loadCuentasPorPagar = async (user) =>{
		const res = await getCuentasPorPagar(user)
    setCuentasPorPagar(res.cuentas)
    return res		
	}
  
  const selectEgresos = (egresos) => {
    setEgresos(egresos)
  }

  const editEgreso = async (user, data) => {
    let res = await updateEgreso(user, data)
    return res
  }

  const editCuentaPorPagar = async (user, cxp) => {
    let cuentaActualizada = await updateEgreso(user, cxp)
    let copiaCuentas = cuentasPorPagar
    let index = copiaCuentas.findIndex(el => el._id === cxp._id)
    copiaCuentas[index] = cxp
    setCuentasPorPagar(copiaCuentas)
    return cuentaActualizada
  }

  return (
    <EgresoContext.Provider value={{
      egresos,
      cuentasPorPagar,
      addEgreso, 
      removeEgreso, 
      loadEgresos, 
      selectEgresos,
      editEgreso, 
      addPagoCxp, 
      loadCuentasPorPagar,
      loadEgresosMonthYear,
      editCuentaPorPagar,
      resetEgresos
    }}>
      {props.children}
    </EgresoContext.Provider>
  )
}

export default EgresoContextProvider