import React, {useState, useEffect} from 'react'
import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useInventario } from '../inventario/InventarioContext'
export default function SelectorFecha(){
    const {user} = useAuth()
    const {loadMovimientos} = useInventario()
    const [lafecha, setLafecha] = useState(moment().format("YYYY-MM-DD"))
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        loadMovimientos(user, lafecha).then(rs=>{
            setLoading(false)
        })
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
                {!loading ?
                    <TextField
                        id="date"
                        type="date"
                        fullWidth
                        value={lafecha}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    : <Typography align="center" component="div"><CircularProgress size={30} thickness={6} /></Typography>
                }
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