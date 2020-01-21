import { useState, useEffect } from 'react';
import { getCompras, cancelCompra } from '../api'
const useCompras = () => {
	const [compras, setCompras] = useState(null)
	const [updating, setUpdating] = useState(false)
	useEffect(() => {
		async function loadCompras() {
			const res = await getCompras()
			setCompras(res.compras);
		}
		loadCompras()
	}, [updating])

	const addCompra = (compra) => {
		setUpdating(true)
		const newCompra = [compra, ...compras]
		setCompras(newCompra)	
	}
	

	const del = (id) =>{
		setUpdating(true)
		return cancelCompra(id).then( res => {
			setUpdating(false)
			return res
		})

	}

	return {
		compras,
		addCompra,
		del,
	}
};

export default useCompras;