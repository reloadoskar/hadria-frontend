import { useState, useEffect } from 'react';
import { getInventario, getInventarioBy, getInventarioUbicacion, moveInventario } from '../api'
// import { sumImporte, sumStock } from '../Tools'
const useInventario = () => {
	const [inventario, setInventario] = useState(null)
	const [invxubic, setInvxubic] = useState(null)
	const [invUbic, setInvUbic] = useState(null)
	const [totalInventario, setTotalInventario] = useState(0)
	const [updating, setUpdating] = useState(false)
	useEffect(() => {
		async function loadInventario() {
			const res = await getInventario()
			setInventario(res.inventario);
		}
		loadInventario()
		return () => {
			setInventario([])
		}
	}, [updating])

	useEffect(() => {
		if(inventario !== null){
			var tti = 0
			inventario.map(compra => {
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

	useEffect(() => {
		getInventarioUbicacion().then(res => {
			setInvxubic(res.inventario)
		})
		return () => {
			setInvxubic(null)
		}
	}, [])

	const getInvUbic = (ubic) => {
		return getInventarioBy(ubic).then(res => {
			setInvUbic(res.inventario)
			return res.inventario
		})
	}

	const mover = (movimiento) => {
		return moveInventario(movimiento).then(res=>{
			setUpdating(!updating)
			return res
		})
	}

	return {
		inventario,
		invUbic,
		invxubic,
		getInvUbic,
		totalInventario,
		mover
	}
};

export default useInventario;