import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, Avatar, DialogTitle, Grid, Typography, TextField, Button, Chip} from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { ListaPesadas } from './ListaPesadas';
export default function Pesadas(props){
    const{pesadas, addPesada, delPesada, clearPesadas} = props
    const [dialog, setDialog] = useState(false)
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
    function verLista(){
        setVerPesadas(true)
    }
    const openPesadas = () => {
        setDialog(true)
    }
    const closePesadas = () => {
        setDialog(false)
    }

    const handleDelete = (pesada, i) => {
        delPesada(pesada, i)
    }
    
    return (
        <React.Fragment>
            <Button fullWidth className={classes.botonGenerico} onClick={openPesadas}>Agrega Pesadas</Button>
            <Dialog maxWidth="sm" fullWidth open={dialog} onClose={closePesadas}>
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
                                <Typography align="center" component="div" >
                                    <Chip
                                        color="primary"
                                        avatar={<Avatar>{pesadas.length}</Avatar>}
                                        clickable
                                        label=" Ver lista"
                                        onClick={verLista}
                                    />
                                </Typography>
                                <ListaPesadas pesadas={pesadas} open={verPesadas} close={setVerPesadas} handleDelete={handleDelete}/>
                                {/* <Dialog open={verPesadas} onClose={()=>setVerPesadas(false)} maxWidth="sm" fullWidth className={classes.pesadasList}>
                                    <DialogContent>
                                        <Grid container 
                                        justifyContent="flex-start"
                                        alignItems="flex-start"                                  
                                        spacing={2}>
                                            {pesadas.map((itm, i) => (
                                                <Grid item xs={2} key={i}>
                                                    <Typography display="inline" className={classes.textoMiniFacheron}>{i+1 +": "}</Typography>
                                                    <Typography display="inline">{itm}</Typography>
                                                    <IconButton onClick={() => handleDelete(itm, i)}>
                                                        <HighlightOffIcon size="small" />
                                                    </IconButton>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={()=>setVerPesadas(false)}>Salir</Button>
                                    </DialogActions>
                                </Dialog> */}
                            </Grid>
                        }                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={()=>clearPesadas()}>reset</Button>
                    <Button className={classes.botonGenerico} onClick={()=>closePesadas()}>Listo</Button>
                </DialogActions>
                    </form>
            </Dialog>
        </React.Fragment>
    )
}