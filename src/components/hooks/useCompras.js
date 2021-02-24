import { useState, useEffect } from 'react';
import { getCompras, cancelCompra, closeCompra, saveCompra } from '../api'
const useCompras = () => {
	const [compras, setCompras] = useState(null)
	const [updating, setUpdating] = useState(false)
	useEffect(() => {
		async function loadCompras() {
			const res = await getCompras()
			setCompras(res.compras);
		}
		loadCompras()
		return () => setCompras([])
	}, [updating])

	const crearCompra = async (compra) => {
		const res = await saveCompra(compra)
			let newCompra = [...compras, res.compra]
			setCompras(newCompra)	
			return res
			// setUpdating(true)
				// return saveCompra(compra).then(res => {
			// setUpdating(!updating)
		// 	return res
		// })
	}
	
	const cancelarCompra = (id) =>{
		return cancelCompra(id).then( res => {
			setUpdating(!updating)
			// const n = compras
			// n.splice(index, 1)
			// setCompras(n)
			return res
		})
	}

	const cerrarCompra = (id) => {
		setUpdating(true)
		return closeCompra(id).then( res => {
			setUpdating(false)
			return res
		})
	}

	return {
		compras,
		crearCompra,
		cancelarCompra,
		cerrarCompra,
		updating
	}
};

export default useCompras;