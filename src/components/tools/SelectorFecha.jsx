import React, {useState, useEffect} from 'react'
import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useInventario } from '../inventario/InventarioContext'
import { getMovementDateError, getMovementRequestError } from '../inventario/movementRequest'
export default function SelectorFecha(){
    const {user} = useAuth()
    const {loadMovimientos} = useInventario()
    const [lafecha, setLafecha] = useState(moment().format("YYYY-MM-DD"))
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    function handleChange(value) {
		setLafecha(value)
	}
    function fechaSig() {
		let sig = moment(lafecha)
		sig.add(1, "days")
		handleChange(sig.format("YYYY-MM-DD"))
	}

	function fechaAnt() {
		let ant = moment(lafecha)
		ant.subtract(1, "days")
		handleChange(ant.format("YYYY-MM-DD"))
	}

    useEffect(()=>{
        let active = true
        const validationMessage = getMovementDateError(lafecha)
        if(validationMessage){
            setLoading(false)
            setErrorMessage(validationMessage)
            return () => { active = false }
        }

        setLoading(true)
        setErrorMessage('')
        loadMovimientos(user, lafecha)
            .catch(error => {
                if(active) setErrorMessage(getMovementRequestError(error))
            })
            .finally(() => {
                if(active) setLoading(false)
            })
        return () => { active = false }
    },[lafecha]) // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={1}>
                {user.level > 2 ? null :
                    <IconButton
                        onClick={fechaAnt}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                }
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="date"
                    type="date"
                    fullWidth
                    value={lafecha}
                    error={Boolean(errorMessage)}
                    helperText={errorMessage}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {loading ?
                    <Typography align="center" component="div"><CircularProgress size={30} thickness={6} /></Typography>
                    : null}
            </Grid>
            <Grid item xs={1}>
                {user.level > 2 ? null :
                    <IconButton
                        onClick={fechaSig}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                }
            </Grid>
        </Grid>
    )
}