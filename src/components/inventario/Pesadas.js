import React, { useContext, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, TextField, Button, Chip} from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { ListaPesadas } from './ListaPesadas';
import { formatNumber } from '../Tools';
import { PesadasContext } from './PesadasContext';
export default function Pesadas({item}){
    const {lista, addPesada, delPesada, clearLista, tara, setTara, neto}= useContext(PesadasContext)
    const [dialog, setDialog] = useState(false)
    const classes = useStyles()
    const [peso, setPeso] = useState('')    
    const [verPesadas, setVerPesadas] = useState(false)
    
    const handleChange = (value) =>{
        if(value>=100){
            setPeso(formatNumber(value/10,1))
        }else{
            if(value>=1000){
                setPeso(value/100 )
            }else{
                setPeso(value)
            }
        }
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
    const handleReset = () => {
        clearLista()
        setPeso('')
    }
    
    return !item ? null :
        <React.Fragment>
            <Button fullWidth className={classes.botonGenerico} onClick={openPesadas}>Agrega Pesadas</Button>
            <Dialog maxWidth="sm" fullWidth open={dialog} onClose={closePesadas}>
                <DialogTitle disableTypography>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.textoMiniFacheron}>
                                Agregar Pesadas
                            </Typography>
                            <Typography className={classes.textoMirame}>
                               {item.compra.folio} - {item.producto.descripcion} {item.clasificacion}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.textoMiniFacheron}>
                                Disponible
                            </Typography>
                            <Typography className={classes.textoMirame}>
                                {item.empaquesStock}{item.producto.empaque.abr} - {Math.ceil(item.stock*100)/100}{item.producto.unidad.abr}                                
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                    <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                id="pesada"
                                disabled={neto <= item.stock && lista.length <= item.empaquesStock ? false : true}
                                required
                                type="number"
                                inputProps={{step: "any"}}
                                fullWidth
                                autoFocus
                                label="Peso"
                                variant="outlined"
                                value={peso}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button fullWidth type="submit" className={classes.botonGenerico} >
                                Agregar
                            </Button>
                        </Grid>
                        {lista.length <= 0 ? null :
                            <Grid item container xs={12}>
                                <Grid item xs={6}>
                                    <TextField 
                                        label="Destare"
                                        id="tara"
                                        type="number" 
                                        value={tara}
                                        onChange={(e)=>setTara(e.target.value)}
                                    />
                                    {/* <Button onClick={()=>destarar(tara)}>destarar</Button> */}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align="center" component="div" >
                                        <Chip
                                            color="primary"
                                            clickable
                                            label={ lista.length + "|" + formatNumber(neto,2) + " Ver lista"}
                                            onClick={verLista}
                                        />
                                        
                                    </Typography>
                                    <ListaPesadas 
                                        pesadas={PesadasContext}
                                        open={verPesadas}
                                        close={()=>setVerPesadas(false)}
                                        item={item}
                                        delPesada={delPesada}
                                        />
                                </Grid>
                            </Grid>
                        }                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={handleReset}>reset</Button>
                    <Button className={classes.botonGenerico} onClick={()=>closePesadas()}>Listo</Button>
                </DialogActions>
                    </form>
            </Dialog>
        </React.Fragment>
}