import React from 'react'
import { Button, Container, Typography } from '@material-ui/core'
import useStyles from './hooks/useStyles'
import { useHistory } from 'react-router-dom'

export default function NotFound(){
    let classes = useStyles()
    let history = useHistory()
    const handleClick = () => {
        history.push("/")
    }
    return(
        <Container className={classes.error404}>
            <Typography variant="h1">
                404:
            </Typography>
            <Typography variant="h4">
                La página que buscas, ¡desapareció!
            </Typography>
            <Button
                onClick={handleClick} 
                className={classes.botonCosmico} >Regresar</Button>
        </Container>
    )
}