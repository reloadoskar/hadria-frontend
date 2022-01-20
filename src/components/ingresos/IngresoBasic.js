import React, { useEffect, useState, useContext } from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import {IngresoContext} from '../ingresos/IngresoContext'
import { useSnackbar } from 'notistack';
import {useAuth} from '../auth/use_auth'
import Confirm from '../dialogs/Confirm';
import { formatNumber } from '../Tools'
export default function IngresoBasic(props){
    const auth = useAuth()
    const {removeIngreso} = useContext(IngresoContext)
    const [ingreso, setIngreso] = useState(null)
    const [confirm, setConfirm] = useState(false)

    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    
    useEffect(()=>{
        setIngreso(props.ingreso)
        return () => {
            setIngreso(null)
        }
    }, [props])

    const onConfirm = () => {
        removeIngreso(ingreso._id).then(res=>{
            showMessage(res.message, res.status)
            setIngreso(null)
        })

      }
    return ingreso === null ? null :
        <Grid container spacing={1}>
            <Grid item xs={2} sm={2}>
                <Typography>{ingreso.fecha}</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Typography>{ingreso.concepto} | {ingreso.descripcion}</Typography>
            </Grid>
            <Grid item xs sm>
                <Typography align="right">$ {formatNumber(ingreso.importe,2)}</Typography>
            </Grid>
            {
                auth.user.level > 2 ? null :
                    <Grid item xs={3} sm={1}>
                        <Typography align="right">
                            <IconButton 
                                size="small"
                                onClick={()=>setConfirm(true)}
                            >
                                <CancelIcon />
                                <Confirm open={confirm} close={() => setConfirm(false)} onConfirm={onConfirm} />
                            </IconButton>
                        </Typography>
                    </Grid>
            }
        </Grid>
    
}