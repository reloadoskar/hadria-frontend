import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import EgresoBasic from './EgresoBasic'
import { EgresoContext } from "../egresos/EgresoContext"

export default function EgresosList({data=[]}){
    const { egresos, setEgresos } = useContext(EgresoContext)
    useEffect(()=>{
        setEgresos(data)
        // return ()=>setEgresos([])
    },[data])
    return egresos.lenght <= 0 ?
        <Typography >No se encontraron datos.</Typography>
        :
        egresos.map((egreso, i) => (
            <EgresoBasic egreso={egreso} key={i} />
        ))
}