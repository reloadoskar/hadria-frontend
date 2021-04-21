import { useState, useEffect } from 'react'
import { 
    sumImporte, 
    sumSaldo, 
    // calcCostoInventario 
} from '../Tools'
import { 
    // getBalance, 
    
    // getIngresos, 
    // saveIngreso, 
    
    // getCuentasPorCobrar, 
    // getCxcCliente, 
    // savePagoACuentaPorCobrar, 

    getEgresos, 
    saveEgreso, 
    getCuentasPorPagar, 
    savePagoACuentaPorPagar, 
    getDisponiblexUbicacion,
    
    // saveVenta, 
    
    getInventario, 
    getInventarioBy,
} from '../api'

import useIngresos from '../ingresos/useIngresos'

const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [disp, setDisp] = useState([])
    
    //INGRESOS
    const {ingresos, totalIngresos, cuentasxCobrar, cuentasxcCliente, totalCxc} = useIngresos()
    // const [totalIngresos, setTotalIngresos] = useState(0)
    // const [updatingIngresos, setUpdIng] = useState(false)
    // const [updatingCuentasxc, setUpdCxc] = useState(false)
    
    // const [cuentasxCobrar, setCuentasxCobrar] = useState([])
    // const [cuentasxcCliente , setCuentasxcCliente] = useState(null)
    // const [totalCxc, setTotalCxc] = useState(0)
    // useEffect(() => {
	// 	async function loadIngresos() {
	// 		const res = await getIngresos()
	// 		if(res !== undefined){
	// 			setIngresos(res.ingresos)
	// 		}
	// 	}
    //     loadIngresos()
    //     return () => {
    //         setIngresos([])
    //     }
	// }, [updatingIngresos])
    
    // useEffect(()=> {
	// 	if (ingresos !== []){
	// 		setTotalIngresos(sumImporte(ingresos))
	// 	}
	// 	return () => {
	// 		setTotalIngresos(0)
	// 	}
	// }, [ingresos])
    
    // useEffect(() => {
	// 	async function loadCxc() {
	// 		const res = await getCuentasPorCobrar()
	// 		if(res !== undefined){
	// 			setCuentasxCobrar(res.clientes);
	// 		}
	// 	}
    //     loadCxc()        
    //     return () => setCuentasxCobrar([])
    // }, [updatingCuentasxc])
    
    // useEffect(() => {
    //     var tt = 0
    //     if(cuentasxCobrar!== null){
    //         cuentasxCobrar.map((c)=>{
    //             return tt += sumSaldo(c.cuentas)
    //         })
    //         setTotalCxc(tt)
	// 	}
	// 	return () => { setTotalCxc(0) }
	// },[cuentasxCobrar])

    // const cxcCliente = (id) => {
    //     return getCxcCliente(id).then(res => {
	// 		setCuentasxcCliente(res.cuentas)
	// 		return res
    //     })
    // }

    // const addPagoCxc = (pago) => {
	// 	return savePagoACuentaPorCobrar(pago).then(res=>{
    //         setUpdCxc(!updatingCuentasxc)
    //         setUpdIng(!updatingIngresos)
    //         return res
    //     })
    // }

	// const addIngreso = (ingreso) => {
	// 	return saveIngreso(ingreso).then(res=>{
	// 		setUpdIng(!updatingIngresos)
	// 		return res
	// 	})
	// }

	// const addVenta = (venta) =>{
	// 	return saveVenta(venta).then(res=>{
	// 		setUpdIng(!updatingIngresos)
	// 		if(venta.tipoPago === "CRÉDITO"){
	// 			setUpdCxc(!updatingCuentasxc)
	// 		}
	// 		return res
	// 	})
	// }

	// const delIngreso = ()=>{

	// }

    const [egresos, setEgresos] = useState([])
	const [totalEgresos, setTotalEgresos] = useState(0)
    const [updatingEgresos, setUpdatingEgresos] = useState(false)

    const [cuentasxPagar, setCuentas] = useState([])
    const [totalCxp, setTotalCxp] = useState(0)

    useEffect(() => {
		async function loadEgresos() {
			const res = await getEgresos()
			if(res !== undefined){
				setEgresos(res.egresos);
			}
		}
        loadEgresos()
        return () => {
			setEgresos([])
        }
    }, [updatingEgresos])
    
    useEffect(() => {
		if(egresos!==[]){
			setTotalEgresos(sumImporte(egresos))
		}
		return () => setTotalEgresos(0)
    }, [egresos])
    
	useEffect(()=>{
        getDisponiblexUbicacion().then(res=>{
			if(res !== undefined){
				let disp = []
				res.forEach(el => {
					disp.push({ 
						_id: el._id,
						nombre: el.nombre,
						disponible: (sumImporte(el.ingresos) - sumImporte(el.egresos))
					})
				})
				setDisp(disp)
			}
        })
        return () => setDisp([])
    }, [updatingEgresos])

	useEffect(() => {
		async function loadCxp() {
			const res = await getCuentasPorPagar()
            setCuentas(res.cuentas);
		}
		loadCxp()
		return () => setCuentas([])
    }, [updatingEgresos])
        
	useEffect(() => {
		var tt=0
		if (cuentasxPagar !== []){
			cuentasxPagar.map((c)=>{
                return tt += sumSaldo(c.cuentas)
            })
            setTotalCxp(tt)
		}
		return () => {
			setTotalCxp(0)
		}
		
	},[cuentasxPagar])

    const addEgreso = (egreso) => {
		return saveEgreso(egreso).then(res=>{
			setEgresos([...egresos, res.egreso])
			setUpdatingEgresos(!updatingEgresos)
			return res
		})
	}

	const addPagoCxp = (pago) => {
		return savePagoACuentaPorPagar(pago).then(res =>{
			setEgresos([...egresos, res.pago])
			setUpdatingEgresos(!updatingEgresos)
			return res
		})
    }
    


    // INVENTARIO

    const [inventario, setInventario] = useState(null)
	const [invUbic, setInvUbic] = useState(null)
    const [totalInventario, setTotalInventario] = useState(0)
    
    useEffect(() => {
		async function loadInventario() {
			const res = await getInventario()
			setInventario(res.inventario);
		}
		loadInventario()
		return () => {
			setInventario([])
		}
    }, [])
    
    useEffect(() => {
		if(inventario !== null){
			var tti = 0
			inventario.map(compra => {
				return compra.items.map(itm=>{
					return tti += itm.stock * itm.costo
				})
			})
			setTotalInventario(tti)
		}
		return () => {
			setTotalInventario(0)
		}
	},[inventario])

	const getInvUbic = (ubic) => {
		return getInventarioBy(ubic).then(res => {
			setInvUbic(res.inventario)
			return res.inventario
		})
	}

    useEffect(() => {
        var tdisp = totalIngresos - totalEgresos
        var balanceT = tdisp  + totalCxc - totalCxp + totalInventario
        setBalance({
            total: balanceT,
            inventario: totalInventario,
            porCobrar: totalCxc,
            porPagar: totalCxp,
            disponible: tdisp,
            dispPorUbic: disp,
        })
        return () => setBalance(null)
    }, [totalIngresos, totalEgresos, totalCxc, totalCxp, totalInventario, disp])

    
    return {
        balance,
		disp,

        ingresos,
		totalIngresos,
		// addIngreso,
		// delIngreso,
		// addVenta,

		cuentasxCobrar,
		cuentasxcCliente,
		totalCxc,
		// cxcCliente,
        // addPagoCxc,
        
        egresos,
		totalEgresos,
		addEgreso, 
		
		cuentasxPagar,
		totalCxp,
		addPagoCxp,

        inventario,
		invUbic,
		getInvUbic,
		totalInventario,

		// setUpdIng
    }
}

export default useBalance