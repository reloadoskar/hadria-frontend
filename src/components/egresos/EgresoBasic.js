import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import useEgresos from './useEgresos'
import Confirm from '../dialogs/Confirm';
export default function EgresoBasic(props){
    const Egresos = useEgresos()
    const [egreso, setEgreso] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const classes = useStyles()
    useEffect(()=>{
        setEgreso(props.egreso)
        return () => {
            setEgreso(null)
        }
    }, [props])

    const onConfirm = () =>{
        Egresos.delEgreso(egreso._id)
            .then(()=>{
                setEgreso(null)
            })
    }
    return (
        <div>
            {egreso === null ? null :
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={1}>
                        <Typography>{egreso.fecha}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{egreso.concepto}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>{egreso.descripcion}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography className={classes.textoSangron} align="right">-{formatNumber(egreso.importe,2)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography align="right">
                            <IconButton size="small" onClick={()=>setConfirm(true)}>
                                <CancelIcon />
                            </IconButton>
                            <Confirm open={confirm} close={()=>setConfirm(false)} onConfirm={onConfirm}/>
                        </Typography>
                    </Grid>
                </Grid>
            }
        </div>
    )
}