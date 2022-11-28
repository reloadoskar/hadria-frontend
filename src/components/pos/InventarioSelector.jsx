import React, {useState} from 'react'
import { Grid, Typography } from '@material-ui/core'
import CompraItems from '../compras/CompraItems'
import CrearVentaItem from '../ventas/CrearVentaItem'
import useStyles from '../hooks/useStyles'

export default function InventarioSelector({ inventario = null }) {
    const classes = useStyles()
    const [itemSelected, setItemSelected] = useState(null)
    const [ventaItemDialog, setVentaItemDialog] = useState(false)

    function selectItem(item) {
		setItemSelected(item)
		openVentaItemDialog()
	}

    function openVentaItemDialog() {
		setVentaItemDialog(true)
	}

    function addItem(item) {
		// item.ubicacion = ubicacion
		// item.fecha = fecha
		// let itms = items
		// itms.push(item)
		// setItems(itms)
		// item.itemOrigen.stock -= item.cantidad
		// item.itemOrigen.empaquesStock -= item.empaques
	}

    return !inventario ? null :
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Typography align="center" className={classes.textoMiniFacheron}>
                    Productos disponibles
                </Typography>
                <CompraItems inventario={inventario} selectItem={selectItem} />
                <CrearVentaItem
                    open={ventaItemDialog}
                    close={()=>setVentaItemDialog(false)}
                    elitem={itemSelected}
                    add={addItem}
                />
            </Grid>
        </Grid>
}