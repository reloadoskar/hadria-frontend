import React, {useState, createContext} from 'react';
import {saveInversion, getInversions, deleteInversion} from '../api'

export const InversionContext = createContext()

const InversionContextProvider = (props) => {
    const [inversions, setInversions] = useState([])
    const [inversion, setInversion] = useState(null)
    
    const addInversion = async (inv) => {
        const res = await saveInversion(inv)
        setInversions([...inversions, res.inversion])
        return res
    }

    const removeInversion = async (id) => {
        const res = await deleteInversion(id)
        setInversions(inversions.filter(inversion => inversion._id !== id))
        return res
    }

    const loadInversions = async (mes) => {
        const res = await getInversions(mes)
        setInversions(res.inversions)
        return res
    }

    const selectInversion = (invSelected) => {
        setInversion(invSelected)
    }
return (
    <InversionContext.Provider value={{inversions, inversion, loadInversions, addInversion, removeInversion, selectInversion}}>
        {props.children}
    </InversionContext.Provider>
)
}

export default InversionContextProvider