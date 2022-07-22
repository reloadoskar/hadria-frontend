import React, {useRef} from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, IconButton, Box } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PrintIcon from '@material-ui/icons/Print';
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { PesadasContext } from './PesadasContext';
import { useContext } from 'react';
const Pesada = ({data, index, deleteElement, noDelete=false}) =>{
    return (
        <Grid item xs={3} container key={index}>
            <Grid item >
                <Typography display="inline">{data.pesada}</Typography>                
                {noDelete?
                    null
                    : 
                    <Box displayPrint="none" display="inline">
                        <IconButton onClick={() => deleteElement(data.id)}>
                            <HighlightOffIcon fontSize="small" />
                        </IconButton>
                    </Box>
                }
            </Grid>
        </Grid>
    )
}

export function ListaPesadas({open, close, noDelete, item={}}){
    const {lista, delPesada, bruto, tara, ttara, neto} = useContext(PesadasContext)
    const classes = useStyles()    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
    const handleDelete = (index) => {
        delPesada(index)
    // setVerPesadas(false)
    }
      return lista === undefined ? null :
        <Dialog open={open} onClose={()=>close(false)} maxWidth="xs" fullWidth >
            <DialogContent ref={componentRef}>
                <Grid container 
                    // direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"                                  
                >
                    <Grid item xs={12}>
                        <Typography align="center" className={classes.textoMirame}>{lista.length}{item.producto.empaque.abr} {item.producto?item.producto.descripcion:null }</Typography>
                    </Grid>
                    {lista.map((itm, i) => (
                        <Pesada data={itm} index={i} key={i} deleteElement={handleDelete} noDelete={noDelete}/>
                    ))}                            
                </Grid>
                <Grid item xs={12}>                    
                    <Typography align="right" className={classes.textoMirame}>Bruto: {Math.ceil(bruto*100)/100+item.producto.unidad.abr}</Typography>
                    <Typography align="right" className={classes.textoMirame}>Destare: {tara + " x " + lista.length }</Typography>
                    <Typography align="right" className={classes.textoMirame}>Tara: {ttara}</Typography>
                    <Typography align="right" className={classes.textoMirame}>Neto: {Math.ceil(neto*100)/100}</Typography>
                </Grid>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handlePrint}>
                    <PrintIcon />
                </IconButton>
                <Button onClick={()=>close()}>Salir</Button>
            </DialogActions>
        </Dialog>
}