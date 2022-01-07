import React, {createContext, useState} from 'react'
import {getEmpleados, saveEmpleado, delEmpleado, updateEmpleado} from '../api'

export const EmpleadoContext = createContext()

const EmpleadoContextProvider = (props) => {
    const [empleados, setEmpleados] = useState([])

    const loadEmpleados = async () => {
        const res = await getEmpleados()
        setEmpleados(res.empleados)
        return res
    }

    const addEmpleado = async (empleado) => {
        const res = await saveEmpleado(empleado)
        setEmpleados([...empleados, res.empleado])
        return res
    }

    const removeEmpleado = async (id) => {
        const res = await delEmpleado(id)
        setEmpleados(empleados.filter(empleado => empleado._id !== id))
        return res
    }

    const editEmpleado = async (empleado) => {
        const res = await updateEmpleado(empleado)
        return res
    }

    return (
        <EmpleadoContext.Provider value={{
            empleados,
            loadEmpleados,
            addEmpleado,
            removeEmpleado,
            editEmpleado
        }}>
            {props.children}
        </EmpleadoContext.Provider>
    )
}

export default EmpleadoContextProvider