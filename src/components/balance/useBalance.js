import { useState, useEffect } from 'react'
import useIngresos from '../ingresos/useIngresos'
import useEgresos from '../egresos/useEgresos'
import useInventario from '../hooks/useInventario'
import { getDisponiblexUbicacion } from '../api'
import { 
    sumImporte, 
    sumSaldo, 
    // calcCostoInventario 
} from '../Tools'

const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [disp, setDisp] = useState([])
    const {totalIngresos, totalCxc, cuentasxCobrar} = useIngresos()
    const {totalEgresos, totalCxp, cuentasxPagar} = useEgresos()
    const {totalInventario} = useInventario()

    useEffect(()=>{
        async function dipsxubic(){
            const res = await getDisponiblexUbicacion()
            if(res!==undefined){
                let disp = []
                res.forEach(el => {
                    disp.push({_id: el._id, ubicacion: el.nombre, disponible: (sumImporte(el.ingresos) - sumImporte(el.egresos))})
                })
                setDisp(disp)
            }
        }
        dipsxubic()
        return () => setDisp([])
    }, [])

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
        cuentasxCobrar,
        cuentasxPagar,
        totalCxc,
        totalCxp
    }
}

export default useBalance