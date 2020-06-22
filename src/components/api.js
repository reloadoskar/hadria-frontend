import axios from 'axios';
import Global from '../Global';

const url = Global.url;
const url_client = url

// USUARIOS

export const register = (newClient) => {
    return axios
        .post(url + 'client/register', newClient)
        .then( res => {
            return res.data
        })
}

export const login = user => {
    return axios
        .post(url + 'user/login' , user)
        .then( res => {
            localStorage.setItem('usertoken', res.data.token)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile  = () => {
    return axios
        .get(url + 'profile')
        .then( res => {
            return res.data
        })
}


// API PRODUCTOS

export const getProducts = () => {
    return axios
        .get(url_client + 'productos')
        .then(res => {
            return res.data
        })
}

export const saveProduct = (producto) => {
    return axios
        .post(url_client + 'producto/save', producto)
        .then(res => {
            return res.data
        })
}

export const deleteProduct = (id) => {
    return axios
        .delete(url_client + `producto/${id}`)
        .then(res => {
            return res.data
        })
}

// API CLIENTES

export const getClientes = () => {
    return axios
        .get(url_client + 'clientes')
        .then(res => {
            return res.data
        })
}
export const saveCliente = (cliente) => {
    return axios
        .post(url_client + 'cliente/save', cliente)
        .then(res => {
            return res.data
        })
}

export const deleteCliente = (id) => {
    return axios
        .delete(url_client + `cliente/${id}`)
        .then(res => {
            return res.data
        })
}
// API PROVEEDORES

export const getProvedors = () => {
    return axios
        .get(url_client + 'provedors')
        .then(res => {
            return res.data
        })
}
export const saveProvedor = (provedor) => {
    return axios
        .post(url_client + 'provedor/save', provedor)
        .then(res => {
            return res.data
        })
}

export const deleteProvedor = (id) => {
    return axios
        .delete(url_client + `provedor/${id}`)
        .then(res => {
            return res.data
        })
}

// API UBICACIONES

export const getUbicacions = () => {
    return axios
        .get(url_client + 'ubicacions')
        .then(res => {
            return res.data
        })
}
export const saveUbicacion = (ubicacion) => {
    return axios
        .post(url_client + 'ubicacion/save', ubicacion)
        .then(res => {
            return res.data
        })
}

export const deleteUbicacion = (id) => {
    return axios
        .delete(url_client + `ubicacion/${id}`)
        .then(res => {
            return res.data
        })
}

// API COMPRAS

export const getComprasDash = () => {
    return axios
        .get(url_client + 'compras/dash')
        .then( res => {
            return res.data
        })
}

export const getCompras = () => {
    return axios
        .get(url_client + 'compras')
        .then(res => {
            return res.data
        })
}
export const getCompra = (id) => {
    return axios
        .get(url_client + `compra/${id}`)
        .then( res => {
            return res.data
        })
}
export const saveCompra = (compra) => {
    return axios
        .post(url_client + 'compra/save', compra)
        .then(res => {
            return res.data
        })
}

export const deleteCompra = (id) => {
    return axios
        .delete(url_client + `compra/${id}`)
        .then(res => {
            return res.data
        })
}

export const closeCompra = (id) => {
    return axios
        .put(url_client + `compra/${id}`)
        .then( res => {
            return res.data
        })
}

export const cancelCompra = (id) => {
    return axios
        .put(url + 'compra/cancel/'+ id)
        .then( res => {
            return res.data
        })
}

export const updateCompra = (compra) => {
    return axios
        .put(url + 'update/compra/' + compra._id, compra)
        .then( res => {
            return res.data
        })
}

export const addCompraItem = (item) => {
    return axios
        .post(url + 'compra/additem/', item)
        .then( res => {
            return res.data
        })
}

export const updateCompraItem = (item) => {
    return axios
        .put(url + 'compra/item/' +item.item_id, item)
        .then( res => {
            return res.data
        })
}

// API TIPO_COMPRAS

export const getTipoCompras = () => {
    return axios
        .get(url_client + 'tipocompras')
        .then(res => {
            return res.data
        })
}

// INVENTARIO

export const getInventario = () => {
    return axios
        .get(url_client + 'inventario')
        .then(res => {
            return res.data
        })
}

export const getInventarioBy = (ubicacion) => {
    return axios
        .get(url_client + `inventario/${ubicacion}`)
        .then(res => {
            return res.data
        })
}

// VENTAS
export const getVenta = (id) => {
    return axios
        .post(url_client + 'venta', id)
        .then( res => {
            return res.data
        })
}
export const getVentas = () => {
    return axios
        .get(url_client + 'ventas')
        .then( res => {
            return res.data
        })
}
export const getVentasxSem = (f1,f2) => {
    return axios
        .get(url_client + 'ventas/semana')
        .then( res => {
            return res.data
        })
}
export const saveVenta = (venta) => {
    return axios
        .post(url_client + 'venta/save', venta)
        .then(res => {
            return res.data
        })
}
export const cancelVenta = (id) => {
    return axios
        .delete(url_client + `venta/${id}`)
        .then( res => {
            return res.data
        })
}

// CUENTAS POR PAGAR

export const getCuentasPorPagar = () => {
    return axios.get(url_client + 'cuentasporpagar')
        .then(res => {
            return res.data
        })
}

export const savePagoACuentaPorPagar = (pago) =>{
    return axios
        .post(url_client + 'cuentasporpagar/pago/save', pago)
        .then(res => {
            return res.data
        })
}

// CUENTAS POR COBRAR

export const createCuentaPorCobrar = (cuenta) => {
    return axios
        .post( url_client + 'cuentasporcobrar/save', cuenta)
        .then( res => {
            return res.data
        })
}

export const getCuentasPorCobrar = () => {
    return axios
    .get(url_client + 'cuentasporcobrar')
    .then( res => {
        return res.data
    })
}

export const savePagoACuentaPorCobrar = (pago) =>{
    return axios
        .post(url_client + 'cuentasporcobrar/pago/save', pago)
        .then(res => {
            return res.data
        })
}
// API INGRESOS

export const saveIngreso = (ingreso) => {
    return axios
        .post(url_client + 'ingreso/save', ingreso)
        .then( res => {
            return res.data
        })
}

// RETIRO

export const saveRetiro = (retiro) => {
    return axios
        .post(url + 'retiro/save', retiro)
        .then( res => {
            return res.data
        })
}

// API EGRESOS

export const saveEgreso = (egreso) => {
    return axios
        .post(url_client + 'egreso/save', egreso)
        .then(res => {
            return res.data
        })
}

// API CORTES

export const getDataFrom = (ubicacion, fecha) => {
    return axios
        .get(url_client + `corte/${ubicacion}/${fecha}`)
        .then( res => {
            return res.data
        })
}

export const saveCorte = (corte) => {
    return axios
        .post(url_client + 'corte/save', corte)
        .then( res => {
            return res.data
        })
}

export const existCorte = (ubicacion, fecha) => {
    return axios
        .get(url_client + `corte/exist/${ubicacion}/${fecha}`)
        .then( res => {
            return res.data
        })
}

export const getBalance = () => {
    return axios
    .get(url_client + 'balance')
    .then( res => {
        return res.data.balance
    })
}

// UNIDADES

export const getUnidades = () => {
    return axios
        .get(url_client + 'unidads')
        .then( res => {
            return res.data
        })
}

export const addUnidad = (unidad) => {
    return axios
        .post( url_client + 'unidad/save', unidad)
        .then( res => {
            return res.data
        })
}

export const delUnidad = (id) => {
    return axios
        .delete(url_client + `unidad/${id}`)
        .then(res => {
            return res.data
        })
}

// EMPAQUES

export const getEmpaques = () => {
    return axios
        .get( url_client + 'empaques')
        .then( res => {
            return res.data
        })
}

export const addEmpaque = (empaque) => {
    return axios
        .post( url_client + 'empaque/save', empaque)
        .then( res => {
            return res.data
        })
}

export const delEmpaque = (id) => {
    return axios
        .delete(url_client + `empaque/${id}`)
        .then(res => {
            return res.data
        })
}

// CONCEPTOS

export const getConceptos = () => {
    return axios
        .get( url_client + 'conceptos')
        .then( res => {
            return res.data
        })
}

export const addConcepto = (concepto) => {
    return axios
        .post( url_client + 'concepto/save', concepto)
        .then( res => {
            return res.data
        })
}

export const delConcepto = (id) => {
    return axios
        .delete(url_client + `concepto/${id}`)
        .then(res => {
            return res.data
        })
}

// TICKET

export const ticketCompra = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/', data)
        .then(res =>{
            return res
        })
        .catch( error => {
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

export const ticketNuevoItem = (data) => {
    return axios
    .post('http://localhost:8080/ticket-hadria/nuevoItem.php', data)
    .then(res =>{
        return res
    })
    .catch( error => {
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
        .then(res =>{
            return res
        })
        .catch( error => {
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
        .then(res =>{
            return res
        })
        .catch( error => {
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
        .then(res =>{
            return res
        })
        .catch( error => {
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
        .then(res =>{
            return res
        })
        .catch( error => {
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
        .then(res =>{
            return res
        })
        .catch( error => {
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
        .then( res => {
            return res
        })
        .catch( error => {
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
        .then( res => {
            return res
        })
        .catch( error => {
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
        .then( res => {
            return res
        })
        .catch( error => {
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
    return axios
        .get( url_client + 'produccions')
        .then( res => {
            return res.data
        })
}

export const getProduccion = (id) => {
    return axios
        .get( url + 'produccion/'+ id)
        .then( res => {
            return res.data
        })
}

export const createProduccion = () => {
    return axios
        .get( url_client + 'produccion/save')
        .then( res => {
            return res.data
        })
}

export const delProduccion = (id) => {
    return axios
        .delete(url_client + `produccion/${id}`)
        .then(res => {
            return res.data
        })
}

export const closeProduccion = (id) => {
    
}
