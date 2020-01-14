import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getProduccions, createProduccion, delProduccion } from '../api'
const useProduccions = () => {
	const [produccions, setProduccions] = useState(null)
	const { enqueueSnackbar } = useSnackbar()
	useEffect(() => {
		async function loadProvedors() {
			const res = await getProduccions()
			setProduccions(res.produccions);
		}
		loadProvedors()
	}, [])

	function add() {
		createProduccion().then(res => {
			if (res.status === 'success') {
				const newProduccion = [...produccions, res.produccion];  
				setProduccions(newProduccion)
			}
			enqueueSnackbar(res.message, { variant: res.status })
		})
	}

	function del(index, produccionId) {
		delProduccion(produccionId).then(res => {
			if(res.status === 'success'){
				const newProduccions = [...produccions];
                newProduccions.splice(index,1);
                setProduccions(newProduccions);
			}
			enqueueSnackbar(res.message, { variant: res.status });
		})
	}

	return {
		produccions,
		add,
		del
	}
};

export default useProduccions;