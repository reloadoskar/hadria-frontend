import React from 'react';

import PosFormAdd from './forms/PosFormAdd'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid } from '@material-ui/core';

export default function PosAddDialog({ closeDialog, add, itemToAdd, isOpen, compraIdSelected }) {

    const handleSubmit = (item) => {
        
        add(item)
    }


    return (
        
        <Dialog open={isOpen} onClose={() => closeDialog('addDialog')} aria-labelledby="dialog-add-title">
            {!itemToAdd ? 
                <Typography variant="h5" >Nada que mostrar por aqui.</Typography>
            :
            <React.Fragment>

                <DialogTitle id="dialog-add">
                
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >{itemToAdd.item.producto.descripcion}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="flex-end">
                                <Typography variant="h6" >Disponible: {itemToAdd.item.stock}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogTitle>
                <DialogContent>

                    
                    <PosFormAdd 
                        item={itemToAdd}
                        closeDialog={closeDialog}
                        add={handleSubmit}
                        compraId={itemToAdd.compraIdSelected}
                        />

                    
                </DialogContent>  

            </React.Fragment>             
            }
        </Dialog>
        
    );
}
