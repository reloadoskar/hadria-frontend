import React, { useState, useEffect, createContext } from "react"

export const PesadasContext = createContext()
const PesadasContextProvider = (props) => {
    const [lista, setLista] = useState([])
    const [tara, setTara] = useState(0)
    const [ttara, setTtara] = useState(0)
    const [bruto, setBruto] = useState(0)
    const [neto, setNeto] = useState(0)

    useEffect(()=>{
        if(lista.length>0){
            // console.log(lista)
            // console.log("cambiando")
            let nb = lista.reduce((ac,el)=> ac+=parseFloat(el.pesada),0)
            setBruto(nb)
            let tt = tara * lista.length
            let ne = nb - tt
            setTtara(tt)
            setNeto(ne)
        }
        // setLista([])
    },[lista, tara])

    const addPesada = (pesada) => {
        setLista([...lista, {id:lista.length+1 ,pesada: pesada}])
    }

    const delPesada = (id) => {
        // let ls = lista
        //     ls.splice(index,1)
        setLista(lista.filter(itm=>itm.id !== id))
    }

    const clearLista = () => {
        setLista([])
        setBruto(0)
        setNeto(0)
        setTara(0)
        setTtara(0)
    }
    return (
        <PesadasContext.Provider value={{
            lista,tara,ttara,bruto,neto,addPesada,delPesada,clearLista,setTara
        }}>
            {props.children}
        </PesadasContext.Provider>
    )
}
export default PesadasContextProvider