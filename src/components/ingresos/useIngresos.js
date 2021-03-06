import { useState, useEffect } from 'react';
import { getIngresos, saveIngreso, getCuentasPorCobrar, getCxcPdv, getCxcCliente, savePagoACuentaPorCobrar, saveVenta } from '../api'
import { sumImporte, sumSaldo } from '../Tools'
import moment from 'moment'
const useIngresos = () => {
    const [ingresos, setIngresos] = useState([])
	const [totalIngresos, setTotalIngresos] = useState(null)
	const [updating, setUpdating] = useState(false)
	const [cuentasxCobrar, setCuentasxCobrar] = useState([])
	const [cxcPdv, setCxcPdv] = useState([])
	const [totalCxc, setTotalCxc] = useState(0)
	const [cuentasxcCliente , setCuentasxcCliente] = useState(null)

	useEffect(() => {
		let hoy = moment().format("YYYY-MM-DD")
		async function loadIngresos(fecha) {
			const res = await getIngresos(fecha)
			if(res !== undefined){
				setIngresos(res.ingresos)
			}
		}
        loadIngresos(hoy)
        return () => setIngresos([])
	}, [updating])

	useEffect(()=> {
		if (ingresos !== []){
			setTotalIngresos(sumImporte(ingresos))
		}
		return () => {
			setTotalIngresos(0)
		}
	}, [ingresos])
	
	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorCobrar()
			if(res !== undefined){
				setCuentasxCobrar(res.clientes)
			}
		}
        loadCuentas()        
        return () => setCuentasxCobrar([])
	}, [updating])

	useEffect(()=> {
		async function loadcxcpdv(){
			const res = await getCxcPdv()
			// console.log(res)
			if(res !== undefined){
				// setCuentasxCobrar(res.clientes);
				setCxcPdv(res.cuentas)
			}
		}
		loadcxcpdv()
		return () => setCxcPdv([])
	},[updating])
	
	useEffect(() => {
        var tt = 0
        if(cuentasxCobrar!== null){
            cuentasxCobrar.map((c)=>{
                return tt += sumSaldo(c.cuentas)
            })
            setTotalCxc(tt)
        }
	},[cuentasxCobrar])
	
	const cxcCliente = (id) => {
        return getCxcCliente(id).then(res => {
			setCuentasxcCliente(res.cuentas)
			return res
        })
    } 

	const addPagoCxc = (pago) => {
		return savePagoACuentaPorCobrar(pago).then(res=>{
			setUpdating(!updating)
            return res
        })
    }

	const addIngreso = (ingreso) => {
		return saveIngreso(ingreso).then(res=>{
			setUpdating(!updating)
			return res
		})
	}

	const addVenta = (venta) =>{
		return saveVenta(venta).then(res=>{
			setUpdating(!updating)
			return res
		})
	}

	const delIngreso = ()=>{

	}

	return {
		ingresos,
		totalIngresos,
		addIngreso,
		delIngreso,
		addVenta,

		cuentasxCobrar,
		cuentasxcCliente,
		totalCxc,
		cxcPdv,
		cxcCliente,
		addPagoCxc,

		setUpdating
	}
};

export default useIngresos;