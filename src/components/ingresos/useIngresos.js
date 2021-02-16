import { useState, useEffect } from 'react';
import { getIngresos, saveIngreso, getCuentasPorCobrar, getCxcPdv, getCxcCliente, savePagoACuentaPorCobrar, saveVenta } from '../api'
import { sumImporte, sumSaldo } from '../Tools'
const useIngresos = () => {
	const [updatingIngresos, setUpdIng] = useState(false)
	const [updatingCuentasxc, setUpdCxc] = useState(false)

    const [ingresos, setIngresos] = useState([])
	useEffect(() => {
		async function loadIngresos() {
			const res = await getIngresos()
			setIngresos(res.ingresos)
		}
        loadIngresos()
        return () => {
            setIngresos([])
        }
	}, [updatingIngresos])

	const [totalIngresos, setTotalIngresos] = useState(0)
	useEffect(()=> {
		if (ingresos !== []){
			setTotalIngresos(sumImporte(ingresos))
		}
		return () => {
			setTotalIngresos(0)
		}
	}, [ingresos])
	

	const [cuentasxCobrar, setCuentasxCobrar] = useState([])
	useEffect(() => {
		async function loadCuentas() {
            const res = await getCuentasPorCobrar()
            setCuentasxCobrar(res.clientes);
            // setTotalCxc(sumSaldo(res.cuentas))
		}
        loadCuentas()        
        return () => setCuentasxCobrar([])
	}, [updatingCuentasxc])

	const [cxcPdv, setCxcPdv] = useState([])
	useEffect(()=> {
		async function loadcxcpdv(){
			const res = await getCxcPdv()
			setCxcPdv(res.cuentas)
		}
		loadcxcpdv()
		return () => setCxcPdv([])
	},[updatingCuentasxc])
	
	
	const [totalCxc, setTotalCxc] = useState(0)
	useEffect(() => {
        var tt = 0
        if(cuentasxCobrar!== null){
            cuentasxCobrar.map((c)=>{
                return tt += sumSaldo(c.cuentas)
            })
            setTotalCxc(tt)
        }
	},[cuentasxCobrar])
	
    const [cuentasxcCliente , setCuentasxcCliente] = useState(null)
	const cxcCliente = (id) => {
        return getCxcCliente(id).then(res => {
			setCuentasxcCliente(res.cuentas)
			return res
        })
    } 

	const addPagoCxc = (pago) => {
		return savePagoACuentaPorCobrar(pago).then(res=>{
			setUpdCxc(!updatingCuentasxc)
            return res
        })
    }

	const addIngreso = (ingreso) => {
		return saveIngreso(ingreso).then(res=>{
			setUpdIng(!updatingIngresos)
			return res
		})
	}

	const addVenta = (venta) =>{
		return saveVenta(venta).then(res=>{
			setUpdIng(!updatingIngresos)
			if(venta.tipoPago === "CRÉDITO"){
				setUpdCxc(!updatingCuentasxc)
			}
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
		cxcCliente,
		cxcPdv,
		addPagoCxc
	}
};

export default useIngresos;