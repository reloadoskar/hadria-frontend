import { useState, useEffect } from 'react';
import { getCompras, cancelCompra, closeCompra, saveCompra, getCompra } from '../api'
const useCompras = () => {
	const [compras, setCompras] = useState(null)
	const [upCompras, setUpCompras] = useState(false)
	useEffect(() => {
		async function loadCompras() {
			const res = await getCompras()
			if (res !== undefined){
				setCompras(res.compras);
			}
		}
		loadCompras()
		return () => setCompras([])
	}, [upCompras])

	const crearCompra = async (compra) => {
		const res = await saveCompra(compra)
			let newCompra = [...compras, res.compra]
			setCompras(newCompra)	
			return res
	}
	
	const cancelarCompra = (id) =>{
		return cancelCompra(id).then( res => {
			setUpCompras(!upCompras)
			// const n = compras
			// n.splice(index, 1)
			// setCompras(n)
			return res
		})
	}

	const cerrarCompra = (id) => {
		return closeCompra(id).then( res => {
			setUpCompras(!upCompras)
			return res
		})
	}

	const findCompra = (id) => {
		return getCompra(id).then( res => {
			return res
		})
	}

	return {
		compras,
		crearCompra,
		cancelarCompra,
		cerrarCompra,
		upCompras,
		setUpCompras, 
		findCompra
	}
};

export default useCompras;