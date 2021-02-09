import {useState, useEffect} from 'react'
import {getEmpleados, addEmpleado, delEmpleado} from '../api'
const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [updtng, setupdtng] = useState(false)
    useEffect(()=>{
        getEmpleados().then(res=>{
            setEmpleados(res.empleados)
        })
        return () =>{
            setEmpleados([])
        }
    }, [updtng])

    const crearEmpleado = (empleado) =>{
        return addEmpleado(empleado).then(res => {
            setupdtng(!updtng)
            return res
        })
    }

    const eliminarEmpleado = (idEmpleado) =>{
        return delEmpleado(idEmpleado).then(res=>{
            return res
        })
    }

    return {
        empleados,
        crearEmpleado,
        eliminarEmpleado
    }
}

export default useEmpleados