import { useState, useEffect } from 'react'
import useIngresos from '../ingresos/useIngresos'
import useEgresos from '../egresos/useEgresos'
import useInventario from '../hooks/useInventario'
import { getDisponiblexUbicacion } from '../api'
import { 
    sumImporte, 
    groupBy,
    // sumSaldo, 
    // calcCostoInventario 
} from '../Tools'
import moment from 'moment'

const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [disp, setDisp] = useState(null)
    const {ingresos, totalIngresos, totalCxc, cuentasxCobrar} = useIngresos()
    const {egresos, totalEgresos, totalCxp, cuentasxPagar} = useEgresos()
    const {totalInventario} = useInventario()

    useEffect(() => {
        var tdisp = totalIngresos - totalEgresos
        // var balanceT = tdisp  + totalCxc - totalCxp + totalInventario
        setBalance({
            // total: balanceT,
            inventario: totalInventario,
            porCobrar: totalCxc,
            porPagar: totalCxp,
            disponible: tdisp,
            // dispPorUbic: disp,
        })
        return () => setBalance(null)
    }, [totalIngresos, totalEgresos, totalCxc, totalCxp, totalInventario, disp])
    
    return {
        balance,
        disp,
        // cuentasxCobrar,
        // cuentasxPagar,
        // totalCxc,
        // totalCxp
    }
}

export default useBalance