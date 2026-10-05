import React, { useContext, useState } from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import Movimiento from './Movimiento'
import SelectorFecha from '../tools/SelectorFecha'
import {InventarioContext} from '../inventario/InventarioContext'
import { useAuth } from '../auth/use_auth'
export default function Movimientos(){
    const {user} = useAuth()
    const {movimientos, movimientosPagination, loadMoreMovimientos} = useContext(InventarioContext)
    const [loadingMore, setLoadingMore] = useState(false)

    const loadMore = async () => {
        setLoadingMore(true)
        try{
            await loadMoreMovimientos(user)
        }finally{
            setLoadingMore(false)
        }
    }
    return (
        <div>
            <SelectorFecha />
                <Grid container spacing={2}  >
                    { movimientos.length === 0 ? 
                        <Grid item xs>
                            <Typography align="center">No hay resultados. 👻</Typography>
                        </Grid>
                        :
                        movimientos.map((mov)=>(
                        <Movimiento mov={mov} key={mov._id}  />
                    ))}
                    {movimientosPagination.hasMore ?
                        <Grid item xs={12}>
                            <Typography align="center" component="div">
                                <Button onClick={loadMore} disabled={loadingMore}>
                                    {loadingMore ? <CircularProgress size={24} /> : 'Cargar más movimientos'}
                                </Button>
                            </Typography>
                        </Grid>
                        : null}
                </Grid>
        </div>
    )
}