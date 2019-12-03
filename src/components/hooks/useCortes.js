import { useState, useEffect } from 'react';
import { getCorte, getCortes, saveCorte } from '../api'

const useCortes = () => {
    const [corte, setCorte] = useState([])

    const getData = (ubicacion, fecha) => {
        getCorte(ubicacion, fecha).then( res => {
            return res
        })
    }

    return {
        getData,
    }
}

export default useCortes