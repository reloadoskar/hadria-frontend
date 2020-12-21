import { useState, useEffect } from 'react';
import { getInventario, getInventarioBy } from '../api'
// import { sumImporte, sumStock } from '../Tools'
const useInventario = () => {
	const [inventario, setInventario] = useState(null)
	const [invUbic, setInvUbic] = useState(null)
	const [totalInventario, setTotalInventario] = useState(0)
	useEffect(() => {
		async function loadInventario() {
			const res = await getInventario()
			setInventario(res.inventario);
		}
		loadInventario()
		return () => {
			setInventario([])
		}
	}, [])

	useEffect(() => {
		if(inventario !== null){
			var i = inventario.compras
			var tti = 0
			i.map(compra => {
				return compra.items.map(itm=>{
					return tti += itm.stock * itm.costo
				})
			})
			setTotalInventario(tti)
		}

		return () => {
			setTotalInventario(0)
		}
	},[inventario])

	const getInvUbic = (ubic) => {
		return getInventarioBy(ubic).then(res => {
			setInvUbic(res.inventario)
			return res.inventario
		})
	}

	return {
		inventario,
		invUbic,
		getInvUbic,
		totalInventario
	}
};

export default useInventario;