import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { Meses } from './Meses'
import useStyles from '../hooks/useStyles';
export default function SelectorMes({mes, cambiar }){
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClack = (op) => {
        cambiar(op)
        setAnchorEl(null)
    }
    return(
        <React.Fragment>
            <Button
                id="mes_btn"
                fullWidth
                onClick={handleClick}
                className={classes.paperSingle}
                children={
                    Meses.filter(m=>m.id === mes).map(m=>m.nombre)
                } />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handleClose}
            >
                {Meses.map((m, i) => (
                    <MenuItem onClick={() => handleClack(m.id)} key={i}>{m.nombre}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}