import React, { useState, createContext } from 'react';
import { 
  getEgresos, 
  saveEgreso, 
  // getCuentasPorPagar, 
  // savePagoACuentaPorPagar, 
  deleteEgreso} from '../api'

export const EgresoContext = createContext()

const EgresoContextProvider = (props) => {
  const [egresos, setEgresos] = useState([])
  
  const addEgreso = async (egreso) => {
    const res = await saveEgreso(egreso)
    setEgresos([...egresos, res.egreso])
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

  return (
    <EgresoContext.Provider value={{addEgreso, removeEgreso, loadEgresos, setEgresos, egresos}}>
      {props.children}
    </EgresoContext.Provider>
  )
}

export default EgresoContextProvider