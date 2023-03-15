import axios from 'axios';

const url = process.env.REACT_APP_API_TEST

// USUARIOS

export const register = (newClient) => {
    return axios
        .post(url + 'client/register', newClient)
        .then(res => {
            return res.data
        })
}

export const login = user => {
    try {
        return axios
            .post(url + 'user/login', user)
            .then(res => {
                return res
            })
            .catch(err => {
                err.message = "Error de red, no hay conexión con la base de datos";
                err.status = 'error'
                return err
            })

    } catch (err) {
        console.log(err)
        return {
            message: "Error de conexión.",
            status: "error"
        }
    }
}

export const logout = () => {
    return axios
        .post(url + 'logout')
        .then(res => {
            return res.data
        })
}

export const getProfile = () => {
    axios
        .post(url + 'profile')
        .then(res => {
            return res.data
        })
}


// API PRODUCTOS

export const getProducts = (user) => {
    try {
        return axios
            .post(url + 'productos', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getProductosMasVendidos = (user, year, month) => {
    try {
        return axios
            .post(url + '/productos/masvendidos/', {user, year, month})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const saveProduct = (user, data) => {
    try {
        return axios
            .post(url + 'producto/save', {user,data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateProduct = (user, data) => {
    try {
        return axios
            .post(url + 'producto/update/', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteProduct = (user, id) => {
    try {
        return axios
            .post(url + 'producto/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// API CLIENTES

export const getClientes = (user) => {
    try {
        return axios
            .post(url + 'clientes', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getCuentasxCliente = (user) => {
    try {
        return axios
            .post(url + 'cuentas/clientes', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const saveCliente = (user, data) => {
    try {
        return axios
            .post(url + 'cliente/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateCliente = (user, data) => {
    try {
        return axios
            .post(url + 'cliente/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteCliente = (user, id) => {
    try {
        return axios
            .post(url + 'cliente/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
// API PROVEEDORES

export const getProvedors = (user) => {
    try {
        return axios
            .post(url + '/provedors', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getComprasMesProvedor = (user, year, month) => {
    try {
        return axios
            .post(url + 'compras/provedor/', {user, year, month})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const saveProvedor = (user, data) => {
    try {
        return axios
            .post(url + 'provedor/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateProvedor = (user, data) => {
    try {
        return axios
            .post(url + 'provedor/update/', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteProvedor = (user, id) => {
    try {
        return axios
            .post(url + 'provedor/delete', {user, id})
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}

// API UBICACIONES

export const getUbicacion = (user, id) => {
    try {
        return axios
            .post(url + 'ubicacion' , {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const updateUbicacion = (user, data) => {
    try {
        return axios
            .post(url + 'ubicacion/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}


export const getUbicacions = (user) => {
    try {
        return axios
            .post(url + 'ubicacions', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getUbicacionsSaldo = (user) => {
    try {
        return axios
            .post(url + 'ubicacions/saldo', user)
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}
export const saveUbicacion = (user, data) => {
    try {
        return axios
            .post(url + 'ubicacion/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteUbicacion = (user, id) => {
    try {
        return axios
            .post(url + 'ubicacion/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// API COMPRAS

export const getComprasActivas = (user) => {

    try {
        return axios
            .post(url + 'compras/activas', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err + ' Desconectado?')
    }
}

export const getCompras = (user, mes, year) => {

    try {
        return axios
            .post(url + 'compras/', {user, mes, year})
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}
export const getCompra = (user, id) => {
    try {
        return axios
            .post(url + 'compra/', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const saveCompra = (user,data) => {
    try {
        return axios
            .post(url + 'compra/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteCompra = (user, id) => {
    try {
        return axios
            .post(url + 'compra/delete', {user,id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const closeCompra = (user, id) => {
    try {
        return axios
            .post(url + 'compra/close', {user,id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const cancelCompra = (user, id) => {
    try {
        return axios
            .post(url + 'compra/cancel/' , {user,id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateCompra = (user, data) => {
    try {
        return axios
            .post(url + 'update/compra', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const recuperaVentasCompra = (user, id) => {
    try {
        return axios
            .post(url + 'compra/recuperarVentas/', {user,id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const recuperaGastosCompra = (user,id) => {
    try {
        return axios
            .post(url + 'compra/recuperarGastos', {user,id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addCompraItem = (user, data) => {
    try {
        return axios
            .post(url + 'compra/additem', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateCompraItem = (user,data) => {
    try {

        return axios
            .post(url + 'compra/item/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// API TIPO_COMPRAS

export const getTipoCompras = (user) => {
    try {
        return axios
            .post(url + 'tipocompras', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const createTipoCompra = (user, data) => {
    try {

        return axios
            .post(url + '/tipocompra/create', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// INVENTARIO

export const getInventario = (user) => {
    try {
        return axios
            .post(url + 'inventario', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getInventarioBy = (user, ubicacion) => {
    try {

        return axios
            .post(url + 'inventario/ubicacion', {user, ubicacion})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getInventarioxUbicacion = (user) => {
    try {

        return axios
            .post(url + `inventarioxubicacion`,  user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getCambiosUbicacion = (user, ubicacion, fecha) => {
    try {
        return axios
            .post(url + `cambios/ubicacion`,  {user, ubicacion, fecha})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getCambios = (user) => {
    try {
        return axios
            .post(url + `cambios`,  {user})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}


export const createSolicitudCambio = (user, solicitud) => {
    try {
        return axios.post(url + 'cambios/solicitud', {user,solicitud})
            .then(res =>{
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const stockUpCambio = (user, respuesta) => {
    try {
        return axios.post(url + 'cambios/stockup', {user,respuesta})
            .then(res =>{
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const acceptCambio = (user, firma) => {
    try {
        return axios.post(url + 'cambios/aceptar', {user,firma})
            .then(res =>{
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}



export const moveInventario = (user, data) => {
    try {

        return axios
            .post(url + `inventario/movimiento`, {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getMovimientos = (user, month) => {
    try {

        return axios
            .post(url + `inventario/movimientos`, {user, month})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const eliminarMovimiento = (user, data) => {
    try {
        return axios
            .post(url + `/inventario/delete/movimiento/`, { user, data })
            .then(res => {
                return res.data
            })
    } catch (error) {
        console.log(error)
    }
}

// VENTAS
export const getVenta = (user, folio) => {
    try {
        return axios
            .post(url + 'venta',{user, folio})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getVentas = (user) => {
    try {
        return axios
            .post(url + 'ventas', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getVentasSemana = (user, f1, f2) => {
    try {
        return axios
            .post(url + 'ventas/semana', { user, f1, f2 })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const saveVenta = (user, data) => {
    try {
        return axios
            .post(url + 'venta/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
        return {
            status: "error",
            message: err.message
        }
    }
}
export const cancelVenta = (user, id) => {
    try {
        return axios
            .post(url + 'venta/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// CUENTAS POR PAGAR

export const getCuentasPorPagar = (user) => {
    try {

        return axios.post(url + 'cuentasporpagar', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const savePagoACuentaPorPagar = (user, data) => {
    try {

        return axios
            .post(url + 'cuentasporpagar/pago/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// CUENTAS POR COBRAR

export const createCuentaPorCobrar = (user, data) => {
    try {

        return axios
            .post(url + 'cuentasporcobrar/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getCxcCliente = (user, id) => {
    try {

        return axios
            .post(url + 'cuentasporcobrar/cliente', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getCuentasPorCobrar = (user) => {
    try {

        return axios
            .post(url + 'cuentasporcobrar', user)
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}
export const getCxcPdv = (user) => {
    try {
        return axios
            .post(url + 'cuentasporcobrar/pdv', user)
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}

export const savePagoACuentaPorCobrar = (user, data) => {
    try {
        return axios
            .post(url + '/cuentasporcobrar/pago/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
// API INGRESOS

export const saveIngreso = (user, data) => {
    try {

        return axios
            .post(url + 'ingreso/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getIngresos = (user, fecha) => {
    try {

        return axios
            .post(url + 'ingresos/fecha', {user, fecha})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const getIngresosMonthYear = (user, month, year) => {
    try {

        return axios
            .post(url + 'ingresos/mes', {user, month, year})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delIngreso = (user, id) => {
    try {

        return axios
            .post(url + 'ingreso/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateIngreso = (user, data) => {
    try {
        return axios
            .post(url + 'ingreso/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// RETIRO

export const saveRetiro = (user, data) => {
    try {

        return axios
            .post(url + 'retiro/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// API EGRESOS

export const saveEgreso = (user, data) => {
    try {
        return axios
            .post(url + 'egreso/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getEgresos = (user, fecha) => {
    try {

        return axios
            .post(url + 'egresos/fecha', {user, fecha})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getEgresosMonthYear = (user, month, year) => {
    try {

        return axios
            .post(url + 'egresos/mes', {user, month, year})
            .then(res => {
                return res.data
            })
    } catch (error) {
        console.error(error)
    }
}

export const deleteEgreso = (user, id) => {
    try {

        return axios
            .post(url + 'egreso/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateEgreso = (user, data) => {
    try {

        return axios
            .post(url + 'egreso/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// API CORTES

export const getDataFrom = (user, ubicacion, fecha) => {
    try {

        return axios
            .post(url + 'corte', {user, ubicacion, fecha})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const saveCorte = (user, data) => {
    try {
        return axios
            .post(url + 'corte/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const existCorte = (user, ubicacion, fecha) => {
    try {
        return axios
            .post(url + 'corte/exist', {user,ubicacion,fecha})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const openCorte = (user, ubicacion, fecha) => {
    try {
        return axios
            .post(url + 'corte/open', {user, ubicacion, fecha})
            .then(res => {
                return res.data
            })

    } catch (err) {
        console.log(err)
    }
}

export const getBalance = () => {
    try {
        return axios
            .post(url + '/balance/')
            .then(res => {
                return res.data.balance
            })
    } catch (err) {
        console.log(err + ' Desconectado?')
    }
}
export const getDisponiblexUbicacion = (fecha) => {
    try {
        return axios
            .post(url + '/balance/disponiblexubicacion/' + fecha)
            .then(res => {
                return res.data.disp
            })
    } catch (err) {
        return {
            status: 'error',
            message: 'error de algo',
            err
        }
    }
}

// UNIDADES

export const getUnidades = (user) => {
    try {

        return axios
            .post(url + 'unidads', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addUnidad = (user, data) => {
    try {

        return axios
            .post(url + 'unidad/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delUnidad = (user, id) => {
    try {

        return axios
            .post(url + 'unidad/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// EMPAQUES

export const getEmpaques = (user) => {
    try {

        return axios
            .post(url + '/empaques', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addEmpaque = (user, data) => {
    try {

        return axios
            .post(url + 'empaque/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delEmpaque = (user, id) => {
    try {

        return axios
            .post(url + 'empaque/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// CONCEPTOS

export const getConceptos = (user) => {
    try {

        return axios
            .post(url + 'conceptos', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addConcepto = (user, data) => {
    try {

        return axios
            .post(url + 'concepto/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delConcepto = (user, id) => {
    try {

        return axios
            .post(url + 'concepto/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// TICKET

export const ticketCompra = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay impresora!!😱'
                }
            } else {
                return error
            }
        })
}

export const ticketNuevoItem = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/nuevoItem.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketVenta = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/venta.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketSalida = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/salida.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketCobranza = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/cobranza.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketEgreso = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/egreso.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketPago = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/pago.php', data)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketInventario = (inventario) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/inventario.php', inventario)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}
export const ticketVentasCorte = (ventas) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/ventaCorte.php', ventas)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketCancelaVenta = (venta) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/cancelaVenta.php', venta)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

export const ticketTraspaso = (traspaso) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/traspaso.php', traspaso)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {

                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}
export const ticketMovimiento = (movimiento) => {
    return axios
        .post('http://localhost:8002/pesadas', movimiento)
        .then(res => {
            return res
        })
        .catch(error => {
            if (!error.response) {
                return {
                    status: 'warning',
                    message: 'No hay conectividad con la impresora de tickets'
                }
            } else {
                return error
            }
        })
}

// PRODUCCIONES

export const getProduccions = () => {

    try {
        return axios
            .post(url + '/produccions')
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getProduccion = (id) => {
    try {

        return axios
            .post(url + '/produccion/' + id)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const createProduccion = () => {
    try {

        return axios
            .post(url + '/produccion/save')
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delProduccion = (id) => {
    try {

        return axios
            .delete(url + `/produccion/${id}`)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const closeProduccion = (id) => {

}

export const getProduccionItems = (id) => {
    try {

        return axios
            .post(url + '/produccionitems/' + id)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delProduccionItem = (item) => {
    try {

        return axios
            .post(url + '/produccionitem/delete', item)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const subtractProduccionItemStock = (id, cantidad) => {
    try {

        return axios
            .post(url + '/produccionitem/subtract', { id, cantidad })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addProduccionItemStock = () => {

}

export const addProduccionItem = (item) => {
    try {

        return axios
            .post(url + '/produccionitem/save', item)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// INSUMOS

export const getCompraItems = () => {
    try {

        return axios
            .post(url + '/items')
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getInsumos = (produccion_id) => {
    try {

        return axios
            .post(url + '/insumos/' + produccion_id)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addInsumo = (insumo) => {
    try {

        return axios
            .post(url + '/insumo/save', insumo)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const delInsumo = (insumo) => {
    try {

        return axios
            .post(url + '/insumo/delete', insumo)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const subtractInsumoStock = (id, cantidad) => {
    try {

        return axios
            .post(url + '/insumo/subtract', { id, cantidad })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const addInsumoStock = (id, cantidad) => {
    try {

        return axios
            .post(url + '/insumo/add', { id, cantidad })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const subtractStock = (id, cantidad) => {
    try {

        return axios
            .post(url + '/items/subtract', { id, cantidad })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const addStock = (id, cantidad) => {
    try {

        return axios
            .post(url + '/items/add', { id, cantidad })
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const restartApp = () => {
    try {

        return axios
            .post(url + '/restartApp')
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// EMPLEADOS

export const getEmpleados = (user) => {
    try {

        return axios
            .post(url + 'empleados', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const saveEmpleado = (user, data) => {
    try {

        return axios
            .post(url + 'empleados/save', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}
export const delEmpleado = (user, id) => {
    try {

        return axios
            .post(url + 'empleado/delete', {user, id})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateEmpleado = (user, data) => {
    try {
        return axios
            .post(url + 'empleado/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// EMPRESA

export const getEmpresa = (user) => {
    try {

        return axios
            .post(url + 'empresa/', user)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const saveEmpresa = (user, data) => {
    try {

        return axios
            .post(url + 'empresa/save', {user,data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updateEmpresa = (user,data) => {
    try {

        return axios
            .post(url + 'empresa/update', {user, data})
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

// INVERSIONES

export const saveInversion = (inversion) => {
    try {

        return axios
            .post(url + '/inversion/save/', inversion)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const getInversions = (mes, year) => {
    try {

        return axios
            .post(url + `/inversions/${mes}/${year}`)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const deleteInversion = (id) => {
    try {

        return axios
            .delete(url + `/inversion/delete/${id}`)
            .then(res => {
                return res.data
            })
    } catch (err) {
        console.log(err)
    }
}

export const updtInversion = async (inversion) => {
    try {

        const res = await axios
            .post(url + 'inversion/update/', inversion);
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

// LIQUIDACION

export const saveLiquidacion = (liquidacion) => {

    try {
        return axios
            .post(url + '/liquidacion/save/', liquidacion)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return {
                    status: "error",
                    message: err.message
                }
            })
    } catch (err) {
        return {
            status: "error",
            message: err.message
        }
    }

}