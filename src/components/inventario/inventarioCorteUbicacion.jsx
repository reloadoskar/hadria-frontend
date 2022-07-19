import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import InventarioCompraItem from './InventarioCompraItem'
import useStyles from '../hooks/useStyles'
import { formatNumber, sumEmpStock, sumStock } from '../Tools'

export default function InventarioCorteUbicacion({inventario=null, pov}){
    const classes = useStyles()
    return !inventario ? null :
        <Grid container spacing={2} >
            {pov?
                <React.Fragment>
                    <Grid item container className={classes.paperBasico}>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Folios Activos:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{inventario.length}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Empaques:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(sumEmpStock(inventario),2)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Unidades:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(sumStock(inventario),2)}</Typography>
                        </Grid>
                    </Grid>
                    {inventario.map((item,i)=>(
                        <InventarioCompraItem item={item} key={i} />
                    ))}
                </React.Fragment>
                : 
                <React.Fragment>
                    <Grid item container className={classes.paperBasico}>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Folios Activos:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{inventario.items.length}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Empaques:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(inventario.empaquesStockGlobal,2)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Unidades:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(inventario.stockGlobal,2)}</Typography>
                        </Grid>
                    </Grid>
                    {inventario.items.map((item,i)=>(
                        <InventarioCompraItem item={item} key={i} />
                    ))}
                </React.Fragment>
                }
        </Grid>
}