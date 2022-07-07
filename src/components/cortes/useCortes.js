import { useState } from 'react';
import { 
    // saveCorte, 
    getDataFrom, saveCorte, existCorte, openCorte } from '../api'
import {sumImporte, 
    sumAcuenta,
    // calcTotal, 
    // formatNumber
} from '../Tools'
const useCortes = () => {
    const [corte, setCorte] = useState([])

    async function getCorte(ubicacion, fecha){
        const crte = await getDataFrom(ubicacion, fecha)
        .then(res=>{
            if(res.status==="info"){
                setCorte(res.corte)
                return res.corte
            }else{
                    let elcorte = res.corte
                    var tven = sumImporte(elcorte.ventaItems)
                    var ting = sumImporte(res.corte.ingresos)
                    var tcre = sumImporte(res.corte.creditos)
                    var tacu = sumAcuenta(res.corte.creditos)
                    var tegr = sumImporte(res.corte.egresos)
                    var total = (tven + ting + tacu - tcre - tegr)
        
                    elcorte.tventas = tven
                    elcorte.tingresos = ting
                    elcorte.tcreditos = tcre
                    elcorte.tacuenta = tacu
                    elcorte.tegresos = tegr
                    elcorte.total = total
            
                    setCorte(elcorte)
                    return elcorte
                }
            })
            return crte
    }

    async function existeCorte(ubicacion, fecha){
        const res = await existCorte(ubicacion, fecha)
            setCorte(res)
            return res
    }

    async function guardarCorte(corte){
        const res = await saveCorte(corte)
            return res
    }

    async function reOpen(ubicacion, fecha){
        const res = await openCorte(ubicacion, fecha)
        return res
    }

    return {
        corte,
        getCorte,
        guardarCorte, 
        existeCorte,
        reOpen
    }
}

export default useCortes