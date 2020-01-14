import React from 'react'
import { Modal, CircularProgress, Box } from '@material-ui/core';
import useStyles from './components/hooks/useStyles'
const IsLoading = (props) =>{
    const {isLoading, toggleIsLoading} = props
    const classes= useStyles()
    const handleClose = () => {
        toggleIsLoading()
    }
    return (
        <Modal
            open={isLoading}
            onClose={handleClose}
            >
                <Box className={classes.isLoading}>
                    <CircularProgress color="secondary"/>
                </Box>
        </Modal>
    )
}

export default IsLoading