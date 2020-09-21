import React, { useState } from 'react';
import { Dialog, AppBar,IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import useStyles from '../hooks/useStyles'

const Liquidacion = (compra, open, close) => {
    const classes = useStyles()
return (
    <Dialog
        fullScreen
        scroll="body"
        open={open}
        TransitionComponent={Transition}
        onClose={close}>

        <AppBar className={classes.liquidacionBar}>
            <Toolbar >
                <IconButton edge="start" onClick={handleClose}>
                    <CloseOutlinedIcon />
                </IconButton>
                
            </Toolbar>
        </AppBar>

    </Dialog>
)
}

export default Liquidacion