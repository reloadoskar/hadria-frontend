import { useState, useEffect } from 'react';
import { getProduccions, createProduccion, delProduccion } from '../api'
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

	function add() {
        setUpdating(true)
		return createProduccion().then(res => {
			if (res.status === 'success') {
				const newProduccion = [...produccions, res.produccion];  
				setProduccions(newProduccion)
                setUpdating(false)
			}
		})
	}

	function del(index, produccionId) {
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

	return {
		produccions,
		add,
		del
	}
};

export default useProduccions;