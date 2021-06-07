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
        let elcorte = []
        const crte = await getDataFrom(ubicacion, fecha)
        const existe = await existCorte(ubicacion, fecha)
        elcorte = crte.corte
        if (existe.corte.length === 0){
            elcorte.status = "ABIERTO"
        }else{
            elcorte.status = "CERRADO"
        }

        var tven = sumImporte(crte.corte.ventas)
        var ting = sumImporte(crte.corte.ingresos)
        var tcre = sumImporte(crte.corte.creditos)
        var tacu = sumAcuenta(crte.corte.creditos)
        var tegr = sumImporte(crte.corte.egresos)
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