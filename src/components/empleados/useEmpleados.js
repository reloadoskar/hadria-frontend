import {useState, useEffect} from 'react'
import {getEmpleados, saveEmpleado, delEmpleado, updateEmpleado} from '../api'
const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [updating, setUpdating] = useState(false)

    useEffect(()=>{
        fetchEmpleados()
        return () =>{
            setEmpleados([])
        }
    }, [updating])
    
    const fetchEmpleados = async () =>{
        const res = await getEmpleados()
        setEmpleados(res.empleados)
        return res.empleados
    }

    const crearEmpleado = async (empleado) =>{
        const res = await saveEmpleado(empleado)
        setUpdating(!updating)
        return res
    }

    const eliminarEmpleado = async (idEmpleado, index) =>{
        const res = await delEmpleado(idEmpleado)
        setUpdating(!updating)
        return res
    }

    const update = async (empleado) =>{
        const res = await updateEmpleado(empleado)
        return res
    }

    return {
        empleados,
        fetchEmpleados,
        crearEmpleado,
        eliminarEmpleado,
        update
    }
}

export default useEmpleados