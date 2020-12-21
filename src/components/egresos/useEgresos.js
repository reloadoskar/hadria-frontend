import { useState, useEffect } from 'react';
import { getEgresos, saveEgreso } from '../api'
import { sumImporte } from '../Tools'
const useEgresos = () => {
	const [egresos, setEgresos] = useState([])
	const [totalEgresos, setTotalEgresos] = useState(0)
	// const [updating, setUpdating] = useState(false)
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

	const addEgreso = (egreso) => {
		// setUpdating(true)
		return saveEgreso(egreso).then(res=>{
			setEgresos([...egresos, res.egreso])
			// setUpdating(false)
			return res
		})
	}

	return {
		egresos,
		addEgreso, 
		totalEgresos
	}
};

export default useEgresos;