import { useState, useEffect } from 'react';
import { getProduccionItems, addProduccionItem as add, delProduccionItem as del, subtractProduccionItemStock, addProduccionItemStock } from '../api'
const useProduccionItems = (produccion_id) => {
	const [updating, setUpdating] = useState(false)
	const [produccionItems, setProduccionItems] = useState(null)
	useEffect(() => {
		async function loadItems() {
			if(produccion_id){
				const res = await getProduccionItems(produccion_id)
				setProduccionItems(res.items);
			}else{
				return false
			}
		}
		loadItems()
	}, [produccion_id, updating])

	function addProduccionItem(item) {
        setUpdating(true)
		return add(item).then(res => {
			setUpdating(false)
			return res
		})
	}

	function delProduccionItem(item) {
		setUpdating(true)
		return del(item).then(res => {
			setUpdating(false)
			return res
		})
	}

	const restaProduccionItemStock = (id, cantidad) => {
		setUpdating(true)
		return subtractProduccionItemStock(id, cantidad)
			.then (() => {
				setUpdating(false)
			})
	}

	const sumaProduccionItemStock = (id, cantidad) => {
		setUpdating(true)
		return addProduccionItemStock(id, cantidad)
			.then(() => {
				setUpdating(false)
			})
	}

	return {
		produccionItems,
        addProduccionItem,
        delProduccionItem,
		restaProduccionItemStock,
		sumaProduccionItemStock
	}
};

export default useProduccionItems;