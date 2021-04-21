import { useState, useEffect } from 'react';
import useRangoFechas from './useRangoFechas'
import { getVentas, cancelVenta, getVenta, getVentasSemana } from '../api'

const formatearFecha = (fecha) => {
	let reversed = fecha.split('-').reverse()
	return reversed[1] + "/" + reversed[0]
}

const useVentas = () => {
	const [ventas, setVentas] = useState([])
	const [ventasSemana, setVentasSemana] = useState(null)
    const {rango, setRango} = useRangoFechas()
	useEffect(() => {
		async function loadVentas() {
			const res = await getVentas()
			setVentas(res.ventas);
		}
		loadVentas()
		return () => setVentas([])
	}, [])
	
	useEffect(() => {
		async function loadVxs() {
            if(rango != null){
                const res = await getVentasSemana(rango.f1, rango.f2)
                let nvoArray = []
                res.ventas.forEach(e => {
                    nvoArray.push({x: formatearFecha(e._id),  y: e.totalVenta})
                });
                setVentasSemana(nvoArray)
                
            }
		}
        loadVxs()
        
        return () => setVentasSemana(null)
    }, [rango])
    
    const addVenta = (venta) => {

    }

    const delVenta = (id) => {
		return cancelVenta(id)
	}
	
	const verVenta = (folio) => {
		return getVenta(folio).then(res => {
			return res
		})
	}

	return {
		ventas,
		delVenta,
		addVenta,
		verVenta,

		ventasSemana,
        rango,
        setRango
	}
};

export default useVentas;