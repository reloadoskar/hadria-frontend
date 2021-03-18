import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, Avatar, DialogTitle, Grid, Typography, TextField, Button, Chip } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
export default function Pesadas(props){
    const {open, close, addPesada, clearPesadas, pesadas} = props
    const classes = useStyles()
    const [peso, setPeso] = useState('')
    const [verPesadas, setVerPesadas] = useState(false)
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
    function verLista(){
        setVerPesadas(true)
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
                            autoFocus
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
                    {pesadas.length <= 0 ? null :
                        <Grid item xs={12}>
                            <Typography align="center">
                                <Chip
                                    color="primary"
                                    avatar={<Avatar>{pesadas.length}</Avatar>}
                                    clickable
                                    label=" Ver lista"
                                    onClick={verLista}
                                />
                            </Typography>
                            <Dialog open={verPesadas} onClose={()=>setVerPesadas(false)} maxWidth="sm" fullWidth className={classes.pesadasList}>
                                <DialogContent>
                                    <Grid container 
                                    direction="column"
                                    justify="center"
                                    alignItems="flex-start"                                  
                                    spacing={2}>
                                        {pesadas.map((itm, i) => (
                                            <Grid item xs={2} key={i}>
                                                <Typography display="inline" className={classes.textoMiniFacheron}>{i+1}</Typography>
                                                <Typography display="inline">{itm}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>setVerPesadas(false)}>Salir</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    }                        
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={()=>clearPesadas()}>reset</Button>
                <Button className={classes.botonGenerico} onClick={()=>handleClose()}>Listo</Button>
            </DialogActions>
                </form>
        </Dialog>
    )
}