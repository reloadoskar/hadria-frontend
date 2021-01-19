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
		return () => setProducts([])
	}, [updating])

	async function addProduct(producto) {
		const res = await saveProduct(producto);
		setUpdating(!updating)
		return res;
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
		addProduct,
		del
	}
};

export default useProducts;