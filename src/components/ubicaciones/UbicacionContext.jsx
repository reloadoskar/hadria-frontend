import React, { useState } from 'react';
import { createContext } from 'react';
import { getUbicacions, saveUbicacion, updateUbicacion } from '../api';

export const UbicacionContext = createContext()

const UbicacionContextProvider = (props) => {
    const [ubicacions, setUbicacions] = useState([])
    const [ubicacion, setUbicacion] = useState(null)

    const loadUbicacions = async (user) => {
        const res = await getUbicacions(user)
        setUbicacions(res.ubicacions)
    }

    const addUbicacion = async (user, data) => {
        const res = await saveUbicacion(user, data)
        setUbicacions([res.ubicacion, ...ubicacions])
        return res
    }

    const selectUbicacion = (ubicacion) =>{
        setUbicacion(ubicacion)
    }

    const editUbicacion = async (user, ubicacion) => {
		const res = await updateUbicacion(user, ubicacion)
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