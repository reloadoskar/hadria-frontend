import { useState, useEffect } from 'react'
import {getBalance} from '../api'
import { sumImporte, sumSaldo } from '../Tools'
const useBalance = () => {
    const [balance, setBalance] = useState({})

    useEffect(() => {
        async function loadBalance() {
            const res = await getBalance()
            setBalance(res);
        }
        loadBalance()
    }, [])

    

    return balance;
}

export default useBalance