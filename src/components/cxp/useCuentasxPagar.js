import { useState, useEffect } from 'react';
import { getCuentasPorPagar, savePagoACuentaPorPagar } from '../api'
import { sumSaldo } from '../Tools'
const useCuentasxPagar = () => {
    const [cuentasxPagar, setCuentas] = useState([])
    const [totalCxp, setTotalCxp] = useState(0)
    const [update, setUpdate] = useState(false)
	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorPagar()
            setCuentas(res.cuentas);
		}
		loadCuentas()
		return () => setCuentas([])
	}, [update])
	
	useEffect(() => {
		var tt=0
		if (cuentasxPagar !== []){
			cuentasxPagar.map((c)=>{
                return tt += sumSaldo(c.cuentas)
            })
            setTotalCxp(tt)
		}
		return () => {
			setTotalCxp(0)
		}
		
	},[cuentasxPagar])

	const addPagoCxp = (pago) => {
		return savePagoACuentaPorPagar(pago).then(res =>{
			setUpdate(!update)
			return res
		})
	}

	return {
        cuentasxPagar,
		totalCxp,
		addPagoCxp
	}
};

export default useCuentasxPagar;