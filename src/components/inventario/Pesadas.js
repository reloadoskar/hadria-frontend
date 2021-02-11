import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, TextField, Button } from '@material-ui/core'
export default function Pesadas(props){
    const {open, close, addPesada, clearPesadas, pesadas, classes, totalcant, totalemp} = props
    const [peso, setPeso] = useState('')
    const handleChange = (value) =>{
        setPeso(value)
    } 
    const handleSubmit = (e) => {
        e.preventDefault()
        addPesada(peso)
        setPeso('')
    }
    const handleClose = () => {
        close()
    }
    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={close}>
            <DialogTitle>Agregar Pesadas</DialogTitle>
                <form onSubmit={handleSubmit}>
            <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="pesada"
                                required
                                fullWidth
                                label="Peso"
                                variant="outlined"
                                value={peso}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button fullWidth type="submit" className={classes.botonGenerico} >
                                Agregar
                            </Button>
                        </Grid>
                        {pesadas.length > 0 ?
                            <Grid container spacing={2}>
                                {pesadas.map((itm, i)=>(
                                    <Grid item xs={2} key={i}>
                                        {itm}
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                <Typography>Total: {totalcant} - Pesadas: {totalemp}</Typography>
                                </Grid>
                            </Grid>
                            :
                            null
                        }
                    </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={clearPesadas}>reset</Button>
                <Button className={classes.botonGenerico} onClick={handleClose}>Listo</Button>
            </DialogActions>
                </form>
        </Dialog>
    )
}