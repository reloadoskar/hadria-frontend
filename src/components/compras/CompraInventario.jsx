import React, { useEffect, useState } from 'react'
import { Card, CardContent, FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, Typography } from '@material-ui/core'
import CompraItemEditable from './CompraItemEditable'
import { formatNumber } from '../Tools'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import { useContext } from 'react'
import useStyles from '../hooks/useStyles'
import { useInventario } from '../inventario/InventarioContext'

export default function CompraInventario({ items }) {
    const { ubicacions } = useContext(UbicacionContext)
    const { inventarioPorUbicacion, setInventario } = useInventario()
    const [filtros, setFiltros] = useState({ ubicacion: "TODOS", ocultarTerminados: false })
    const classes = useStyles()

    useEffect(() => {
        if (items && filtros) {
            var listaFiltrada = items
            if (filtros.ubicacion !== "TODOS") {
                listaFiltrada = items.filter(itm => itm.ubicacion._id === filtros.ubicacion._id)
            }
            if (filtros.ocultarTerminados) {
                listaFiltrada = listaFiltrada.filter(el => el.stock > 0 || el.empaquesStock > 0)
            }
            setInventario(listaFiltrada)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, filtros])

    return (
        <Card>
            <CardContent>
                {!inventarioPorUbicacion ? "no hay datos" :
                    <div>
                        <Grid container style={{ background: "#c4d4cb", borderRadius: 3, }}>
                            <Grid item xs={12}>
                                <Typography align="center">Filtros </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        label="Ocultar terminados"
                                        control={<Switch checked={filtros.ocultarTerminados} onChange={(e) => setFiltros({ ...filtros, ocultarTerminados: e.target.checked })} />}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="ubicacion"
                                    label="Selecciona una ubicacion"
                                    select
                                    value={filtros.ubicacion}
                                    onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
                                >
                                    <MenuItem value={"TODOS"} key="todo">TODOS</MenuItem>
                                    {ubicacions.map((itm, i) => (
                                        <MenuItem value={itm} key={i}>{itm.nombre}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12}>
                                {inventarioPorUbicacion.map((el, i) => (
                                    <div key={i}>
                                        <Typography variant="h6">{el.ubicacion.nombre}</Typography>
                                        {el.items.length > 0 ?
                                            el.items.map((item, i) => (
                                                <CompraItemEditable elitem={item} key={i} />
                                            ))
                                            : null}
                                        <Grid container spacing={2} justifyContent="space-between">
                                            <Grid item xs={7}><Typography align="right" className={classes.textoMiniFacheron}>TOTALES</Typography></Grid>
                                            <Grid item xs={1}>
                                                <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc, el) => acc += el.empaques, 0), 2)}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc, el) => acc += el.cantidad, 0), 2)}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc, el) => acc += el.empaquesStock, 0), 2)}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography className={classes.textoMirame} align="right">{formatNumber(el.items.reduce((acc, el) => acc += el.stock, 0), 2)}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                            </Grid>
                                        </Grid>

                                    </div>
                                ))
                                }
                            </Grid>
                        </Grid>
                    </div>
                }
            </CardContent>
        </Card>
    )
}