import { useState, useEffect } from 'react'
// import { sumImporte, sumSaldo, calcCostoInventario } from '../Tools'
import {getBalance} from '../api'
const useBalance = () => {
    const [balance, setBalance] = useState(null)
    useEffect(() => {
        getBalance().then(data => {
            // console.log(balance)
            setBalance(data)
        })
        return () => setBalance(null)
    }, [])
    
    return {
        balance,
    }
}

export default useBalance