import { useState, useEffect } from 'react';
import moment from 'moment'

const useRangoFechas = () => {
    const [rango, setRango] = useState(null)
    
    useEffect(() => {
        
        var now = moment()
        setRango({
            f2: now.format('YYYY-MM-DD'),
            f1: now.subtract(7, 'days').format('YYYY-MM-DD'),
        })

        // console.log(rango.f1)

        return () => {
            setRango(null)
        }
        
    }, [])

    return {
        rango,
        setRango
    }
}

export default useRangoFechas;