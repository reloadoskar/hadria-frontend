import React, {createContext, useState} from 'react'
import { getProducts, saveProduct, deleteProduct, updateProduct, getProductosMasVendidos} from '../api'

export const ProductoContext = createContext()

const ProductoContextProvider = (props) => {
    const [productos, setProductos] = useState([])

    const loadProductos = async () => {
        const res = await getProducts()
        setProductos(res.products)
    }

    const findProductoBy = (field, search) => {
        return productos.filter(producto => producto[field].indexOf(search) !== -1 ) 
    }

    const addProducto = async (producto) => {
        const res = await saveProduct(producto)
        setProductos([...productos, res.producto])
        return res
    }

    const removeProducto = async (id) => {
        const res = await deleteProduct(id)
        setProductos(productos.filter(producto =>producto._id !== id))
        return res
    }

    const editProducto = async (producto) => {
        const res = await updateProduct(producto)
        return res
    }

    const losMasVendidos = async (year,month) => {
        const res = await getProductosMasVendidos(year, month)
        return res
    }

    return (
        <ProductoContext.Provider value={{
            productos, 
            loadProductos, 
            addProducto,
            removeProducto,
            editProducto,
            findProductoBy, losMasVendidos
        }}>
            {props.children}
        </ProductoContext.Provider>
    )

}
export default ProductoContextProvider;