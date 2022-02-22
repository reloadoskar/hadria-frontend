import React, { useState } from 'react';
import { createContext } from 'react';
import { getUbicacions, saveUbicacion } from '../api';

export const UbicacionContext = createContext()

const UbicacionContextProvider = (props) => {
    const [ubicacions, setUbicacions] = useState([])

    const loadUbicacions = async () => {
        const res = await getUbicacions()
        setUbicacions(res.ubicacions)
    }

    const addUbicacion = async (ubic) => {
        const res = await saveUbicacion(ubic)
        setUbicacions([...ubicacions, res.ubicacion])
    }
    return(
        <UbicacionContext.Provider value={{ubicacions, addUbicacion, loadUbicacions}} >
            {props.children}
        </UbicacionContext.Provider>
    )
}

export default UbicacionContextProvider