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
	}, [])

	const crear = (compra) => {
		// setUpdating(true)
		return saveCompra(compra).then(res => {
			const newCompra = [...compras, res.compra]
			setCompras(newCompra)	
			// setUpdating(!updating)
			return res
		})
	}
	
	const eliminar = (id, index) =>{
		return cancelCompra(id).then( res => {
			// setUpdating(!updating)
			const n = compras
			n.splice(index, 1)
			setCompras(n)
			return res
		})

	}

	const cerrar = (id) => {
		setUpdating(true)
		return closeCompra(id).then( res => {
			setUpdating(false)
			return res
		})
	}

	return {
		compras,
		cerrar,
		crear,
		eliminar,
		updating
	}
};

export default useCompras;