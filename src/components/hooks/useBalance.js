import { useState, useEffect } from 'react'
import { sumImporte, 
    // sumSaldo, 
    // calcCostoInventario 
} from '../Tools'
import {getBalance, getDisponiblexUbicacion} from '../api'
const useBalance = () => {
    const [balance, setBalance] = useState(null)
    const [disp, setDisp] = useState([])
    useEffect(() => {
        getBalance().then(data => {
            // console.log(balance)
            setBalance(data)
        })
        return () => setBalance(null)
    }, [])

    useEffect(()=>{
        getDisponiblexUbicacion().then(res=>{
            var disp = []
            res.forEach(el => {
                disp.push({ubicacion: el.nombre, disponible: (sumImporte(el.ingresos) - sumImporte(el.egresos))})
            })
            setDisp(disp)
        })
        return () => setDisp([])
    }, [balance])
    
    return {
        balance,
        disp
    }
}

export default useBalance