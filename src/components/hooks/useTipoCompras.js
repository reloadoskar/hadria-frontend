import { useState, useEffect } from 'react';
import { getTipoCompras } from '../api'
const useTipoCompras = () => {
    const [tipoCompras, setTipoCompras] = useState([])
    useEffect(() => {
        async function loadData() {
            const res = await getTipoCompras()
            setTipoCompras(res.tipoCompras);
        }
        loadData()
    }, [])

  return {
    tipoCompras
  }
};

export default useTipoCompras;