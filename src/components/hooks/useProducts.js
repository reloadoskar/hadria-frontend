import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getProducts, saveProduct, deleteProduct } from '../api'
const useProducts = () => {
	const [products, setProducts] = useState(null)
	const { enqueueSnackbar } = useSnackbar()
	useEffect(() => {
		async function loadProvedors() {
			const res = await getProducts()
			setProducts(res.products);
		}
		loadProvedors()
	}, [])

	function add(producto) {
		saveProduct(producto).then(res => {
			if (res.status === 'success') {
				const newProduct = [res.producto, ...products];  
				setProducts(newProduct)
			}
			enqueueSnackbar(res.message, { variant: res.status })
		})
	}

	function del(index, productoId) {
		deleteProduct(productoId).then(res => {
			if(res.status === 'success'){
				const newProducts = [...products];
                newProducts.splice(index,1);
                setProducts(newProducts);
			}
			enqueueSnackbar(res.message, { variant: res.status });
		})
	}

	return {
		products,
		add,
		del
	}
};

export default useProducts;