import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { getProducts, saveProduct, deleteProduct, updateProduct, getProductosMasVendidos} from '../api'

export const ProductosContext = createContext()

export const useProductos = () =>{
    return useContext(ProductosContext)
}

const ProductosContextProvider = (props) => {
    const [productos, setProductos] = useState([])
    const loadProductos = async (user) => {
        const res = await getProducts(user)
		setProductos(res.products);
		return res
    }
    const addProducto = async (user, data) => {
        const res = await saveProduct(user,data)
        setProductos([res.producto,...productos])
        return res
    }
    const editProducto = async (user, data) => {
        let res = await updateProduct(user, data)
        return res
    }
    
    const findProductoBy = (field, search) =>{
        return productos.filter(producto => producto[field].indexOf(search) !== -1 ) 
    }

    const removeProducto = async (user, id) => {
        const res = await deleteProduct(user, id)
        setProductos(productos.filter(producto =>producto._id !== id))
        return res
    }

    const losMasVendidos = async (user, year,month) => {
        const res = await getProductosMasVendidos(user, year, month)
        return res
    }
    return (
        <ProductosContext.Provider
        value={{
            productos, 
            loadProductos, 
            addProducto,
            editProducto,
            findProductoBy,
            removeProducto,
            losMasVendidos
        }}
        >
            {props.children}
        </ProductosContext.Provider>
    )
}

export default ProductosContextProvider