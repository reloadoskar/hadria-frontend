import { useState, useEffect } from 'react';
import { getUnidades, addUnidad, delUnidad } from '../api'
const useUnidades = () => {
	const [unidades, setUnidades] = useState([])
	useEffect(() => {
		async function loadUnidades() {
			const res = await getUnidades()
			setUnidades(res.unidads);
		}
		loadUnidades()
		return () => {
			setUnidades([])
		}
    }, [])
    
    const addItem = (item) => {
        const newItem = [item, ...unidades]
        setUnidades(newItem)
    }

    const delItem = (index) => {
        const newUnidades = [...unidades];
        newUnidades.splice(index,1);
        setUnidades(newUnidades);
    }
 
	const add = (unidad) => {
        return addUnidad(unidad).then(res => {
            addItem(res.unidad)
            return res
        })
	}
	

	const del = (id, index) =>{
        delItem(index)
		return delUnidad(id)
	}

	return {
		unidades,
		add,
		del,
	}
};

export default useUnidades;