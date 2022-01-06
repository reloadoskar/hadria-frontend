import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import {ProductorContext} from './ProductorContext'
import ProductorBasic from './ProductorBasic';
import useStyles from '../hooks/useStyles';
import ProductorCreate from './ProductorCreate';
export default function Productors(){
    const classes = useStyles()
    const [openCreate, setOpenCreate] = useState(false)
    const {productors, loadProductors} = useContext(ProductorContext)
    useEffect(()=>{
        loadProductors()
    },[])
    const crearProductor = () => {
        setOpenCreate(true)
    }
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button className={classes.botonGenerico} onClick={()=>crearProductor()}>
                        + Nuevo Productor
                    </Button>
                    <ProductorCreate open={openCreate} close={()=>setOpenCreate(false)}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        {productors.map((productor, i)=>(
                            <ProductorBasic data={productor} key={i}/>
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}