import React, {useState, useEffect} from 'react'
import { Grid, TextField, MenuItem, Button } from '@material-ui/core'
import CompraItem from './CompraItem'
import useStyles from '../hooks/useStyles'
export default function Items({inventario, selectItem}){
    const classes = useStyles()
    const [items, setItems] = useState([])
    const [busqueda, setBusqueda] = useState({
        buscarPor:'folio',
        texto:''
    })
    const [resultadoBusqueda, setResultado] = useState([]) 

    useEffect(()=>{
        setItems(inventario)
    },[inventario])

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
    return (
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
        <Grid container spacing ={2} className={classes.paperBasico}>
            {
                resultadoBusqueda.length > 0 ? 
                    resultadoBusqueda.filter(item => item.empaquesStock >= 0.5 && item.stock > 0.1 ).map((item, i) => (
                        <CompraItem elitem={item} key={i} action={selectItem} />
                    ))
                    :
                    items.filter(item => item.empaquesStock >= 0.5 && item.stock > 0.1 ).map( (item, i) => (
                        <CompraItem elitem={item} key={i} action={selectItem} />
                    ))
            }
        </Grid>
        </form>
    )
}