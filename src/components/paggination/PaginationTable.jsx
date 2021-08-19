import React, { useState, useEffect } from 'react'
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableHead } from '@material-ui/core'
import TablePaginationActions from './TablePaginationActions'
import { formatNumber, sumCantidad, sumEmpaques, sumImporte } from '../Tools'

export default function PaginationTable({data}){
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(()=>{
        if(data){
          setRows(data.sort((a, b) => (a.ventaFolio < b.ventaFolio ? -1 : 1)))
        }
        return () => setRows()
    },[data])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Folio</TableCell>
                  <TableCell>Ubicaci&oacute;n</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Empaques</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Importe</TableCell>
                </TableRow>
              </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                #{row.ventaFolio}
              </TableCell>
              <TableCell>
                {row.ubicacion.nombre}
              </TableCell>
              <TableCell >
                {row.fecha}
              </TableCell>
              <TableCell >
                {row.producto.descripcion}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                {row.cantidad}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                {row.empaques}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                {row.precio}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                {formatNumber(row.importe)}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, { label: 'Todo', value: -1 }]}
              colSpan={8}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'Cantidad de filas' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          <TableRow>
              <TableCell colSpan={4} align="right">Totales</TableCell>
              <TableCell align="right">{formatNumber(sumCantidad(rows.filter(vta=>vta.venta.tipoPago==="CONTADO")),2)}</TableCell>
              <TableCell align="right">{formatNumber(sumEmpaques(rows.filter(vta=>vta.venta.tipoPago==="CONTADO")),2)}</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">${formatNumber(sumImporte(rows.filter(vta=>vta.venta.tipoPago==="CONTADO")),2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}