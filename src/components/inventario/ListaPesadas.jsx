import React, {Fragment} from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useStyles from '../hooks/useStyles'

const Pesada = ({data, index, deleteElement}) =>{
    const classes = useStyles()
    return (
        <Grid item xs={3} key={index}>
            <Typography display="inline" className={classes.textoMiniFacheron}>{index+1 +": "}</Typography>
            <Typography display="inline">{data}</Typography>
            <IconButton onClick={() => deleteElement(index)}>
                <HighlightOffIcon fontSize="small" />
            </IconButton>
        </Grid>
    )
}

export function ListaPesadas({open, close, pesadas, total, handleDelete}){
    const classes = useStyles()    
    return(
        <Dialog open={open} onClose={()=>close(false)} maxWidth="sm" fullWidth >
            {pesadas === undefined ? null :
                <Fragment>
                    <DialogContent>
                        <Grid container className={classes.pesadasList}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"                                  
                        spacing={2}>
                            {pesadas.map((itm, i) => (
                                <Pesada data={itm} index={i} key={i} deleteElement={handleDelete} />
                            ))}                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center" >Total = {total}</Typography>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>close(false)}>Salir</Button>
                    </DialogActions>
                </Fragment>
            }
        </Dialog>
    )
}