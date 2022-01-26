import { useState } from 'react';
import { getProducts, saveProduct, deleteProduct, updateProduct} from '../api'
const useProducts = () => {
	const [products, setProducts] = useState([])

	async function loadProducts() {
		const res = await getProducts()
		setProducts(res.products);
		return res
	}
	
	async function addProduct(producto) {
		const res = await saveProduct(producto);
			let newP = [...products, res.producto]
			setProducts(newP)
		return res
	}

	function del(productoId) {
		return deleteProduct(productoId).then(res => {
			if(res.status === 'success'){
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
		loadProducts,
		addProduct,
		updateProducto,
		del
	}
};

export default useProducts;