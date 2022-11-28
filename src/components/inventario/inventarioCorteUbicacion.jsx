import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import InventarioCompraItem from './InventarioCompraItem'
import useStyles from '../hooks/useStyles'
import { formatNumber, sumEmpStock, sumStock } from '../Tools'
import { useInventario } from './InventarioContext'
import { useAuth } from '../auth/use_auth'

export default function InventarioCorteUbicacion(){
    const {user} = useAuth()
    const {ubicacionInventario} = useInventario()
    const classes = useStyles()
    return !ubicacionInventario ? null :  !ubicacionInventario.items ? null :
        <Grid container spacing={2} >
            {user.level<2?
                <React.Fragment>
                    <Grid item container className={classes.paperBasico}>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Folios Activos:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{ubicacionInventario.items.length}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Empaques:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(sumEmpStock(ubicacionInventario.items) || 0,2)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Unidades:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(sumStock(ubicacionInventario.items) || 0,2)}</Typography>
                        </Grid>
                    </Grid>
                    {ubicacionInventario.items.map((item,i)=>(
                        <InventarioCompraItem item={item} key={i} />
                    ))}
                </React.Fragment>
                : 
                <React.Fragment>
                    <Grid item container className={classes.paperBasico}>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Folios Activos:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{ubicacionInventario.items.length}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Empaques:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(ubicacionInventario.empaquesStockGlobal,2)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" className={classes.textoMiniFacheron}>Unidades:</Typography>
                            <Typography align="right" className={classes.textoMirame}>{formatNumber(ubicacionInventario.stockGlobal,2)}</Typography>
                        </Grid>
                    </Grid>
                    {ubicacionInventario.items.map((item,i)=>(
                        <InventarioCompraItem item={item} key={i} />
                    ))}
                </React.Fragment>
                }
        </Grid>
}