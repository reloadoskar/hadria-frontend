import React from 'react';

//COMPONENTS
import CrearCompra from './CrearCompra'

//MATERIAL UI
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//HOOKS
import useStyles from '../hooks/useStyles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ComprasDialog(props){
    var { open, close, crear, showMessage } = props
    const classes = useStyles();


    const handleClose = () => {
        close()
    }

    return (
        
        <Dialog fullScreen open={open} onClose={() => handleClose()} TransitionComponent={Transition}>
            <AppBar className={classes.comprasBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => handleClose()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Nueva Compra
                    </Typography>
                    <Button color="inherit" onClick={() => handleClose()}>
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>

            <Container>
                <CrearCompra {...props} showMessage ={showMessage} crear={crear} cerrar={handleClose}/>
            </Container>

        </Dialog>
    );
}