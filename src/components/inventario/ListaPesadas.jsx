import React, {Fragment} from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useStyles from '../hooks/useStyles'

export function ListaPesadas({open, close, pesadas, handleDelete}){
    const classes = useStyles()
    return(
        <Dialog open={open} onClose={()=>close(false)} maxWidth="sm" fullWidth className={classes.pesadasList}>
            {pesadas === undefined ? null :
                <Fragment>
                    <DialogContent>
                        <Grid container 
                        justify="flex-start"
                        alignItems="flex-start"                                  
                        spacing={2}>
                            {pesadas.map((itm, i) => (
                                <Grid item xs={2} key={i}>
                                    <Typography display="inline" className={classes.textoMiniFacheron}>{i+1 +": "}</Typography>
                                    <Typography display="inline">{itm}</Typography>
                                    <IconButton onClick={() => handleDelete(itm, i)}>
                                        <HighlightOffIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            ))}
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