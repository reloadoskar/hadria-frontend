import { useEffect, useState } from 'react'
import { getCuentasPorCobrar, getCxcCliente } from '../api'
export default function useCuentasxCobrar(){
    const [cuentasxCobrar, setCuentasxCobrar] = useState(null)
    const [cuentasxcCliente , setCuentasxcCliente] = useState(null)
    const [updating, setUpdating] = useState(false)
    useEffect(() => {
		async function loadCuentas() {
            const res = await getCuentasPorCobrar()
			setCuentasxCobrar(res.ventas);
		}
        loadCuentas()
        
        return () => setCuentasxCobrar(null)
    }, [updating])
    
    const CxcCliente = (id) => {
        getCxcCliente(id).then(res => {
            setCuentasxcCliente(res.cuentas)
        })
    } 

    return {
        cuentasxCobrar,
        cuentasxcCliente,
        CxcCliente

    }
}