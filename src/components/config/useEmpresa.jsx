import React, { useEffect, useState } from 'react'
import { getEmpresa, saveEmpresa, updateEmpresa } from '../api'
export default function useEmpresa(){
    const [data, setData] = useState(null)

    const get = async () => await getEmpresa()
    
    const save = async (empresa) => await saveEmpresa(empresa)

    const update = async (empresa) => await updateEmpresa(empresa)
return{
    data,
    get,
    save,
    update,
    setData
}
    
}