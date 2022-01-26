import React, { createContext, useState } from 'react'
import { getProducts, saveProduct, 
    // deleteProduct, 
    updateProduct
} from '../api'
export const ProductosContext = createContext()

const ProductosContextProvider = (props) => {
    const [productos, setProductos] = useState([])
    const loadProductos = async () => {
        const res = await getProducts()
		setProductos(res.products);
		return res
    }
    const addProducto = async (producto) => {
        const res = await saveProduct(producto)
        setProductos([...productos, res.producto])
    }
    const editProducto = async (producto) => {
        let res = await updateProduct(producto)
        return res
    }
    return (
        <ProductosContext.Provider
        value={{
            productos, 
            loadProductos, 
            addProducto,
            editProducto
        }}
        >
            {props.children}
        </ProductosContext.Provider>
    )
}

export default ProductosContextProvider