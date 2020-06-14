import React from 'react'
import moment from 'moment'

import PosMenu from './PosMenu'
import PosComprasFor from './PosComprasFor'
import PosListaDeVenta from './PosListaDeVenta'

import { Typography, IconButton, Dialog, Slide, AppBar, Toolbar, Grid, Container, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from '../hooks/useStyles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PosDialog({ 
        values, 
        isOpen,
        wantThisItem, 
        showMessage, 
        removeItem,
        menuDialog, 
        closeDialog,
        resetVenta,
        showCorte, 
        openDialog }) {
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
        
    const handleClick = (dialog, event) => {
        setAnchorEl(event.currentTarget);
        openDialog(dialog)
    };

    const handleKeyPress = (e) => {
        if(e.key === "x" || e.key === "X"){
            
            openDialog('cobrarDialog')
        }
    }

    return (
        <Dialog 
            onKeyPress={(e) => handleKeyPress(e)}
            fullScreen 
            open={isOpen} 
            onEnter={resetVenta}
            onClose={() => closeDialog('posDialog')} 
            TransitionComponent={Transition}>
            
            <AppBar className={classes.posBar} position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={ (e) => handleClick('menuDialog', e) } aria-label="close">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        POS| {values.ubicacion.nombre} | {moment(values.fecha).format("DD MMMM [de] YYYY")}
                    </Typography>
                </Toolbar>
            </AppBar>

            <PosMenu anchorEl={anchorEl} openDialog={openDialog} showCorte={showCorte} isOpen={menuDialog} closeDialog={closeDialog}/>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md>
                    <PosComprasFor
                        inventario={values.inventarioFiltrado}
                        wantThisItem={wantThisItem}
                        showMessage={showMessage} />

                </Grid>
                <Grid item xs={12} md>
                    <Container fixed>
                    <PosListaDeVenta
                        items={values.itemsToSave}
                        openDialog={openDialog}
                        total={values.total}
                        removeItem={removeItem} />
                    </Container>
                </Grid>
            </Grid>

        </Dialog>
    )
}