import React from 'react'
import { Modal, CircularProgress, Box } from '@material-ui/core';
import useStyles from './hooks/useStyles'
const IsLoading = (props) =>{
    const {loading,} = props
    const classes= useStyles()
    return (
        <Modal
            open={loading}

            >
                <Box className={classes.isLoading}>
                    <CircularProgress color="secondary"/>
                </Box>
        </Modal>
    )
}

export default IsLoading