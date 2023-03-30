import React, {createContext, useState} from 'react'
import { getVentas, cancelVenta, getVenta, getVentasSemana } from '../api'


// const formatearFecha = (fecha) => {
// 	let reversed = fecha.split('-').reverse()
// 	return reversed[1] + "/" + reversed[0]
// }

export const VentaContext = createContext()

const VentaContextProvider = (props) => {
    const [ventas, setVentas] = useState([])
    const [venta, setVenta] = useState(null)
	const [ventasPorPeriodo, setVentasPorPeriodo] = useState([])
    const [trabajando, setTrabajando] = useState(false)
    // var now = moment()
    const [rango, setRango] = useState({f1:"",f2:""
        // f2: now.format('YYYY-MM-DD'),
        // f1: now.subtract(7, 'days').format('YYYY-MM-DD'),
    })

    async function loadVentas(user, month, year) {
		const res = await getVentas(user, month, year)
		setVentas(res.ventas);
	}

    async function loadVentasPorPeriodo(user, rango) {
        setVentasPorPeriodo([])
		if(rango.f1 !== ""){
        setTrabajando(true)
			const res = await getVentasSemana(user, rango.f1, rango.f2)
			// let nvoArray = []
			// res.ventas.forEach(e => {
                // 	nvoArray.push({x: formatearFecha(e._id),  y: e.totalVenta})
                // });
                // setVentasPorSemana(nvoArray)
            setVentasPorPeriodo(res.ventas)
            setTrabajando(false)
		}
	}

    const selectVenta = (vta) => {
        setVenta(vta)
    }

    const verVenta = async (user, folio) => {
		let res = await getVenta(user, folio)		
        setVenta(res.venta)
		return res
	}

    const delVenta = (user, id) => {
		return cancelVenta(user, id)
	}

    return (
        <VentaContext.Provider value={{
            venta,
            setVenta,
            selectVenta,
            ventas,
            ventasPorPeriodo,
            loadVentas,
            loadVentasPorPeriodo,
            verVenta,
            rango,
            setRango,
            delVenta,
            trabajando
        }}>
            {props.children}
        </VentaContext.Provider>
    )
}

export default VentaContextProvider