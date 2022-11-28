import React, { useState, useContext, createContext, useEffect } from 'react';
import { 
    // saveCorte, 
    getDataFrom, saveCorte, existCorte, openCorte } from '../api'
export const CortesContext = createContext()

export const useCortes = () =>{
    return useContext(CortesContext)
}

const CortesContextProvider = ({children}) => {
    const [corte, setCorte] = useState(null)
    const [mediasCajasCount, setMediasCajasCount] = useState(0)
    const [totalCorte, setTotalCorte] = useState(0)

    useEffect(()=>{
		if (corte) {
			let cuenta = 0
            setTotalCorte(corte.ventaItems.reduce((acc,itm)=>acc+=itm.importe,0))
			corte.ventaItems.map((el) => {
				if (!Number.isInteger(el.empaques)) {
					return cuenta++
				}
				return false
			})
			setMediasCajasCount(cuenta)
		} else {
			return () => setMediasCajasCount(0)
		}
	}, [corte])

    async function getCorte(user, ubicacion, fecha){
        setCorte(null)
        const res = await getDataFrom(user, ubicacion, fecha)
            setCorte(res.corte)
        return res
    }

    async function existeCorte(user, ubicacion, fecha){
        const res = await existCorte(user, ubicacion, fecha)
            return res
    }

    async function guardarCorte(user, corte){
        const res = await saveCorte(user, corte)
            return res
    }

    async function reOpen(user, ubicacion, fecha){
        const res = await openCorte(user, ubicacion, fecha)
        return res
    }

    return (
        <CortesContext.Provider value={{
            corte,
            totalCorte,
            mediasCajasCount,
            getCorte,
            guardarCorte, 
            existeCorte,
            reOpen
        }} >
            {children}
        </CortesContext.Provider>
    )
}

export default CortesContextProvider