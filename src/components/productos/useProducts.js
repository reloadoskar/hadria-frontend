import { useState, useEffect } from 'react';
import { getProducts, saveProduct, deleteProduct, updateProduct} from '../api'
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
	}, [])

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

	const updateProducto = (productoId, data) =>{
		return updateProduct(productoId, data)
		.then(res=>{
				return res
			})
	}

	return {
		products,
		addProduct,
		updateProducto,
		del
	}
};

export default useProducts;