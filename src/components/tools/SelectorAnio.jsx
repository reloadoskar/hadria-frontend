import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import useStyles from '../hooks/useStyles';
export default function SelectorAnio({anio, cambiar}){
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    let start = anio-2
    let anios = Array(5).fill().map(x=>x=start++)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClack = (op) => {
        cambiar(op)
        setAnchorEl(null)
    }
    return(
        <React.Fragment>
            <Button
                id="year_btn"
                fullWidth
                onClick={handleClick}
                className={classes.paperSingle}
                children={anio} />
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
                    {anios.map(an=>(
                        <MenuItem value={an} key={an} onClick={()=>handleClack(an)}>
                            {an}
                        </MenuItem>
                    ))}                
                    </Menu>
        </React.Fragment>
    )
}