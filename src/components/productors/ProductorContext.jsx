import React, {createContext, useState} from 'react';
import { useContext } from 'react';
import { getProvedors, saveProvedor, deleteProvedor, updateProvedor, getComprasMesProvedor } from '../api'

export const ProductorContext = createContext()

export const useProductors = () =>{
    return useContext(ProductorContext)
}

const ProductorContextProvider = (props) => {
    const [productors, setProductors] = useState([]) 
    const [comprasMesProductor, setComprasMesProductor] = useState([])

    const loadProductors = async (user) => {
		const res = await getProvedors(user)
		setProductors(res.provedors);
        return res
    }

    const loadComprasMesProductor = async (user, year, month) => {
        setComprasMesProductor([])
        const res = await getComprasMesProvedor(user,year,month)
        setComprasMesProductor(res.compras)
        return res.compras
    }
    
    const addProductor = async (user, newp) => {        
        const res = await saveProvedor(user, newp)
        setProductors([res.provedor, ...productors])
        return res
    }

    const removeProductor = async (user, id) => {
        const res = await deleteProvedor(user, id)
        setProductors(productors.filter(productor => productor._id !== id))
        return res
    }

    const editProductor = async (user, productor) => {
        const res = await updateProvedor(user, productor)
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
 