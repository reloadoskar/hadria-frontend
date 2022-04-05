import React, {createContext, useState} from 'react'
import { getIngresos, 
    getIngresosMonthYear,
    saveIngreso, 
    delIngreso, 
    getCuentasPorCobrar, 
    getCxcPdv, 
    updateIngreso,
    savePagoACuentaPorCobrar, 
    saveVenta 
} from '../api'
export const IngresoContext = createContext()
const IngresoContextProvider = (props) => {
    const [ingresos, setIngresos] = useState(null)
    const [cuentasxCobrar, setCuentasxCobrar] = useState(null)
    const [cxcPdv, setCxcPdv] = useState([])

    const resetIngresos = () =>{
        setIngresos([])
    }

    const loadIngresosxFecha = async (fecha) =>{
        const res = await getIngresos(fecha)
        setIngresos(res.ingresos)
    }

    const loadIngresosMonthYear = async (month, year) => {
        const res = await getIngresosMonthYear(month, year)
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
        setIngresos([...ingresos, res.ingreso])
        return res        
    }

    const addVenta = async (venta) =>{
		let res = await saveVenta(venta)
        return res
	}

    const editIngreso = async (data) =>{
        let res = await updateIngreso(data)
        return res
    }

    return (
        <IngresoContext.Provider value={{
            ingresos,
            loadIngresosxFecha,
            loadIngresosMonthYear,
            addIngreso,
            removeIngreso,
            addPagoCxc,
            loadCuentasPorCobrar,
            cuentasxCobrar,
            cxcPdv,
            loadCuentasPorCobrarPdv,
            addVenta,
            editIngreso,
            resetIngresos
        }}>
            {props.children}
        </IngresoContext.Provider>
    )
}
export default IngresoContextProvider