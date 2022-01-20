import React, {useContext, useState} from 'react'
import useStyles from '../hooks/useStyles'
import { useSnackbar } from 'notistack'
import {IngresoContext} from '../ingresos/IngresoContext'
import { Dialog, Button, DialogContent, Grid, TextField, DialogTitle, DialogActions } from '@material-ui/core'
const IngresoCreate = ({open, close, ubicacion, fecha}) => {
    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }    
    const [guardando, setGuardando] = useState(false)
    const {addIngreso} = useContext(IngresoContext)

    const [ingreso, setIngreso] = useState({
        fecha: fecha,
        ubicacion: ubicacion,
        concepto: "INGRESO A CAJA"
    })

    const handleChange = (field, value) => {
        switch (field) {
            case "descripcion":
                return setIngreso({...ingreso, descripcion: value.toUpperCase()})
            default:
                return setIngreso({...ingreso, [field]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        addIngreso(ingreso).then(res=> {
            showMessage(res.message, res.status)
            setGuardando(false)
            close()
            setIngreso({})
        })
    }

    return (
        <Dialog
            maxWidth="md"
            open={open}
            onClose={close}
        >
            <DialogTitle >+ Nuevo Ingreso</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                id="descripcion"
                                label="Descripción"
                                fullWidth
                                value={ingreso.descripcion}
                                variant="outlined"
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="importe"
                                label="Importe"
                                type="number"
                                fullWidth
                                value={ingreso.importe}
                                variant="outlined"
                                onChange={(e) => handleChange('importe', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={()=>close()}
                    >
                        cancelar
                    </Button>
                    <Button 
                        type="submit"
                        className={classes.botonGenerico}
                        disabled = {ingreso.importe === "" || ingreso.ubicacion === "" || ingreso.fecha === "" || guardando === true ? true : false }
                        variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}

export default IngresoCreate