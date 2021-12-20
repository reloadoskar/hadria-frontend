import React, {useState, createContext, useEffect} from 'react';
import {saveInversion, getInversions, deleteInversion} from '../api'
export const InversionContext = createContext()

const InversionContextProvider = (props) => {
    let now = new Date()
    const [inversions, setInversions] = useState([])
    const [inversion, setInversion] = useState(null)
    const [month, setMonth] = useState(now.getMonth() + 1)
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

    useEffect(() => {
        loadInversions(month)
    }, [month])

return (
    <InversionContext.Provider value={{inversions, inversion, loadInversions, addInversion, removeInversion, selectInversion, setInversions, setMonth}}>
        {props.children}
    </InversionContext.Provider>
)
}

export default InversionContextProvider