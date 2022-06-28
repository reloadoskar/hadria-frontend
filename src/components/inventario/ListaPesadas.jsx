import React, {useRef} from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, IconButton, DialogTitle } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PrintIcon from '@material-ui/icons/Print';
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { formatNumber } from '../Tools';

const Pesada = ({data, index, deleteElement, noDelete=false}) =>{
    const classes = useStyles()
    return (
        <Grid item xs={2} container key={index}>
            <Grid item >
                <Typography display="inline" className={classes.textoMiniFacheron}>{index+1 +": "}</Typography>
                <Typography display="inline">{data}</Typography>                
                {noDelete?
                    null
                    : 
                    <IconButton onClick={() => deleteElement(index)}>
                        <HighlightOffIcon fontSize="small" />
                    </IconButton>
                }
            </Grid>
        </Grid>
    )
}

export function ListaPesadas({open, close, pesadas, total, handleDelete, noDelete}){
    const classes = useStyles()    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
      return pesadas === undefined ? null :
        <Dialog open={open} onClose={()=>close(false)} maxWidth="md" fullWidth ref={componentRef}>
            <DialogTitle >Total: {pesadas.length + "|" + formatNumber(total,1) }</DialogTitle>
            <DialogContent >
                <Grid container className={classes.pesadasList}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"                                  
                >
                    {pesadas.map((itm, i) => (
                        <Pesada data={itm} index={i} key={i} deleteElement={handleDelete} noDelete={noDelete}/>
                    ))}                            
                </Grid>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handlePrint}>
                    <PrintIcon />
                </IconButton>
                <Button onClick={()=>close(false)}>Salir</Button>
            </DialogActions>
        </Dialog>
}