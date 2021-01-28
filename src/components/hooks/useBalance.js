import { useState, useEffect } from 'react'
import { 
    sumImporte, 
    sumSaldo, 
    // calcCostoInventario 
} from '../Tools'
import { 
    // getBalance, 
    
    getIngresos, 
    saveIngreso, 
    
    getCuentasPorCobrar, 
    getCxcCliente, 
    savePagoACuentaPorCobrar, 

    getEgresos, 
    saveEgreso, 
    getCuentasPorPagar, 
    savePagoACuentaPorPagar, 
    getDisponiblexUbicacion,
    
    saveVenta, 
    
    getInventario, 
    getInventarioBy,
    // getDisponiblexUbicacion
} from '../api'

const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [disp, setDisp] = useState([])
    
    //INGRESOS
    const [ingresos, setIngresos] = useState([])
    const [totalIngresos, setTotalIngresos] = useState(0)
    const [updatingIngresos, setUpdIng] = useState(false)
    const [updatingCuentasxc, setUpdCxc] = useState(false)
    
    const [cuentasxCobrar, setCuentasxCobrar] = useState([])
    const [cuentasxcCliente , setCuentasxcCliente] = useState(null)
    const [totalCxc, setTotalCxc] = useState(0)
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
            setCuentasxCobrar(res.clientes);
            // setTotalCxc(sumSaldo(res.cuentas))
		}
        loadCuentas()        
        return () => setCuentasxCobrar([])
    }, [updatingCuentasxc])
    
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
            setUpdCxc(!updatingCuentasxc)
            setUpdIng(!updatingIngresos)
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

    const [egresos, setEgresos] = useState([])
	const [totalEgresos, setTotalEgresos] = useState(0)
    const [updatingEgresos, setUpdatingEgresos] = useState(false)

    const [cuentasxPagar, setCuentas] = useState([])
    const [totalCxp, setTotalCxp] = useState(0)

    useEffect(() => {
		async function loadEgresos() {
			const res = await getEgresos()
			setEgresos(res.egresos);
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
    }, [egresos])
    
	useEffect(()=>{
        getDisponiblexUbicacion().then(res=>{
            let disp = []
            res.forEach(el => {
                disp.push({ubicacion: el.nombre, disponible: (sumImporte(el.ingresos) - sumImporte(el.egresos))})
            })
            setDisp(disp)
        })
        return () => setDisp([])
    }, [updatingEgresos, updatingIngresos])

	useEffect(() => {
		async function loadCuentas() {
			const res = await getCuentasPorPagar()
            setCuentas(res.cuentas);
		}
		loadCuentas()
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
			var i = inventario.compras
			var tti = 0
			i.map(compra => {
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
		addIngreso,
		delIngreso,
		addVenta,

		cuentasxCobrar,
		cuentasxcCliente,
		totalCxc,
		cxcCliente,
        addPagoCxc,
        
        egresos,
		totalEgresos,
		addEgreso, 
		
		cuentasxPagar,
		totalCxp,
		addPagoCxp,

        inventario,
		invUbic,
		getInvUbic,
		totalInventario
    }
}

export default useBalance