import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import { Grid, Button } from '@material-ui/core';

import PossAddFormItem from './PosAddFormItem';

const calclulaImporte = (cant, prec) => {
    return cant * prec
}

export default function PosFormAdd({ item, closeDialog, add, compraId }) {
    const { enqueueSnackbar } = useSnackbar()
    const [values, setVaules] = useState({
        compraId: compraId,
        itemId: item.item._id,
        item: item,
        cantidad: '',
        empaques: '',
        precio: item.item.producto.precio1,
        importe: '',
    })
    const calculaEmpaques = (emp, stock, cant) => {
        let unit = 0
        let calc = 0

        unit = stock / emp 

        calc = cant / unit
        console.log(calc)
        return calc
    }
    const handleChange = (type, value) =>{
        const stock = item.item.stock
        let imp = 0
        let emp = 0
        switch(type){
            case 'cantidad':
                if(value <= 0){
                    return setVaules({...values, [type]: ''})
                }

                if(value > stock){
                    var message = "Solo hay " +stock + " disponibles."
                    enqueueSnackbar(message, {variant: 'warning'} )
                    return setVaules({...values, [type]: '', empaques: '', importe: ''})
                }

                imp = calclulaImporte(value, values.precio)
                emp = calculaEmpaques(item.empaques, stock, value)
                return setVaules({ ...values, [type]: value, empaques: emp, importe: imp})
            
            case 'precio':
                imp = calclulaImporte(values.cantidad, value)
                return setVaules({ ...values, [type]: value, importe: imp })

            default:
                return setVaules({...values, [type]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        add(values)
        closeDialog('addDialog')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <PossAddFormItem 
                        label="cantidad"
                        isAutoFocused={true}
                        value={values.cantidad}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <PossAddFormItem 
                        label="empaques"
                        value={values.empaques}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <PossAddFormItem 
                        label="precio"
                        value={values.precio}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <PossAddFormItem 
                        label="importe"
                        value={values.importe}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                        <Grid container  justify="flex-end">
                            <Button onClick={() => closeDialog('addDialog')} type="button" color="secondary" size="large" >Cancelar</Button>
                            <Button type="submit" variant="contained" color="primary" size="large" >Agregar</Button>
                        </Grid>
                </Grid>

            </Grid>
        
        </form>
    )
}