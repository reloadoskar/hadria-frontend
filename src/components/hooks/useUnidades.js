import { createContext, useState, useContext } from 'react';
import { getUnidades, addUnidad, delUnidad } from '../api'

export const UnidadesContext = createContext()

export const useUnidades = () => {
	return useContext(UnidadesContext);
};

export const UnidadesProvider = ({children}) => {
	const [unidades, setUnidades] = useState([])

	async function loadUnidades(user) {
		const res = await getUnidades(user)
		setUnidades(res.unidads);
		return res
	}
    
    const addItem = (item) => {
        const newItem = [item, ...unidades]
        setUnidades(newItem)
    }

    const delItem = (index) => {
        const newUnidades = [...unidades];
        newUnidades.splice(index,1);
        setUnidades(newUnidades);
    }
 
	const add = (user, unidad) => {
        return addUnidad(user, unidad).then(res => {
            addItem(res.unidad)
            return res
        })
	}
	

	const del = (user, id, index) =>{
        delItem(index)
		return delUnidad(user, id)
	}

	return (
		<UnidadesContext.Provider value={{
			unidades,
			add,
			del,
			loadUnidades
		}}>
			{children}
		</UnidadesContext.Provider>
	)
};