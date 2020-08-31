import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'

const useUser = () => {
	const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        email: '',
        level: 2
    })
	useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        setUser({
            nombre: decoded.nombre,
            apellido: decoded.apellido,
            email: decoded.email,
            level: decoded.level
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