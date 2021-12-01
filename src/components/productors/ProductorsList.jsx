import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ProductorBasic from './ProductorBasic';
export default function ProductorsList({productors}){
    return productors.map((productor, i)=>(
        <Grid item container xs={12} spacing={2} key={i}>
            <ProductorBasic productor={productor}/>
        </Grid>
    ))
    
}