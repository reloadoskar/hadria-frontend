import { useState, useEffect } from 'react';
import { getCuentasPorCobrar } from '../api'

const useCuentasPorCobrar = () => {
    const [cuentas, setCuentas] = useState([])
    
	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorCobrar()
			setCuentas(res.cuentas);
		}
		loadCuentas()
	}, [])

	return {
		cuentas,
	}
};

export default useCuentasPorCobrar;