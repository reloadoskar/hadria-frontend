import { useState, useEffect } from 'react';
import { getProducts, saveProduct, deleteProduct } from '../api'
const useProducts = () => {
	const [products, setProducts] = useState(null)
	const [updating, setUpdating] = useState(false)

	useEffect(() => {
		async function loadProducts() {
			const res = await getProducts()
			setProducts(res.products);
		}
		loadProducts()
		
	}, [updating])

	function add(producto) {
		setUpdating(true)
		return saveProduct(producto).then(res => {
			if (res.status === 'success') {
				const newProduct = [res.producto, ...products];  
				setProducts(newProduct)
				setUpdating(false)
				return res
			}
		})
	}

	function del(index, productoId) {
		setUpdating(true)
		return deleteProduct(productoId).then(res => {
			if(res.status === 'success'){
				const newProducts = [...products];
                newProducts.splice(index,1);
				setProducts(newProducts);
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