import React, { useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import useStyles from '../hooks/useStyles'
export default function Cliente({cliente}){
    const classes = useStyles()
    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia
                    className={classes.media}
                    image={cliente.sexo === 'M' ? avatarm : avatarh}
                />
                <CardContent>
                    <Typography variant="h6" >{cliente.nombre}</Typography>
                    <Typography>{cliente.tel1}</Typography>
                    <Typography>{cliente.email}</Typography>
                    <Typography align="right">límite {cliente.limite_de_credito}</Typography>
                    <Typography align="right">Disponible {cliente.credito_disponible}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}