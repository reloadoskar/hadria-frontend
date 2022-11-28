import React, {createContext, useState} from 'react'
import { useContext } from 'react'
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
export const useIngresos = () =>{
    return useContext(IngresoContext)
}
const IngresoContextProvider = (props) => {
    const [ingresos, setIngresos] = useState(null)
    const [cuentasxCobrar, setCuentasxCobrar] = useState(null)
    const [cxcPdv, setCxcPdv] = useState([])

    const resetIngresos = () =>{
        setIngresos([])
    }

    const loadIngresosxFecha = async (user, fecha) =>{
        const res = await getIngresos(user, fecha)
        setIngresos(res.ingresos)
    }

    const loadIngresosMonthYear = async (user, month, year) => {
        const res = await getIngresosMonthYear(user, month, year)
        setIngresos(res.ingresos)
    }

    const loadCuentasPorCobrar = async (user) => {
        let res = await getCuentasPorCobrar(user)
        setCuentasxCobrar(res.cuentas)
		return res
    }

    const loadCuentasPorCobrarPdv = async (user) => {
        let res = await getCxcPdv(user)
            setCxcPdv(res.cuentas)
    }

    const addIngreso = async (user, ingreso) => {
        const res = await saveIngreso(user, ingreso)
        setIngresos([...ingresos, res.ingreso])
        return res
    }

    const removeIngreso = async (user, id) => {
        const res = await delIngreso(user, id)
        setIngresos(ingresos.filter(ingreso=>ingreso._id !== id))
        return res
    }

    const addPagoCxc = async (user, pago) => {
		const res = await savePagoACuentaPorCobrar(user, pago)
        setIngresos([...ingresos, res.ingreso])
        return res        
    }

    const addVenta = async (user, venta) =>{
		let res = await saveVenta(user, venta)
        return res
	}

    const editIngreso = async (user, data) =>{
        let res = await updateIngreso(user,data)
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