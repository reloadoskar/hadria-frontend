import React, {useRef} from 'react'
import { Dialog, DialogActions, DialogContent, Grid, Typography, IconButton, Button } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print';
import useStyles from '../hooks/useStyles'
import { useReactToPrint } from 'react-to-print';
import { formatNumber } from '../Tools';
export default function TicketPesadas({data, open, close}){
    const classes= useStyles()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
    return (
        <Dialog open={open} onClose={()=>close(false)} maxWidth="xs" fullWidth >
            <DialogContent ref={componentRef}>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography align="center" className={classes.textoMirame}>{data.pesadas.length}{data.item.producto.empaque.abr} {data.item.compra.folio}-{data.item.producto?data.item.producto.descripcion:null }</Typography>
                    </Grid>
                    {data.pesadas.map((item,i)=>(
                        <Grid item xs={2} container key={i}>
                            <Grid item >
                                <Typography display="inline">{item.pesada}</Typography>                                            
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12}>                        
                        <Typography align="right" className={classes.textoMirame}>Bruto: { formatNumber(data.bruto,2)+data.item.producto.unidad.abr}</Typography>
                        <Typography align="right" className={classes.textoMirame}>Destare: {data.tara + " x " + data.pesadas.length }</Typography>
                        <Typography align="right" className={classes.textoMirame}>Tara: {data.ttara}</Typography>
                        <Typography align="right" className={classes.textoMirame}>Neto: { formatNumber(data.neto,2)}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handlePrint}>
                    <PrintIcon />
                </IconButton>
                <Button onClick={()=>close()}>Salir</Button>
            </DialogActions>
        </Dialog>
    )
}