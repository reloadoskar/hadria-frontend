import React, {useState, useContext, useEffect} from 'react'
import { Button, Container, Grid, TextField} from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import CrearCliente from './CrearCliente'
import { useSnackbar } from 'notistack'
import Cliente from './Cliente'
import {ClienteContext} from './ClienteContext'
export default function Clientes(){
    const {clientes, loadClientes, findCliente, loadCuentasxCliente, cuentasxCliente} = useContext(ClienteContext)
    const classes = useStyles()
    const [resultadoBusqueda, setResultado] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [searchField, setSearchField] = useState('')

    useEffect(()=> {
        loadClientes()
        loadCuentasxCliente()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    const closeDialog = () =>{
        setDialogOpen(false)
    }
    const handleChange = (field, value) => { 
        switch (field){
            case "search":
                if(value=== ''){ 
                    setResultado([])
                }else{
                    setResultado(findCliente( searchField.toUpperCase() ) )
                }
                return setSearchField(value)
            default:
                return setSearchField(value)
        }
    }
    return(
        <Container>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={6}>
                    <Button className={classes.botonGenerico} onClick={() => setDialogOpen(true)}>
                        + Nuevo Cliente
                    </Button>
                    <CrearCliente open={dialogOpen} close={closeDialog} />
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        fullWidth 
                        variant="outlined"
                        label="Buscar Cliente." 
                        value={searchField} 
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </Grid>
                <Grid container spacing={2}>
                    {resultadoBusqueda.length > 0 ? 
                        resultadoBusqueda.map((cliente, i) => (
                            <Cliente key={i} data={cliente} cuenta={cuentasxCliente.filter(cuenta=>cuenta._id === cliente._id)}/>
                        ))
                        :
                        clientes.map((cliente, i) => (
                            <Cliente key={i} data={cliente} cuenta={cuentasxCliente.filter(cuenta=>cuenta._id === cliente._id)}/>
                        ))
                    }
                </Grid>
                
            </Grid>
        </Container>
    )
}