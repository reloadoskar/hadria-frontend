import { useState, useEffect } from 'react';
import { getEgresos, saveEgreso, getCuentasPorPagar, savePagoACuentaPorPagar, deleteEgreso
	// getDisponiblexUbicacion 
	} from '../api'
import { sumImporte, sumSaldo } from '../Tools'
const useEgresos = () => {
	const [egresos, setEgresos] = useState([])
	const [totalEgresos, setTotalEgresos] = useState(null)
	
	const [cuentasxPagar, setCuentas] = useState([])
	const [totalCxp, setTotalCxp] = useState(0)

	const [updating, setUpdating] = useState(false)

	async function loadEgresos(fecha) {
		const res = await getEgresos(fecha)
		if(res !== undefined){
			setEgresos(res.egresos)
		}
		return res
	}
	
	useEffect(() => {
		if(egresos!==[]){
			setTotalEgresos(sumImporte(egresos))
		}
	}, [egresos])
	
	async function loadCuentas() {
		const res = await getCuentasPorPagar()
		if(res !== undefined){
			setCuentas(res.cuentas)
		}
	}
	
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

	const addEgreso = (egreso) => {
		return saveEgreso(egreso).then(res=>{
			setEgresos([...egresos, res.egreso])
			setUpdating(!updating)
			return res
		})
	}

	const addPagoCxp = (pago) => {
		return savePagoACuentaPorPagar(pago).then(res =>{
			setEgresos([...egresos, res.pago])
			setUpdating(!updating)
			return res
		})
	}

	const delEgreso = async (id) => {
		const res = await deleteEgreso(id)
			return res
	}

	return {
		egresos,
		totalEgresos,
		cuentasxPagar,
		totalCxp,
		addEgreso, 
		loadEgresos,
		loadCuentas,
		addPagoCxp,
		delEgreso
	}
};

export default useEgresos;