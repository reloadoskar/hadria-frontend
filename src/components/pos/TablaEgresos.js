import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Paper';
import { Typography, CardHeader, CardContent, Grid } from '@material-ui/core';
import { sumImporte, formatNumber } from '../Tools'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
}));

export default function TablaEgresos({ table, data }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.paper}>
                <CardHeader
                    title={data.length + " " + table}
                    titleTypographyProps={{
                        align: "right",
                        
                    }}
                    subheader= {"$" + sumImporte(data)}
                    subheaderTypographyProps={{
                        align: "right",
                        variant: "h4"
                    }} />
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs>Ubicación</Grid>
                        <Grid item xs>Concepto</Grid>
                        <Grid item xs>Descripción</Grid>
                        <Grid item xs>Importe</Grid>
                    </Grid>

                    <Grid container>
                        {data.map((row, index) => (
                            <Grid item xs={12} key={index}>

                                <Grid container spacing={2}>

                                    <Grid item md  >
                                        <Typography variant="body2" children={row.ubicacion.nombre} />
                                    </Grid>

                                    <Grid item md  >
                                        <Typography variant="body2" children={row.concepto} />
                                    </Grid>

                                    <Grid item md >
                                        <Typography variant="body2" children={row.descripcion} />
                                    </Grid>                       

                                    <Grid item md  >
                                        <Typography align="right" variant="body2" children={"$" + formatNumber(row.importe)} />
                                    </Grid>

                                </Grid>


                            </Grid>
                        ))}
                    </Grid>

                </CardContent>

            </Card>
        </div>
    );
}
