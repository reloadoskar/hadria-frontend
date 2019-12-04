import { useState, useEffect } from 'react';
import { getConceptos, addConcepto, delConcepto } from '../api'
const useConceptos = () => {
	const [conceptos, setConceptos] = useState([])
	useEffect(() => {
		async function loadConceptos() {
			const res = await getConceptos()
			setConceptos(res.conceptos);
		}
		loadConceptos()
    }, [])
    
    const addItem = (item) => {
        const newItem = [item, ...conceptos]
        setConceptos(newItem)
    }

    const delItem = (index) => {
        const newConceptos = [...conceptos];
        newConceptos.splice(index,1);
        setConceptos(newConceptos);
    }
 
	const add = (concepto) => {
        return addConcepto(concepto).then(res => {
            addItem(res.concepto)
            return res
        })
	}
	

	const del = (id, index) =>{
        delItem(index)
		return delConcepto(id)
	}

	return {
		conceptos,
		add,
		del,
	}
};

export default useConceptos;