import { useState, useEffect, useRef } from 'react';
import { getCompraItems, subtractStock, addStock } from '../api'
import { useAuth } from '../auth/use_auth'
import { mergeById } from '../pagination'
import { createLatestRequest } from '../latestRequest'
const useCompraItems = () => {
	const {user} = useAuth()
	const [updating, setUpdating] = useState(false)
	const [items, setItems] = useState(null)
	const [search, setSearch] = useState('')
	const [pagination, setPagination] = useState({hasMore: false, nextCursor: null, limit: 50})
	const [loading, setLoading] = useState(false)
	const requests = useRef(createLatestRequest())

	const loadItems = async (value = search, append = false) => {
		const requestId = requests.current.next()
		setLoading(true)
		try{
			const cursor = append ? pagination.nextCursor : null
			const res = await getCompraItems(user, value, {limit: 50, cursor})
			if(requests.current.isCurrent(requestId)){
				setItems(current => append ? mergeById(current || [], res.items) : res.items)
				setPagination(res.pagination || {hasMore: false, nextCursor: null, limit: 50})
				setSearch(value)
			}
			return res
		}finally{
			if(requests.current.isCurrent(requestId)) setLoading(false)
		}
	}

	useEffect(() => {
		if(user) loadItems('', false)
		return () => setItems(null)
	}, [updating, user]) // eslint-disable-line react-hooks/exhaustive-deps

	const searchItems = value => loadItems(value, false)
	const loadMoreItems = () => pagination.hasMore ? loadItems(search, true) : Promise.resolve(null)

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
		searchItems,
		loadMoreItems,
		hasMoreItems: pagination.hasMore,
		loadingItems: loading,
		// add,
		// del
	}
};

export default useCompraItems;