import React from 'react'
import { Menu, ListItemIcon, Typography, MenuItem, Divider } from '@material-ui/core';

import PaymentIcon from '@material-ui/icons/Payment';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '../hooks/useStyles'
export default function PosMenu ({openDialog, closeDialog, showCorte, isOpen, anchorEl}){
    
    const classes = useStyles()

    const handleClick = (dialog) => {
        openDialog(dialog)
        closeDialog('menuDialog')
    }

    return(
        <Menu 
            id="pos-menu"
            className={classes.posMenu}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => closeDialog('menuDialog')}
        >
            
                <MenuItem onClick={() => handleClick('ingresoDialog')}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <Typography>
                        Hacer un Ingreso
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('egresoDialog')}>
                    <ListItemIcon>
                        <RemoveIcon />
                    </ListItemIcon>
                    <Typography>
                        Hacer un Egreso
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('pagarDialog')}>
                    <ListItemIcon>
                        <PaymentIcon />
                    </ListItemIcon>
                    <Typography>
                        Hacer un Pago
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('cobroDialog')}>
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <Typography>
                        Hacer un Cobro
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('retiroDialog')}>
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <Typography>
                        Hacer un Retiro
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => showCorte()}>
                    <ListItemIcon>
                        <VisibilityIcon />
                    </ListItemIcon>
                    <Typography>
                        Revisar Corte
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => closeDialog('posDialog')}>
                    <ListItemIcon>
                        <CloseIcon />
                    </ListItemIcon>
                    <Typography>
                        Salir
                    </Typography>
                </MenuItem>
            
        </Menu>
    )
}