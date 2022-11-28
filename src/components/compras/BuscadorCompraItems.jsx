import React, {useState} from 'react'
import { Grid, TextField, MenuItem, Button  } from '@material-ui/core'
import useStyles from '../hooks/useStyles'

export default function BuscadorCompraItems(items){
    const classes = useStyles()
    const [resultadoBusqueda, setResultado] = useState([]) 
    const [busqueda, setBusqueda] = useState({
        buscarPor:'folio',
        texto:''
    })
    const handleChange = (field, value) => {
        switch (field) {
            case "texto":
                setBusqueda({...busqueda, texto: value.toUpperCase()})
            break
            default:
                setBusqueda({...busqueda, [field]: value})
                break;
        }
    }
    const handleBuscar = (e) => {
        e.preventDefault()
        if(busqueda.buscarPor === "folio"){
            setResultado(items.filter(item=> item.compra.folio === parseInt( busqueda.texto) ))
        }else{
            setResultado(items.filter(item=> item.producto.descripcion.indexOf( busqueda.texto ) !== -1 ) )
        }
        if(busqueda.texto === ""){
            setResultado([])
        }
    }
    return(
        <form onSubmit={(e) => handleBuscar(e)}>
        <Grid container spacing={2} justifyContent="center" className={classes.paperContorno}>
            <Grid item xs={3}>
                <TextField                
                    id="tipo"
                    fullWidth
                    select
                    label="Buscar por:"
                    value={busqueda.buscarPor}
                    onChange={(e) => handleChange('buscarPor', e.target.value)}
                >
                    <MenuItem value="folio">FOLIO</MenuItem>
                    <MenuItem value="producto">PRODUCTO</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="texto"
                    type="text"
                    label="Texto de búsqueda"
                    value={busqueda.texto}
                    onChange={(e) => handleChange('texto', e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <Button className={classes.botonGenerico}
                    type="submit"
                >buscar</Button>
            </Grid>
        </Grid>
        </form>
    )
}