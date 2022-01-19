import React, { useEffect } from 'react'
import { useContext, useState } from 'react'

import { Container, Grid } from '@material-ui/core'

import { EmpresaContext } from './EmpresaContext'

import useStyles from '../hooks/useStyles'

export default function Empresa({data}){
    const {editEmpresa} = useContext(EmpresaContext)
    const [empresa, setEmpresa] = useState()
    const [editMode, setEditMode] = useState(false)
    const classes = useStyles()

    useEffect(()=>{
        setEmpresa(data)
    },[data])

    const handleChange = (type, value) =>{
        switch (type){
            default:
                setEmpresa({...empresa, [type]: value})
                break
        }
    }

    const actualizaEmpresa = () => {
        editEmpresa(empresa).then(() => {
          setEditMode(false)
        })
    }

    const handleEdit = () => {
        setEditMode(true)
    }
    return !empresa ? null :
        !editMode ? 
            <Grid container spacing={2} className={classes.paperContorno}>                
                
            </Grid>
        :
            <Grid container spacing={2} className={classes.paperContorno}>                
            </Grid>

}