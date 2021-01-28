import { useState, useEffect } from 'react';
import { getEgresos, saveEgreso, getCuentasPorPagar, savePagoACuentaPorPagar, getDisponiblexUbicacion } from '../api'
import { sumImporte, sumSaldo } from '../Tools'
const useEgresos = () => {
	const [egresos, setEgresos] = useState([])
	const [totalEgresos, setTotalEgresos] = useState(0)
	const [updating, setUpdating] = useState(false)
	useEffect(() => {
		async function loadEgresos() {
			const res = await getEgresos()
			setEgresos(res.egresos);
		}
        loadEgresos()
        return () => {
			setEgresos([])
        }
	}, [])
	
	useEffect(() => {
		if(egresos!==[]){
			setTotalEgresos(sumImporte(egresos))
		}
	}, [egresos])
	const [disp, setDisp] = useState([])
	useEffect(()=>{
        getDisponiblexUbicacion().then(res=>{
            let disp = []
            res.forEach(el => {
                disp.push({ubicacion: el.nombre, disponible: (sumImporte(el.ingresos) - sumImporte(el.egresos))})
            })
            setDisp(disp)
        })
        return () => setDisp([])
    }, [updating])
	
	const [cuentasxPagar, setCuentas] = useState([])
	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorPagar()
            setCuentas(res.cuentas);
		}
		loadCuentas()
		return () => setCuentas([])
	}, [updating])

	const [totalCxp, setTotalCxp] = useState(0)
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

	return {
		egresos,
		totalEgresos,
		addEgreso, 
		
		cuentasxPagar,
		totalCxp,
		addPagoCxp,

		disp
	}
};

export default useEgresos;