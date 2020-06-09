import React from 'react'
import { Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider, IconButton, Grid, Typography } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import DeleteIcon from '@material-ui/icons/Delete';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumImporte, sumCantidad, sumEmpaques} from '../Tools'

export default function PosListaDeVenta({items, openDialog, removeItem, total}) {

    // BUG: AGRUPAR EL ARRAY DE itemsToSave o averiguar por que carajas no se guardan items repetidos en el fkn controlador
    // var groupBy = function(arr, key) {
    //     return arr.reduce(function(rv, x) {
    //       (rv[x[key]] = rv[x[key]] || []).push(x);
    //       return rv;
    //     }, {});
    //   };

    const addStock = (i) => {
        let item = i.selected
        item.item.stock += parseFloat(i.cantidad)
        item.item.empaquesStock += parseFloat(i.empaques)
        // setValues({...values, item: item})
    }

    const deleteMe = (index, item) => {
        addStock(item)
        removeItem(index, item)
    }
    return (
        <div>
        <List>

            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ShoppingCartIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Items"
                />
                <ListItemSecondaryAction>
                <ListItemText
                    primary={items.length}
                />
                </ListItemSecondaryAction>
            </ListItem>

            <Divider />

            { items.map( (item, index) => (
                    <ListItem key={index}>
                        <Grid container >
                            <Grid item xs={1}>
                                <ListItemText
                                    primary={item.empaques}
                                    secondary="emp"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ListItemText 
                                    primary={item.producto.descripcion}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemText 
                                    primary={item.cantidad}
                                    secondary="uni"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText 
                                    primary={"$ "+item.precio}
                                    secondary="x"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText 
                                    primaryTypographyProps={{align: "right"}}
                                    primary={"$ "+ item.importe}    
                                    secondary="="
                                />
                            </Grid>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={()=>deleteMe(index, item)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </Grid>
                    </ListItem>                      
                ))
            }

            <Divider />
            
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <ListItemText primary={sumEmpaques(items)} />
                    </Grid>
                    <Grid item xs={6}>
                        
                    </Grid>
                    <Grid item xs={1}>
                        <ListItemText primary={sumCantidad(items)} />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify="flex-end">
                            <Typography>
                                Total: 
                            </Typography> 
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>

                            <ListItemText 
                                primaryTypographyProps={{align: "right"}}
                                primary={"$ " + sumImporte(items) }
                                >
                                {/* $ {total} */}
                            </ListItemText>

                    </Grid>
                </Grid>
                <ListItemSecondaryAction>
                    <IconButton disabled edge="end">
                        <LocalOfferIcon fontSize="small" />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Divider />
            
            <ListItem>
                
                
            </ListItem>

        </List>
                    <Grid container alignItems="flex-end">
                        <Grid item xs>
                            <Button
                                disabled={items.length === 0 ? true : false }
                                variant="contained"
                                color="primary"
                                endIcon={<ReceiptIcon />}
                                onClick={() => openDialog('cobrarDialog')}
                            >
                                Cobrar (x)
                            </Button>
                        </Grid>
                    </Grid>

        </div>
    )
}