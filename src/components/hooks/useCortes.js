import { useState } from 'react';
import { 
    // saveCorte, 
    getDataFrom } from '../api'
import {sumImporte, 
    sumAcuenta,
    // calcTotal, 
    // formatNumber
} from '../Tools'
const useCortes = () => {
    const [corte, setCorte] = useState([])
    
    function getCorte(ubicacion, fecha){
        return getDataFrom(ubicacion, fecha).then(res=>{
            var corte = res.corte

            var tven = sumImporte(corte.ventas)
            var ting = sumImporte(corte.ingresos)
            var tcre = sumImporte(corte.creditos)
            var tacu = sumAcuenta(corte.creditos)
            var tegr = sumImporte(corte.egresos)
            var total = (tven + ting + tacu - tcre - tegr)

            corte.tventas = tven
            corte.tingresos = ting
            corte.tcreditos = tcre
            corte.tacuenta = tacu
            corte.tegresos = tegr
            corte.total = total
            // setCorte(corte)
            return corte
        })
    }

    return {
        corte,
        getCorte,
    }
}

export default useCortes