import React, { useState, useEffect } from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Card, CardHeader, CardContent } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

const init = {
    tcantidad: 0,
    tempaques: 0,
    tcosto: 0,
    tcostoProm: 0,
    tcantVendido: 0,
    tempVendido: 0,
    tprecioProm: 0,
    tventa: 0,
    tcantDsip: 0,
    tempDsip: 0,
}
export default function ResumenProductos ({ tipoCompra, data, calcVentasItem, formatNumber, sumCantidad, sumEmpaques, sumStock, sumEmpStock }) {
    const [totales, setTotales] = useState(init)
    const classes = useStyles()
    useEffect(() => {
        if(data){
            let cantidad = sumCantidad(data.compra.items)
            let empaques = sumEmpaques(data.compra.items)
            let costo = data.compra.importe
            let costoProm = costo / cantidad
            let cantVendido = sumCantidad(data.ventas)
            let cantEmpVendido = sumEmpaques(data.ventas)
            let venta = data.totalVenta
            let precioProm = venta/cantVendido
            let cantDisp = sumStock(data.compra.items)
            let empDisp = sumEmpStock(data.compra.items)
            setTotales({
                tcantidad: cantidad,
                tempaques: empaques,
                tcosto: data.compra.importe,
                tcostoProm: costoProm,
                tcantVendido: cantVendido,
                tempVendido: cantEmpVendido,
                tprecioProm: precioProm,
                tventa: venta,
                tcantDsip: cantDisp,
                tempDsip: empDisp,
            })
        }
        return () => setTotales(init)
    }, [data, sumCantidad, sumEmpStock, sumEmpaques, sumStock])
    return (
        <Card>
            <CardHeader title="Resúmen General" ></CardHeader>
            <CardContent>
            { tipoCompra === 'CONSIGNACION'
                ?                    
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Recibido</TableCell>
                                <TableCell align="right">Vendido</TableCell>
                                <TableCell align="right">Precio Prom</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Disponible</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.compra.items.map((item, index) => {
                                let totalVentas = calcVentasItem(data.ventas, item._id)
                                let cantVendido = item.cantidad - item.stock
                                let empVendido = item.empaques - item.empaquesStock
                                let precioProm = totalVentas / cantVendido 
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography className={classes.sobreTexto} children={item.ubicacion.nombre} />
                                            <Typography children={item.producto.descripcion} />
                                        </TableCell>
                                        <TableCell
                                            children={
                                            item.producto.unidad.unidad === item.producto.empaque.empaque ?
                                                <Typography align="right" children={item.cantidad + " " + item.producto.unidad.abr} />
                                                :
                                                <Typography align="right" children={item.empaques + " " + item.producto.empaque.abr + " / " + item.cantidad + " " + item.producto.unidad.unidad} />
                                            }
                                        />
                                        <TableCell
                                            children={ 
                                                item.producto.unidad.unidad === item.producto.empaque.empaque ?
                                                    <Typography align="right" children={ cantVendido + " " + item.producto.unidad.abr } />
                                                    :
                                                    <Typography align="right" children={ cantVendido + " " + item.producto.unidad.abr + " / " + empVendido + " " + item.producto.empaque.abr } />
                                                }
                                        />
                                        <TableCell>
                                            <Typography align="right" children={"$" + formatNumber(precioProm,2)} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography align="right" children={"$" + formatNumber(totalVentas,2)} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography 
                                                align="right" 
                                                children={
                                                    item.producto.unidad.unidad === item.producto.empaque.abr ?
                                                            item.stock + " " + item.producto.unidad.abr
                                                        :
                                                            item.empaquesStock + " " + item.producto.empaque.abr + " / " + item.stock + " " + item.producto.unidad.abr
                                                    }
                                                />
                                        </TableCell>
                                    </TableRow>                                    
                                )
                            })}
                            <TableRow selected>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">{formatNumber(totales.tcantidad)}</TableCell>
                                <TableCell align="right">{formatNumber(totales.tcantVendido)}</TableCell>
                                <TableCell align="right">{formatNumber(totales.tprecioProm, 2)}</TableCell>
                                <TableCell align="right">{formatNumber(totales.tventa)}</TableCell>
                                <TableCell align="right">{formatNumber(totales.tcantDsip)}</TableCell>
                            </TableRow>
                        </TableBody>    
                    </Table>
                :
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Comprado</TableCell>
                            <TableCell align="right">Costo unit</TableCell>
                            <TableCell align="right">Costo Producto</TableCell>
                            <TableCell align="right">Vendido</TableCell>
                            <TableCell align="right">Precio Prom</TableCell>
                            <TableCell align="right">Total Venta</TableCell>
                            <TableCell align="right">Disponible</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.compra.items.map((item, index) => {
                            let totalVentas = calcVentasItem(data.ventas, item._id)
                            let cantVendido = item.cantidad - item.stock
                            let precioProm = totalVentas / cantVendido 
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography className={classes.sobreTexto} children={item.ubicacion.nombre} />
                                        <Typography children={item.producto.descripcion} />
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        children={
                                            item.producto.unidad.unidad === item.producto.empaque.empaque ?
                                                <Typography align="right" children={item.cantidad + " " + item.producto.unidad.abr} />
                                                :
                                                <Typography align="right" children={item.empaques + " " + item.producto.empaque.abr + " / " + item.cantidad + " " + item.producto.unidad.abr} />
                                        } 
                                    />
                                    <TableCell>
                                       <Typography align="right" children={"$" + formatNumber(item.costo)} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography align="right" color="secondary" children={"$" + formatNumber(item.importe)} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography align="right" children={formatNumber(cantVendido) + " " + item.producto.unidad.abr} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography align="right" children={"$" + formatNumber(precioProm,2)} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography align="right" children={"$" + formatNumber(totalVentas)} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" align="right" 
                                            children={
                                                item.producto.unidad.unidad === item.producto.empaque.abr ?
                                                    item.stock + " " + item.producto.unidad.unidad
                                                    :
                                                    item.empaquesStock + " " + item.producto.empaque.abr + " / " + item.stock + " " + item.producto.unidad.abr
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )                                                
                        })}
                        <TableRow selected>
                            <TableCell align="right">
                                Totales
                            </TableCell>
                            <TableCell align="right">{formatNumber(totales.tcantidad)}</TableCell>
                            <TableCell align="right">${formatNumber(totales.tcostoProm)}</TableCell>
                            <TableCell align="right">${formatNumber(totales.tcosto)}</TableCell>
                            <TableCell align="right">{formatNumber(totales.tcantVendido)}</TableCell>
                            <TableCell align="right">{formatNumber(totales.tprecioProm, 2)}</TableCell>
                            <TableCell align="right">{formatNumber(totales.tventa)}</TableCell>
                            <TableCell align="right">{formatNumber(totales.tcantDsip)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            }
            </CardContent>

        </Card>
    )
}