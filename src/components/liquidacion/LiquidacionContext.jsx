import React, {createContext, useState} from "react";
import { saveLiquidacion } from "../api";
export const LiquidacionContext = createContext()
const LiquidacionContextProvider = (props) => {
    const [liquidacion, setLiquidacion] = useState(null)
    const createLiquidacion = (data) => {
        setLiquidacion(data)
    }
    const addLiquidacion = async (data) =>{
        let res = await saveLiquidacion(data)
        // console.log(res)
        return res
    }
    return(
        <LiquidacionContext.Provider value={{
            liquidacion,
            createLiquidacion,
            addLiquidacion
        }}> {props.children}
        </LiquidacionContext.Provider>
    )
}

export default LiquidacionContextProvider