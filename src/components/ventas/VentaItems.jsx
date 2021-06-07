import React, { useEffect, useState }from 'react'
import {Grid, Card, CardHeader, Divider, Typography, IconButton, Badge} from '@material-ui/core'
import VentaItem from './VentaItem'
import useStyles from '../hooks/useStyles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {formatNumber, sumImporte} from '../Tools'
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
                    <Grid item xs={12}>
                        <Typography align="right" className={classes.textoMiniFacheron}>TOTAL:</Typography>
                        <Typography align="right">${formatNumber(sumImporte(items),2 )}</Typography>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}