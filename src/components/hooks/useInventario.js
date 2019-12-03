import { useState, useEffect } from 'react';
import { getInventario } from '../api'
const useInventario = () => {
	const [inventario, setInventario] = useState([])
	useEffect(() => {
		async function loadInventario() {
			const res = await getInventario()
			setInventario(res.inventario);
		}
		loadInventario()
	}, [])

	return {
		inventario,
	}
};

export default useInventario;