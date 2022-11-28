import { createContext, useContext, useState } from 'react';
import { getConceptos, addConcepto, delConcepto } from '../api'

export const ConceptosContext = createContext()

export const useConceptos= () =>{
	return useContext(ConceptosContext)
}
export const ConceptosProvider = ({children}) => {
	const [conceptos, setConceptos] = useState([])
	async function loadConceptos(user) {
		const res = await getConceptos(user)
		setConceptos(res.conceptos);
	}
	
    const addItem = (item) => {
        const newItem = [item, ...conceptos]
        setConceptos(newItem)
    }

    const delItem = (index) => {
        const newConceptos = [...conceptos];
        newConceptos.splice(index,1);
        setConceptos(newConceptos);
    }
 
	const add = (user, concepto) => {
        return addConcepto(user, concepto).then(res => {
            addItem(res.concepto)
            return res
        })
	}
	

	const del = (user, id, index) =>{
        delItem(index)
		// setConceptos(productos.filter(producto =>producto._id !== id))
		return delConcepto(user, id)
	}

	return (
		<ConceptosContext.Provider value={{
			conceptos,
			loadConceptos,
			add,
			del,
		}}>
			{children}
		</ConceptosContext.Provider>
	)
};