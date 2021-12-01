import React, { useState, useContext } from 'react';
import { Grid, Typography, Badge, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import {ProductorContext} from './ProductorContext'
import Confirm from '../dialogs/Confirm';

export default function ProductorBasic({productor}){
    const {removeProductor} = useContext(ProductorContext)
    const [confirm, setConfirm] = useState(false)
    const onConfirm = () =>{
        removeProductor(productor._id)
            .then(()=>{
                
            })
    }
    return !productor ? null :
        <Grid item container xs={12}>
            <Grid item xs={4}>
                <Typography>{productor.nombre}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>{productor.direccion}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{productor.clave}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography>{productor.tel1}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography align='right'>
                    <Badge variant="dot" color="secondary">
                        <IconButton size="small">
                            <VisibilityIcon />
                        </IconButton>
                    </Badge>
                        <IconButton size="small" onClick={()=>setConfirm(true)} >
                            <CancelIcon />
                        </IconButton>
                        <Confirm open={confirm} close={()=>setConfirm(false)} onConfirm={onConfirm}/>
                </Typography>
            </Grid>
        </Grid>
}