import { useState, useEffect } from 'react';
import { getCompras, } from '../api'
const useCompras = () => {
	const [compras, setCompras] = useState(null)
	useEffect(() => {
		async function loadCompras() {
			const res = await getCompras()
			setCompras(res.compras);
		}
		loadCompras()
	}, [])

	const addCompra = (compra) => {
		const newCompra = [compra, ...compras]
		setCompras(newCompra)	
	}
	

	const del = () =>{
		return null
	}

	return {
		compras,
		addCompra,
		del,
	}
};

export default useCompras;