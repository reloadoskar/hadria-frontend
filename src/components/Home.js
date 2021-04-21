import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import useStyles from './hooks/useStyles'
import LandingBar from './LandingBar'
import Login from './Login'
import { useSnackbar } from 'notistack'

export default function Home(props){
    const {message} = props
    const { enqueueSnackbar } = useSnackbar()
    const [elMensaje, setElMensaje] = useState(null)
    const classes = useStyles()
    useEffect(()=>{
        if(message !== null && message !== undefined){
            setElMensaje(message)
            enqueueSnackbar(message.texto, {type: message.tipo} )
        }
        return () => setElMensaje(null)
    },[message, enqueueSnackbar])
    return (
        <React.Fragment>
            <LandingBar />
            <div className={classes.backgroundCustom}>
                <Container className={classes.container}>
                    <Login />
                </Container>
            </div>
        </React.Fragment>
    )
}