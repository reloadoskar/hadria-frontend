import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider, IconButton, Grid, Typography } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import DeleteIcon from '@material-ui/icons/Delete';
// import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumImporte, sumCantidad, sumEmpaques, formatNumber} from '../Tools'

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
        {
            items.length > 0 ?

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
                                <Grid container  alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography>{item.producto.descripcion}</Typography>
                                        <Typography>
                                            {item.empaques}-{item.cantidad} x {item.precio}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" children={ "$" +
                                            formatNumber(item.importe,2)
                                        }/>
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
                            <Grid item xs={6}>
                                <Typography children={ sumEmpaques(items) +"-"+sumCantidad(items) } />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">
                                    {"$ " + formatNumber(sumImporte(items),2) }
                                </Typography>                                    
                            </Grid>
                            
                        </Grid>
                        <ListItemSecondaryAction>
                            <IconButton disabled edge="end">
                                <LocalOfferIcon fontSize="small" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />                    
                </List>
                :
                null
            }
        </div>
    )
}