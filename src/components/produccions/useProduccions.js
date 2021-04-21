import { useState, useEffect } from 'react';
import { getProduccions, createProduccion, delProduccion, addInsumo, delInsumo } from '../api'
const useProduccions = () => {
	const [produccions, setProduccions] = useState(null)
    const [updating, setUpdating] = useState(false)
	useEffect(() => {
		async function loadProductions() {
			const res = await getProduccions()
			setProduccions(res.produccions);
		}
		loadProductions()
	}, [updating])

	function crearProduccion() {
        setUpdating(true)
		return createProduccion().then(res => {
			if (res.status === 'success') {
				setUpdating(false)
				return res
			}
		})
	}

	function eliminarProduccion(index, produccionId) {
        setUpdating(true)
		return delProduccion(produccionId).then(res => {
			if(res.status === 'success'){
                const newProduccions = [...produccions];
                newProduccions.splice(index,1);
                setProduccions(newProduccions);
                setUpdating(false)
			}
		})
	}

	function agregarInsumo(insumo){
		setUpdating(true)
		return addInsumo(insumo).then(res => {
			setUpdating(false)
			return res
		})
	}

	function eliminarInsumo(insumo){
		setUpdating(true)
		return delInsumo(insumo).then(res => {
			setUpdating(false)
			return res
		})
	}

	return {
		produccions,
		crearProduccion,
		eliminarProduccion,
		agregarInsumo,
		eliminarInsumo
	}
};

export default useProduccions;