import { useState, useEffect } from 'react';
import { getTipoCompras, createTipoCompra } from '../api'
const useTipoCompras = () => {
    const [tipoCompras, setTipoCompras] = useState([])
    const [updating, setUpdating] = useState(false)
    
    useEffect(() => {
        async function loadData() {
            const res = await getTipoCompras()
            setTipoCompras(res.tipoCompras);
        }
		loadData()
		return () => setTipoCompras([])
	}, [updating])
	
	function addTipoCompra(tipoCompra) {
		setUpdating(true)
		return createTipoCompra(tipoCompra).then(res => {
			if (res.status === 'success') {
				const newTipoCompras = [...tipoCompras, res.tipocompra];  
				setTipoCompras(newTipoCompras)
				setUpdating(false)
				return res
			}
		})
	}

  return {
	tipoCompras,
	addTipoCompra
  }
};

export default useTipoCompras;