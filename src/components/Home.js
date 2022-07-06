import React from 'react'
import { Container } from '@material-ui/core'
import useStyles from './hooks/useStyles'
import LandingBar from './LandingBar'
import Login from './Login'

export default function Home(props){
    const classes = useStyles()
    return (
        <React.Fragment>
            <LandingBar />
            <div className={classes.backgroundCustom}>
                <Container maxWidth="xs" className={classes.container}>
                    <Login />
                </Container>
            </div>
        </React.Fragment>
    )
}