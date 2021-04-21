import React from 'react'
import { Card, CardContent,
    Grid,
    Typography, 
    MenuItem,
    CardHeader
} from '@material-ui/core'
import {formatNumber} from '../Tools'

export default function Disponible(props){
    const {disp, verCorte} = props
    const handleClick = (ub) => {
        verCorte(ub)
    }
    return(
        <Card>
            <CardHeader title="Disponible" />
            <CardContent>
                {disp.map((ub,i)=>(
                    <MenuItem key={i} onClick={()=> handleClick(ub)}>
                        <Grid container key={i}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">{ub.ubicacion}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" align="right">{formatNumber(ub.disponible)}</Typography>
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
            </CardContent>
        </Card>
    )
}