import { useState } from 'react';
import { getCompras, cancelCompra, closeCompra, saveCompra, getCompra, recuperaVentasCompra, getComprasDash } from '../api'
const useCompras = () => {
	const [compras, setCompras] = useState(null)

	const loadCompras = async () => {
		const res = await getCompras()
			if (res !== undefined){
				setCompras(res.compras);
			}
	}

	const crearCompra = async (compra) => {
		const res = await saveCompra(compra)
			let newCompra = [...compras, res.compra]
			setCompras(newCompra)	
			return res
	}
	
	const cancelarCompra = (id) =>{
		return cancelCompra(id).then( res => {
			// const n = compras
			// n.splice(index, 1)
			// setCompras(n)
			return res
		})
	}

	const cerrarCompra = (id) => {
		return closeCompra(id).then( res => {
			return res
		})
	}

	const findCompra = (id) => {
		return getCompra(id).then( res => {
			return res
		})
	}

	const recuperarVentas = (id) => {
		return recuperaVentasCompra(id)
			.then( res => {
				return res
			})
	}

	const getCompDash = async () => {
		const res = await getComprasDash();
		setCompras(res.compras)
		return res;
	}

	return {
		compras,
		loadCompras,
		crearCompra,
		cancelarCompra,
		cerrarCompra,
		findCompra,
		recuperarVentas,
		getCompDash
	}
};

export default useCompras;