import React, { useState } from 'react';
import { createContext } from 'react';
import { getUbicacions, saveUbicacion, updateUbicacion } from '../api';

export const UbicacionContext = createContext()

const UbicacionContextProvider = (props) => {
    const [ubicacions, setUbicacions] = useState([])
    const [ubicacion, setUbicacion] = useState(null)

    const loadUbicacions = async () => {
        const res = await getUbicacions()
        setUbicacions(res.ubicacions)
    }

    const addUbicacion = async (ubic) => {
        const res = await saveUbicacion(ubic)
        setUbicacions([...ubicacions, res.ubicacion])
    }

    const selectUbicacion = (ubicacion) =>{
        setUbicacion(ubicacion)
    }

    const editUbicacion = async (ubicacion) => {
		const res = await updateUbicacion(ubicacion)
        return res
	}
    return(
        <UbicacionContext.Provider value={{
            ubicacions, 
            ubicacion,
            selectUbicacion,
            addUbicacion, 
            loadUbicacions,
            editUbicacion}} >
            {props.children}
        </UbicacionContext.Provider>
    )
}

export default UbicacionContextProvider