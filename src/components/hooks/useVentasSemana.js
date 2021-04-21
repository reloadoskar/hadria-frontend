import { useState, useEffect } from 'react';
import { getVentasSemana } from '../api'
import useRangoFechas from '../ventas/useRangoFechas';

const formatearFecha = (fecha) => {
	var reversed = fecha.split('-').reverse()

	return reversed[1] + "/" + reversed[0]
}

const useVentasSemana = () => {
    
    const [ventasSemana, setVentasSemana] = useState()
    const {rango, setRango} = useRangoFechas()
	useEffect(() => {
		async function loadVentas() {
            if(rango != null){
                const res = await getVentasSemana(rango.f1, rango.f2)
                let nvoArray = []
                res.ventas.forEach(e => {
                    nvoArray.push({x: formatearFecha(e._id),  y: e.totalVenta})
                });
                setVentasSemana(nvoArray)
                
            }
		}
        loadVentas()
        
        return () => {
            setVentasSemana(null)
        }
    }, [rango])
    
    
	return {
        ventasSemana,
        rango,
        setRango
	}
};

export default useVentasSemana;