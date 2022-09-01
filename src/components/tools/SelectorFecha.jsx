import React, {useState, useEffect} from 'react'
import { Grid, IconButton, TextField } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
export default function SelectorFecha({action}){
    const auth = useAuth()
    const [lafecha, setLafecha] = useState(moment().format("YYYY-MM-DD"))
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
        action(lafecha)
    },[lafecha]) // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={1}>
                {auth.user.level > 2 ? null :
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
                    onChange={(e) => handleChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={1}>
                {auth.user.level > 2 ? null :
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