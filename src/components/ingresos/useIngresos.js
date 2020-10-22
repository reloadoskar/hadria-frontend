import { useState, useEffect } from 'react';
import { getIngresos } from '../api'

const useIngresos = () => {
    const [ingresos, setIngresos] = useState([])
    
	useEffect(() => {
		async function loadIngresos() {
			const res = await getIngresos()
			setIngresos(res.ingresos);
		}
        loadIngresos()
        return () => {
            setIngresos([])
        }
	}, [])

	return {
		ingresos,
	}
};

export default useIngresos;