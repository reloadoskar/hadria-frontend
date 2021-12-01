import React, {createContext, useState} from 'react';
import { getProvedors, saveProvedor, deleteProvedor } from '../api'

export const ProductorContext = createContext()

const ProductorContextProvider = (props) => {
    const [productors, setProductors] = useState([]) 

    const loadProductors = async () => {
		const res = await getProvedors()
		setProductors(res.provedors);
        return res
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

    return ( 
        <ProductorContext.Provider value={{productors, addProductor, removeProductor, loadProductors}}>
            {props.children}
        </ProductorContext.Provider>
     );
}
 
export default ProductorContextProvider;
 