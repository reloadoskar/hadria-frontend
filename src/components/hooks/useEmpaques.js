import { useState, useEffect } from 'react';
import { getEmpaques, addEmpaque, delEmpaque } from '../api'
const useEmpaques = () => {
	const [empaques, setEmpaques] = useState([])
	useEffect(() => {
		async function loadEmpaques() {
			const res = await getEmpaques()
			setEmpaques(res.empaques);
		}
		loadEmpaques()
    }, [])
    
    const addItem = (item) => {
        const newItem = [item, ...empaques]
        setEmpaques(newItem)
    }

    const delItem = (index) => {
        const newEmpaques = [...empaques];
        newEmpaques.splice(index,1);
        setEmpaques(newEmpaques);
    }
 
	const add = (empaque) => {
        return addEmpaque(empaque).then(res => {
            addItem(res.empaque)
            return res
        })
	}
	

	const del = (id, index) =>{
        delItem(index)
		return delEmpaque(id)
	}

	return {
		empaques,
		add,
		del,
	}
};

export default useEmpaques;