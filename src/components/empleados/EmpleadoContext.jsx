import React, {createContext, useState, useContext} from 'react'
import {getEmpleados, saveEmpleado, delEmpleado, updateEmpleado} from '../api'

export const EmpleadoContext = createContext()

export const useEmpleados = () =>{
    return useContext(EmpleadoContext)
}

const EmpleadoContextProvider = (props) => {
    const [empleados, setEmpleados] = useState([])

    const loadEmpleados = async (user) => {
        const res = await getEmpleados(user)
        setEmpleados(res.empleados)
        localStorage.setItem('empleados', JSON.stringify(res.empleados))
        return res
    }

    const addEmpleado = async (user, empleado) => {
        const res = await saveEmpleado(user, empleado)
        setEmpleados([res.empleado, ...empleados ])
        return res
    }

    const removeEmpleado = async (user, id) => {
        const res = await delEmpleado(user, id)
        setEmpleados(empleados.filter(empleado => empleado._id !== id))
        return res
    }

    const editEmpleado = async (user, empleado) => {
        const res = await updateEmpleado(user, empleado)
        return res
    }

    return (
        <EmpleadoContext.Provider value={{
            empleados,
            loadEmpleados,
            addEmpleado,
            removeEmpleado,
            editEmpleado, setEmpleados
        }}>
            {props.children}
        </EmpleadoContext.Provider>
    )
}

export default EmpleadoContextProvider