import { useState, useEffect } from 'react';
import { getVentas, delVenta } from '../api'
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
        setUnidades(newItem)
    }

    const delItem = (index) => {
        const newSet = [...ventas];
        newSet.splice(index,1);
        setUnidades(newSet);
    }
 
	const add = (venta) => {
        return addVenta(venta).then(res => {
            addItem(res.venta)
            return res
        })
	}
	

	const del = (id, index) =>{
        delItem(index)
		return delVenta(id)
	}

	return {
		ventas,
		add,
		del,
	}
};

export default useVentas;