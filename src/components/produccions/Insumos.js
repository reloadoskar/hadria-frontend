import React, {useState, useEffect} from 'react' 
import { LinearProgress, Card, CardHeader, CardContent, Grid, Typography, IconButton, Divider, List } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {formatNumber, sumImporte} from '../Tools'
export default function Insumos(props) {
    const {eliminar, insumos} = props
    const [sumaInsumos, setSumaInsumos] = useState(0)
    useEffect(() => {
        if(insumos){
            setSumaInsumos(sumImporte(insumos))
        }
    }, [insumos])
    const getPorcentaje = (total, disponible) => {
        var porcentaje = disponible * 100 / total
        return porcentaje
    }
    return (
        <Card>
            {
                insumos === null ?
                    <LinearProgress variant="query"/>
                :
                <React.Fragment>
                    <CardHeader 
                        title="Insumos" 
                        subheader={"Total: $"+ formatNumber(sumaInsumos,2)}
                    />
                    <CardContent>
                        { 
                            insumos.length === 0 ?
                                <Typography children="No hay insumos." />
                            :
                                <Grid container >
                                    <Grid item xs={12}>
                                        {
                                            insumos.map((insumo, index) => {
                                                var porcentaje = getPorcentaje(insumo.cantidad, insumo.disponible)
                                                    if(porcentaje === 0){
                                                        return null
                                                    }else{
                                                        return (
                                                            <List key={index}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={5}>
                                                                        <Typography>
                                                                            {insumo.compraItem.producto.descripcion}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs>
                                                                        <Typography variant="overline" align="center" children={insumo.disponible + "/" + insumo.cantidad} />
                                                                        <LinearProgress variant="determinate" value={porcentaje} color={porcentaje < 50 ? "secondary" : "primary"} />
                                                                        <Typography variant="subtitle2" align="right" children={"%" + porcentaje} />
                                                                    </Grid>
                                                                    {
                                                                        porcentaje < 100 ? 
                                                                            null
                                                                        :
                                                                        <Grid item xs={2}>
                                                                            <Grid container direction="row-reverse" justifyContent="flex-end">
                                                                                <Grid item xs>                                                                                
                                                                                    <IconButton onClick={() => eliminar(insumo)} align="right">
                                                                                        <DeleteIcon color="secondary"/>
                                                                                    </IconButton>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
    
                                                                    }
                                                                </Grid>
                                                                <Divider />
                                                            </List>
                                                        )
                                                    }
                                                        
                                            })
                                        }

                                    </Grid>
                                </Grid>
                        }

                    </CardContent>
                </React.Fragment>
            }
        </Card>
    )
}