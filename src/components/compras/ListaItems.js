import React, { useState } from 'react'
import { Grid, IconButton, Chip, Dialog, DialogContent, Typography, Divider, Avatar, DialogActions, Button } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import {formatNumber} from '../Tools'
export default function ListaItems(props) {
    const {items, eliminar} = props
    const [ver, setVer] = useState(false)
    const handleClick = () =>{
        setVer(!ver)
    }
    const onEliminar = (i) => {
        eliminar(i)
        handleClick()
    }
    return(
        <Grid container justifyContent="center">
            <Chip 
                // icon={<ListAltIcon />}
                color="primary"
                avatar={<Avatar>{items.length}</Avatar>}
                clickable
                label=" Ver lista"
                onClick={handleClick}
            />
            <Dialog open={ver} onClose={handleClick} maxWidth="sm" fullWidth>
                <DialogContent>
                    <Grid container spacing={2}>
                        { items.map((item, i) => (
                            <Grid container alignItems="center" justifyContent="flex-end" key={i}>
                                <Grid item xs={10} >
                                    <Typography>{i+1} - {item.producto.descripcion}</Typography>
                                    <Typography align="right">{item.empaques}/{item.cantidad} x {item.costo}</Typography>
                                    <Divider />
                                    <Typography align="right">{formatNumber(item.importe,2)}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <IconButton 
                                        color="secondary"
                                        onClick={() => onEliminar(i)}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick}>Salir</Button>
                </DialogActions>
            </Dialog>
            {/* <Grid item>
                {
                items.length === 0 ?
                    null
                :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Empaques</TableCell>
                                <TableCell align="right">Costo</TableCell>
                                <TableCell align="right">Importe</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.producto.descripcion}</TableCell>
                                        <TableCell align="right">{item.cantidad}</TableCell>
                                        <TableCell align="right">{item.empaques}</TableCell>
                                        <TableCell align="right">{item.costo}</TableCell>
                                        <TableCell align="right">{formatNumber(item.importe,2)}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => eliminar(index)}>
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    ))
                            }
                            <TableRow>
                                <TableCell align="right" >( {items.length} Items)Total</TableCell>
                                <TableCell align="right">{sumCantidad(items)}</TableCell>
                                <TableCell align="right">{sumEmpaques(items)}</TableCell>
                                <TableCell align="right">-</TableCell>
                                <TableCell align="right">{formatNumber(sumImporte(items),2)}</TableCell>
                                
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                }
            </Grid> */}
        </Grid>

    )
}