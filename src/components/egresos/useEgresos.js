import { useState, useEffect } from 'react';
import { getEgresos } from '../api'

const useEgresos = () => {
    const [egresos, setEgresos] = useState([])
    
	useEffect(() => {
		async function loadEgresos() {
			const res = await getEgresos()
			setEgresos(res.egresos);
		}
        loadEgresos()
        return () => {
            setEgresos([])
        }
	}, [])

	return {
		egresos,
	}
};

export default useEgresos;