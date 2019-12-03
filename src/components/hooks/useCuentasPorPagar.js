import { useState, useEffect } from 'react';
import { getCuentasPorPagar } from '../api'

const useCuentasPorPagar = () => {
    const [cuentas, setCuentas] = useState([])
    
	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorPagar()
			setCuentas(res.cuentas);
		}
		loadCuentas()
	}, [])

	return {
		cuentas,
	}
};

export default useCuentasPorPagar;