import { useState, useEffect } from 'react';
import { getVentas, cancelVenta } from '../api'

const useVentas = () => {
	const [ventas, setVentas] = useState([])
	useEffect(() => {
		async function loadVentas() {
			const res = await getVentas()
			setVentas(res.ventas);
		}
		loadVentas()
    }, [])
    
    const addItem = (item) => {
        const newItem = [item, ...ventas]
        //setUnidades(newItem)
    }

    const delItem = (index) => {
        const newSet = [...ventas];
        newSet.splice(index,1);
        //setUnidades(newSet);
    }

	const del = (id, index) =>{
        delItem(index)
		return cancelVenta(id)
	}

	return {
		ventas,
		del,
	}
};

export default useVentas;