import { useState, createContext, useContext } from 'react';
import { getEmpaques, addEmpaque, delEmpaque } from '../api'

export const EmpaquesContext = createContext()

export const useEmpaques = () =>{
	return useContext(EmpaquesContext)
}
export const EmpaquesProvider = ({children}) => {
	const [empaques, setEmpaques] = useState([])
	
	async function loadEmpaques(user) {
		const res = await getEmpaques(user)
		setEmpaques(res.empaques);
	}
    
    const addItem = (item) => {
        const newItem = [item, ...empaques]
        setEmpaques(newItem)
    }

    const delItem = (index) => {
        const newEmpaques = [...empaques];
        newEmpaques.splice(index,1);
        setEmpaques(newEmpaques);
    }
 
	const add = (user, empaque) => {
        return addEmpaque(user, empaque).then(res => {
            addItem(res.empaque)
            return res
        })
	}
	

	const del = (user, id, index) =>{
        delItem(index)
		return delEmpaque(user, id)
	}

	return (
		<EmpaquesContext.Provider value={{
			empaques,
			add,
			del,
			loadEmpaques
		}}>
			{children}
		</EmpaquesContext.Provider>
	)
};