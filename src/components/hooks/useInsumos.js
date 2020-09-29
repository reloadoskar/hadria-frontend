import { useState, useEffect } from 'react';
import { getInsumos, addInsumo, delInsumo } from '../api'
const useInsumos = (produccion_id) => {
	const [updating, setUpdating] = useState(false)
	const [insumos, setInsumos] = useState([])
	useEffect(() => {
		async function loadInsumos() {
			if(produccion_id){
				const res = await getInsumos(produccion_id)
				setInsumos(res.insumos);
			}else{
				return false
			}
		}
		loadInsumos()
	}, [produccion_id, updating])

	function add(insumo) {
		setUpdating(true)
		return addInsumo(insumo).then(res => {
			setUpdating(false)
			return res
		})
	}

	function del(insumo) {
		setUpdating(true)
		return delInsumo(insumo).then(res => {
			setUpdating(false)
			return res
		})
	}

	// function del(index, produccionId) {
	// 	delProduccion(produccionId).then(res => {
	// 		if(res.status === 'success'){
	// 			const newProduccions = [...produccions];
    //             newProduccions.splice(index,1);
    //             setProduccions(newProduccions);
	// 		}
	// 	})
	// }

	return {
		insumos,
		add,
		del
	}
};

export default useInsumos;