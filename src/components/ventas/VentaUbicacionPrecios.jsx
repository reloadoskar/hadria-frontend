import React from "react"
import { Grid, Typography, Container } from "@material-ui/core"
import { agrupaVentas } from "../Tools"
import useStyles from "../hooks/useStyles"
import VentaItemPrecios from "./VentaItemPrecios"
export default function VentaUbicacionPrecios({ubicacion, ventas, productos}){
    const classes = useStyles()
    return ventas.length > 0 ?
        <Grid container className={classes.paperContorno} >
            <Grid item xs={12}>
                <Typography variant="h6" align="center" className={classes.textoMirame}>{ubicacion.nombre}</Typography>
                <Container maxWidth="md">
                    { productos.map((producto, index) => (
                        <VentaItemPrecios 
                            basic
                            item={producto} 
                            precios={agrupaVentas( ventas.filter(vta => vta.producto._id === producto.id ), "precio")} 
                            key={index}
                        />
                    ))}
                </Container>
            </Grid>
        </Grid>
    : null
}