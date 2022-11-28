import React from 'react'
import { TableContainer, TableHead, Paper, TableRow, TableCell, Table, TableBody, TableFooter, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import useStyles from '../hooks/useStyles'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'
import ItemEditable from './ItemEditable';
const TableCellConEstiacho = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
export default function TablaProductos({items, editMode, sumar, eliminar}){
    const classes = useStyles()
    return !items ? null :
        <TableContainer component={Paper}>
            <Table>            
                <TableHead>
                    <TableRow>
                        <TableCellConEstiacho>PRODUCTO</TableCellConEstiacho>
                        <TableCellConEstiacho align="right">UNIDAD</TableCellConEstiacho>
                        <TableCellConEstiacho align="right">EMPAQUES</TableCellConEstiacho>
                        <TableCellConEstiacho align="right">PRECIO</TableCellConEstiacho>
                        <TableCellConEstiacho align="right">IMPORTE</TableCellConEstiacho>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item,i)=>(
                        <ItemEditable elItem={item} key={i} editMode={editMode} sumar={sumar} eliminar={eliminar} id={i} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align='right'>TOTALES:</TableCell>
                        <TableCell align='right' ><Typography className={classes.textoMirame}>{formatNumber(sumCantidad(items),1)}</Typography></TableCell>
                        <TableCell align='right' ><Typography className={classes.textoMirame}>{formatNumber(sumEmpaques(items),1)}</Typography></TableCell>
                        <TableCell align='center'>--</TableCell>
                        <TableCell align='right' ><Typography className={classes.textoMirame}>{formatNumber(sumImporte(items),1)}</Typography></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

    
}