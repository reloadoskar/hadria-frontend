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
  
  const addEgreso = async (egreso) => {
    const res = await saveEgreso(egreso)
    setEgresos([...egresos, res.egreso])
    return res
  }

  const addPagoCxp = async (pago) => {
		let res = await savePagoACuentaPorPagar(pago)
    return res
	}

  const removeEgreso = async (id) => {
		const res = await deleteEgreso(id)
    setEgresos(egresos.filter(egreso => egreso._id !== id))
    return res
	}

  const loadEgresos = async (fecha) => {
		const res = await getEgresos(fecha)
		setEgresos(res.egresos)		
		return res
  }

  const loadEgresosMonthYear = async (month, year) =>{
    const res = await getEgresosMonthYear(month, year)
    setEgresos(res.egresos)
    return res
  }

  const loadCuentasPorPagar = async () =>{
		const res = await getCuentasPorPagar()
    setCuentasPorPagar(res.cuentas)
    return res		
	}
  
  const selectEgresos = (egresos) => {
    setEgresos(egresos)
  }

  const editEgreso = async (egreso) => {
    let res = await updateEgreso(egreso)
    return res
  }

  const editCuentaPorPagar = async (cxp) => {
    let cuentaActualizada = await updateEgreso(cxp)
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