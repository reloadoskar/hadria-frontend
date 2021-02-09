import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import moment from 'moment'
var now = moment()
const useUser = () => {
	const [user, setUser] = useState(null)
useEffect(() => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    var diasVencimientoLicencia = now.diff(decoded.paidPeriodEnds, 'days') * -1
    setUser({
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        email: decoded.email,
        level: decoded.level,
        database: decoded.database,
        ubicacion: decoded.ubicacion,
        licenceEnds: decoded.paidPeriodEnds,
        venceEnDias: diasVencimientoLicencia,
    })

    return () => {
        setUser(null)
    }
}, [])

	const addUser = (user) => {
		// ...
	}
	

	const del = () =>{
		return null
	}

	return {
		user,
		addUser,
		del,
	}
};

export default useUser;