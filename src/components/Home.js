import React, {useEffect, useState} from 'react'
import { Container } from '@material-ui/core'
import useStyles from './hooks/useStyles'
import LandingBar from './LandingBar'
import Login from './Login'

export default function Home(props){
    const classes = useStyles()
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
        return () => { setIsMounted(false) }
      }, [])
    return (
        <React.Fragment>
            {isMounted ? 
                <React.Fragment>
                    <LandingBar />
                    <div className={classes.backgroundCustom}>
                        <Container className={classes.container}>
                            <Login />
                        </Container>
                    </div>
                </React.Fragment>
                : null
        }
        </React.Fragment>
    )
}