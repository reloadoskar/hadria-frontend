import React, { useEffect, useState, useContext } from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import { EgresoContext } from "../egresos/EgresoContext"
import Confirm from '../dialogs/Confirm';
export default function EgresoBasic(props){
    const { removeEgreso } = useContext(EgresoContext)
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
        removeEgreso(egreso._id)
            .then(()=>{
                setEgreso(null)
            })
    }
    return (
        <div>
            {egreso === null ? null :
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <Typography className={classes.textoMiniFacheron}>{egreso.fecha}</Typography>
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