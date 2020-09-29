import { useState, useEffect } from 'react';
import { getCompraItems, subtractStock, addStock } from '../api'
const useCompraItems = () => {
	const [updating, setUpdating] = useState(false)
	const [items, setItems] = useState(null)
	useEffect(() => {
		async function loadItems() {
			const res = await getCompraItems()
			setItems(res.items);
		}
		loadItems()
	}, [updating])

	const restaStock = (id, cantidad) => {
		setUpdating(true)
		return subtractStock(id, cantidad)
			.then (() => {
				setUpdating(false)
			})
	}

	const sumaStock = (id, cantidad) => {
		setUpdating(true)
		return addStock(id, cantidad)
			.then(() => {
				setUpdating(false)
			})
	}

	// function add() {
	// 	createProduccion().then(res => {
	// 		if (res.status === 'success') {
	// 			const newProduccion = [...produccions, res.produccion];  
	// 			setProduccions(newProduccion)
	// 		}

	// 	})
	// }

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
		items,
		restaStock,
		sumaStock,
		// add,
		// del
	}
};

export default useCompraItems;