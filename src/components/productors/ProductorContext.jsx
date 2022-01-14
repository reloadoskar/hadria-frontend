import React, {createContext, useState} from 'react';
import { getProvedors, saveProvedor, deleteProvedor, updateProvedor, getComprasMesProvedor } from '../api'

export const ProductorContext = createContext()

const ProductorContextProvider = (props) => {
    const [productors, setProductors] = useState([]) 
    const [comprasMesProductor, setComprasMesProductor] = useState([])
    const loadProductors = async () => {
		const res = await getProvedors()
		setProductors(res.provedors);
        return res
    }
    const loadComprasMesProductor = async (year, month) => {
        setComprasMesProductor([])
        const res = await getComprasMesProvedor(year,month)
        setComprasMesProductor(res.compras)
        return res.compras
    }
    const addProductor = async (newp) => {
        
        const res = await saveProvedor(newp)
        setProductors([...productors, res.provedor])

        return res
    }

    const removeProductor = async (id) => {

        const res = await deleteProvedor(id)
        setProductors(productors.filter(productor => productor._id !== id))

        return res
    }

    const editProductor = async (productor) => {
        const res = await updateProvedor(productor)
        return res
    }

    return ( 
        <ProductorContext.Provider value={{
            productors, 
            addProductor, 
            removeProductor, 
            loadProductors, 
            editProductor,
            loadComprasMesProductor,
            comprasMesProductor
            }}>
            {props.children}
        </ProductorContext.Provider>
     );
}
 
export default ProductorContextProvider;
 