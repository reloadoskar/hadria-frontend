import React, {createContext, useState} from 'react'
import { getIngresos, 
    getIngresosxMes,
    saveIngreso, 
    delIngreso, 
    getCuentasPorCobrar, 
    getCxcPdv, 
    // getCxcCliente, 
    savePagoACuentaPorCobrar, 
    saveVenta 
} from '../api'
export const IngresoContext = createContext()
const IngresoContextProvider = (props) => {
    const [ingresos, setIngresos] = useState([])
    const [cuentasxCobrar, setCuentasxCobrar] = useState([])
    const [cxcPdv, setCxcPdv] = useState([])

    const loadIngresosxFecha = async (fecha) =>{
        const res = await getIngresos(fecha)
        setIngresos(res.ingresos)
    }

    const loadIngresosxMes = async (year, month) => {
        const res = await getIngresosxMes(year, month)
        setIngresos(res.ingresos)
    }

    const loadCuentasPorCobrar = async () => {
        let res = await getCuentasPorCobrar()
        setCuentasxCobrar(res.cuentas)
		return res
    }

    const loadCuentasPorCobrarPdv = async () => {
        let res = await getCxcPdv()
            setCxcPdv(res.cuentas)
    }

    const addIngreso = async (ingreso) => {
        const res = await saveIngreso(ingreso)
        setIngresos([...ingresos, res.ingreso])
        return res
    }

    const removeIngreso = async (id) => {
        const res = await delIngreso(id)
        setIngresos(ingresos.filter(ingreso=>ingreso._id !== id))
        return res
    }

    const addPagoCxc = async (pago) => {
		const res = await savePagoACuentaPorCobrar(pago)
        return res        
    }

    const addVenta = async (venta) =>{
		let res = await saveVenta(venta)
        return res
	}

    return (
        <IngresoContext.Provider value={{
            ingresos,
            loadIngresosxFecha,
            loadIngresosxMes,
            addIngreso,
            removeIngreso,
            addPagoCxc,
            loadCuentasPorCobrar,
            cuentasxCobrar,
            cxcPdv,
            loadCuentasPorCobrarPdv,
            addVenta
        }}>
            {props.children}
        </IngresoContext.Provider>
    )
}
export default IngresoContextProvider