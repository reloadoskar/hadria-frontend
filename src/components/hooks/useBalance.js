import { useState, useEffect } from 'react'
import { sumImporte, sumSaldo, calcCostoInventario } from '../Tools'
import {getBalance} from '../api'
const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [dispPorUbicacion , setDispPorUbicacion] = useState(null)
    useEffect(() => {
        getBalance().then(data => {
            // console.log(balance)
            var ingresos = sumImporte(data.ingresos)
            var porCobrar = sumSaldo(data.porCobrar)
            var egresos = sumImporte(data.egresos)
            var porPagar = 0
            data.porPagar.forEach(compra => {
                porPagar += compra.saldo
            })
            var inventario = calcCostoInventario(data.inventario)
            // var inventario = 0
            var disponible = ingresos - egresos
            var balanceT = 0
            balanceT = disponible + porCobrar + inventario - porPagar

            setBalance({
                total: balanceT,
                disponible: disponible,
                inventario: inventario,
                porCobrar: porCobrar,
                cuentasPc: data.porCobrar,
                porPagar: porPagar,
                cuentasPp: data.porPagar,
                dispPorUbic: data.disponiblePorUbicacion,
            })

            setDispPorUbicacion(data.disponiblePorUbicacion)
        })
        return () => setBalance(null)
    }, [])
    
    return {
        balance,
        dispPorUbicacion
    }
}

export default useBalance