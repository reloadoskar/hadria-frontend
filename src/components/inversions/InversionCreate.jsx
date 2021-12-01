import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, Button } from '@material-ui/core';
import { ProductorContext } from '../productors/ProductorContext';
import moment from 'moment'
import { useSnackbar } from 'notistack'
import useStyles from '../hooks/useStyles';
export default function InversionCreate({open, close, create}){
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }    
    const {productors, loadProductors} = useContext(ProductorContext)
    const [inversion, setInversion] = useState({
        productor: "",
        fecha: moment().format("YYYY-MM-DD"),
        descripcion: "NUEVA INVERSION"
    })
    useState(()=>{
        loadProductors()
    },[])
    const handleChange = (field, value) => {
        switch(field){            
            default:
                return setInversion({...inversion, [field]: value })
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        create(inversion).then(res=>{
            showMessage(res.message, res.status)
            close()
        })
    }
    return(
        <Dialog
            maxWidth="lg"
            open={open}
            onClose={close}
            >   
                <form onSubmit={(e) => handleSubmit(e)}>
                <DialogTitle>Nueva Inversi&oacute;n</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                id="productor"
                                required
                                fullWidth
                                label="Productor"
                                select
                                variant="outlined"
                                value={inversion.productor}
                                onChange={(e) => handleChange('productor', e.target.value)}
                            >
                                {productors.length > 0 ? 
                                    productors.map((productor, i) =>(
                                        <MenuItem key={i} value={productor}> 
                                            {productor.nombre}
                                        </MenuItem>
                                    ))
                                    : null
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="descripcion"
                                fullWidth
                                label="Descripcion"
                                type="text"
                                variant="outlined"
                                value={inversion.descripcion}
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={close}>Cancelar</Button>
                    <Button type="submit" className={classes.botonGenerico}>Crear</Button>
                </DialogActions>
                </form>
        </Dialog>
    )
}