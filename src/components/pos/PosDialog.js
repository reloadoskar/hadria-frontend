import React from 'react'
// import moment from 'moment'

import PosMenu from './PosMenu'
import PosComprasFor from './PosComprasFor'
import PosListaDeVenta from './PosListaDeVenta'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Typography, IconButton, Dialog, Slide, Toolbar, Grid, Button, DialogContent, DialogActions } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {formatNumber} from '../Tools'
import useStyles from '../hooks/useStyles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PosDialog({ 
        inventario,
        ubicacion,
        fecha,
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
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={ (e) => handleClick('menuDialog', e) } aria-label="close">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {/* {ubicacion.nombre} | {moment(fecha).format("DD MMMM [de] YYYY")} */}
                </Typography>
            </Toolbar>

            <PosMenu anchorEl={anchorEl} openDialog={openDialog} showCorte={showCorte} isOpen={menuDialog} closeDialog={closeDialog}/>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md>
                        <PosComprasFor
                            inventario={inventario}
                            wantThisItem={wantThisItem}
                            showMessage={showMessage} />

                    </Grid>
                    <Grid item xs={12} md>
                        <PosListaDeVenta
                            items={values.itemsToSave}
                            openDialog={openDialog}
                            total={values.total}
                            removeItem={removeItem} />

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                        <Button 
                            size="large"
                            fullWidth
                            disabled={values.total > 0 ? false : true}
                            className={ values.total === 0 ? classes.botonGenerico : classes.botonCosmico}
                            onClick={() => openDialog('cobrarDialog')}
                            variant="contained"
                            startIcon={<MonetizationOnIcon />}
                        >
                            Cobrar ${formatNumber( values.total )} (x)
                        </Button>
            </DialogActions>

        </Dialog>
    )
}