import React from 'react'
import { Typography, Box} from '@material-ui/core'
import useStyles from './hooks/useStyles'
const LandingBar = () => {
    const classes = useStyles()
    return (
        <Box classes={{root: classes.landingBar}}>
            <Typography className={classes.center} align="center" variant="h4" children="H A D R I A  2" />
        </Box>
    )
}

export default LandingBar