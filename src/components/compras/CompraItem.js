import React, { useEffect, useState } from 'react'
import { Divider, Grid, MenuItem, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';
export default function CompraItem(props) {
    const [item, setItem] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        if (props.elitem) {
            setItem(props.elitem)
        }
    }, [props.elitem])

    function selectItem(item) {
        props.action(item)
    }
    return (
        <React.Fragment>
            { item === null ? null :
                <Grid container justifyContent="center" className={classes.paperSingle}>
                    <Grid item xs={12} sm={12}>
                        <MenuItem onClick={() => selectItem(item)} >
                            <Grid container spacing={2} alignItems="flex-end">
                                <Grid item xs={10} sm={7}>
                                    <Typography className={classes.textoMiniFacheron} >{
                                        item.ubicacion.nombre ? item.ubicacion.nombre : null
                                    }</Typography>
                                    <Typography align="left">{item.producto.descripcion}</Typography>
                                    {/* <Typography align="left" className={classes.textoMiniFacheron}>{item._id}</Typography> */}
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography align="right" className={classes.textoMiniFacheron} >{item.producto.empaque ? item.producto.empaque.abr : item.productoempaque.abr}:</Typography>
                                    <Typography align="right">{formatNumber(item.empaquesStock, 2)}</Typography>
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Typography align="right" className={classes.textoMiniFacheron} >{item.producto.unidad ? item.producto.unidad.abr : item.productounidad.abr}:</Typography>
                                    <Typography align="right">{formatNumber(item.stock, 2)}</Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Grid>
                </Grid>
            }
            <Divider />
        </React.Fragment>
    )
}