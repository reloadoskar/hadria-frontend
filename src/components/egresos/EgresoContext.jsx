import React, { useState, createContext } from 'react';
import { 
  getEgresos, 
  saveEgreso, 
  // getCuentasPorPagar, 
  // savePagoACuentaPorPagar, 
  deleteEgreso,
  updateEgreso
} from '../api'

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
  
  const selectEgresos = (egresos) => {
    setEgresos(egresos)
  }

  const editEgreso = async (egreso) => {
    let res = await updateEgreso(egreso)
    return res
  }

  return (
    <EgresoContext.Provider value={{
      egresos,
      addEgreso, 
      removeEgreso, 
      loadEgresos, 
      selectEgresos,
      editEgreso
      }}>
      {props.children}
    </EgresoContext.Provider>
  )
}

export default EgresoContextProvider