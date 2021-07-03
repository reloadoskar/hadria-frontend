import React, { useState }from 'react'
import {Grid,  Divider, Typography, IconButton, Badge} from '@material-ui/core'
import VentaItem from './VentaItem'
import useStyles from '../hooks/useStyles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {formatNumber, sumCantidad, sumEmpaques, sumImporte} from '../Tools'
export default function VentaItems(props){
    const {items, eliminar} = props
    const classes = useStyles()
    const [verLista, setVerLista] = useState(false)
    const toggleVerLista  = () => {
        setVerLista(!verLista)
    }
    const handleEliminar = (index, item) => {
        eliminar(index, item)
        toggleVerLista()
    }
    return (
        <React.Fragment>
            {items.length <= 0 ? null : 
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="center" >
                            <Badge badgeContent={items.length} color="secondary">
                                <IconButton color="primary" onClick={toggleVerLista}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Badge>
                        </Typography>
                    </Grid>
                    <Divider />
                    {verLista === false ? null :
                        items.map((item, i)=> (
                            <VentaItem basic={true} item={item} key={i} index={i} eliminar={handleEliminar} />
                        ))
                    }
                    <Divider />
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron}>Total empaques:</Typography>
                            <Typography>{formatNumber(sumEmpaques(items),1)}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron}>Total unidades:</Typography>
                            <Typography>{formatNumber(sumCantidad(items),1)}</Typography>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Importe total:</Typography>
                            <Typography align="right">${formatNumber(sumImporte(items),2 )}</Typography>
                        </Grid>
                
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}