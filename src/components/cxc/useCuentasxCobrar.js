import { useEffect, useState } from 'react'
import { getCuentasPorCobrar } from '../api'
export default function useCuentasxCobrar(){
    const [cuentasxCobrar, setCuentasxCobrar] = useState(null)
    const [updating, setUpdating] = useState(false)
    useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorCobrar()
			setCuentasxCobrar(res.ventas);
		}
        loadCuentas()
        
        return () => setCuentasxCobrar(null)
	}, [updating])
    return {
        cuentasxCobrar

    }
}