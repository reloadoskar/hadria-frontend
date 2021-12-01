import { Button, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../hooks/useStyles';
import Inversion from './Inversion';
export default function InversionsList({inversions, meses, mes}){
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleChange = (mes) =>{
        handleClose()
    }
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} sm={3}>
                <Button
                    fullWidth
                    onClick={handleClick}
                    className={classes.botonsoteGenerico}
                    children={
                        meses[mes]
                    }
                />
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    getContentAnchorEl={null}
                    onClose={handleClose}
                >
                    {meses.map((mes,i)=>(
                        <MenuItem onClick={()=>handleChange(i)} key={i} children={mes} />
                    ))}
                </Menu>
            </Grid>
            <Grid item xs={12} sm={1}>
                <Typography variant="h2" align="center">{inversions ? inversions.length : null}</Typography>
                <Typography align="center">Inversiones</Typography>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={1}></Grid>
            {inversions.map( (inversion, i) => (
                <Inversion inversion={inversion} />
            ))}
        </Grid>
    )
}