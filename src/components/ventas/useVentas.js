import { useState } from 'react';
import useRangoFechas from './useRangoFechas'
import { getVentas, cancelVenta, getVenta, getVentasSemana } from '../api'

const formatearFecha = (fecha) => {
	let reversed = fecha.split('-').reverse()
	return reversed[1] + "/" + reversed[0]
}

const useVentas = () => {
	const [ventas, setVentas] = useState([])
	const [ventasPorSemana, setVentasPorSemana] = useState(null)
    const {rango, setRango} = useRangoFechas()
	
	async function loadVentas(month, year) {
		const res = await getVentas(month, year)
		setVentas(res.ventas);
	}
	
	async function loadVentasPorSemana(rango) {
		if(rango != null){
			const res = await getVentasSemana(rango.f1, rango.f2)
			let nvoArray = []
			res.ventas.forEach(e => {
				nvoArray.push({x: formatearFecha(e._id),  y: e.totalVenta})
			});
			setVentasPorSemana(nvoArray)
		}
	}
    
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
		loadVentas,
		loadVentasPorSemana,
		delVenta,
		addVenta,
		verVenta,

		ventasSemana: ventasPorSemana,
        rango,
        setRango
	}
};

export default useVentas;