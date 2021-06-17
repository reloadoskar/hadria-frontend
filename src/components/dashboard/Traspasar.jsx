import React, { useState} from 'react'
import { Dialog, DialogTitle, DialogContent, Grid, TextField, MenuItem, DialogActions, Button, Zoom, Typography } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
const init = {
    fecha: moment().format("YYYY-MM-DD"),
    origen: '',
    destino:'',
    importe: 0,
}

export default function Traspasar({save, ubicacions, open, close}){
    const classes = useStyles()
    const [traspaso, setTraspaso] = useState(init)
    const [guardando, setGuardando] = useState(false)
    const handleChange = (field, value) => {
        switch(field){
            default: setTraspaso({...traspaso, [field]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        save(traspaso)
        
        setGuardando(false)
        setTraspaso(init)
        close()
    }
    return(
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={()=>close()}
        >
            <DialogTitle>Traspasar</DialogTitle>
            <form onSubmit={handleSubmit}>
                {guardando ? 
                    <Zoom in={guardando} >
                        <Typography variant="h5" align="center">Guardando...</Typography>
                    </Zoom>
                    :
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="origen"
                                    select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Selecciona una Ubicación Origen"
                                    value={traspaso.origen}
                                    onChange={(e) => handleChange('origen', e.target.value)}
                                >
                                    {ubicacions.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="destino"
                                    select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Selecciona una Ubicación Destino"
                                    value={traspaso.destino}
                                    onChange={(e) => handleChange('destino', e.target.value)}
                                >
                                    {ubicacions.filter(ubic => ubic.nombre !== traspaso.origen.nombre).map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="referencia"
                                    label="referencia"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={traspaso.referencia}
                                    onChange={(e) => handleChange('referencia', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="importe"
                                    variant="outlined"
                                    label="Importe"
                                    required
                                    fullWidth
                                    type="number"
                                    value={traspaso.importe}
                                    onChange={(e) => handleChange('importe', e.target.value)}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                }
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={() => close()} >
                    Cancel
                </Button>
                <Button className={classes.botonGenerico} type="submit" disabled={traspaso.importe === 0 || guardando === true ? true : false}>
                    Registrar
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}