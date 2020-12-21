import { useState, useEffect } from 'react';
import { getProducts, saveProduct, deleteProduct } from '../api'
const useProducts = () => {
	const [products, setProducts] = useState([])
	const [updating, setUpdating] = useState(false)

	useEffect(() => {
		async function loadProducts() {
			const res = await getProducts()
			setProducts(res.products);
		}
		loadProducts()
		return () => setProducts(null)
	}, [updating])

	function add(producto) {
		setUpdating(true)
		return saveProduct(producto).then(res => {
			if (res.status === 'success') { 
				setUpdating(false)
				return res
			}
		})
	}

	function del(productoId) {
		setUpdating(true)
		return deleteProduct(productoId).then(res => {
			if(res.status === 'success'){
				setUpdating(false)
				return res
			}
		})
	}

	return {
		products,
		add,
		del
	}
};

export default useProducts;