import { useEffect, useState } from 'react'
import { getCuentasPorCobrar, getCxcCliente, savePagoACuentaPorCobrar } from '../api'
import { sumSaldo } from '../Tools'
export default function useCuentasxCobrar(){
    const [cuentasxCobrar, setCuentasxCobrar] = useState(null)
    const [totalCxc, setTotalCxc] = useState(0)
    const [cuentasxcCliente , setCuentasxcCliente] = useState(null)
    const [updating, setUpdating] = useState(false)
    useEffect(() => {
		async function loadCuentas(user) {
            const res = await getCuentasPorCobrar(user)
            setCuentasxCobrar(res.clientes);
            // setTotalCxc(sumSaldo(res.cuentas))
		}
        loadCuentas()        
        return () => setCuentasxCobrar(null)
    }, [updating])

    useEffect(() => {
        var tt = 0
        if(cuentasxCobrar!== null){
            cuentasxCobrar.map((c)=>{
                return tt += sumSaldo(c.cuentas)
            })
            setTotalCxc(tt)
        }
    },[cuentasxCobrar])
    
    const CxcCliente = (user, id) => {
        return getCxcCliente(user, id).then(res => {
            setCuentasxcCliente(res.cuentas)
        })
    } 

    // const addCxc = (cuenta) => {
        
    // }

    const addPagoCxc = async (user, pago) => {
        setUpdating(true)
        let res  = await savePagoACuentaPorCobrar(user, pago).then(()=>setUpdating(false)})
        return res
    }

    return {
        cuentasxCobrar,
        cuentasxcCliente,
        CxcCliente, 
        addPagoCxc,
        totalCxc
    }
}