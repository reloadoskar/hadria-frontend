import axios from 'axios';
import Global from '../Global';

import jwt_decode from 'jwt-decode'

const token = localStorage.usertoken
const decoded = jwt_decode(token)

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
    try{
        if (decoded){
            return axios
                .get(url_client + decoded.database + '/productos')
                .then(res => {
                    return res.data
                })
        }

    }catch(err){
        console.log(err)
    }
}

export const saveProduct = (producto) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/producto/save', producto)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const deleteProduct = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/producto/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

// API CLIENTES

export const getClientes = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/clientes')
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}
export const saveCliente = (cliente) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/cliente/save', cliente)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const deleteCliente = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database +  `/cliente/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}
// API PROVEEDORES

export const getProvedors = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/provedors')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const saveProvedor = (provedor) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/provedor/save', provedor)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const deleteProvedor = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/provedor/${id}`)
                .then(res => {
                    return res.data
                })

        }
    }catch (err){
        console.log(err)
    }
}

// API UBICACIONES

export const getUbicacions = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/ubicacions')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const saveUbicacion = (ubicacion) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/ubicacion/save', ubicacion)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const deleteUbicacion = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/ubicacion/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// API COMPRAS

export const getComprasDash = () => {

    try{
        if (decoded){
            return axios
                .get(url_client + decoded.database +'/compras/dash')
                .then( res => {
                    return res.data
                })
        }
    }catch (err) {
        console.log(err+ ' Desconectado?')
    }

    
}

export const getCompras = () => {

    try{
        if (decoded){
            return axios
                .get(url_client + decoded.database + '/compras')
                .then(res => {
                    return res.data
                })
        }

    }catch (err) {
        console.log(err)
    }
}
export const getCompra = (id) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database +  `/compra/${id}`)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const saveCompra = (compra) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/compra/save', compra)
                .then(res => {
                    return res.data
                })

        }
    }catch (err){
        console.log(err)
    }
}

export const deleteCompra = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/compra/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const closeCompra = (id) => {
    try{
        if(decoded){
            return axios
                .put(url_client + decoded.database + `/compra/${id}`)
                .then( res => {
                    return res.data
                })

        }
    }catch (err){
        console.log(err)
    }
}

export const cancelCompra = (id) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/compra/cancel/'+ id)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const updateCompra = (compra) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/update/compra/' + compra._id, compra)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addCompraItem = (item) => {
    try{
        if(decoded){
            return axios
                .post(url + decoded.database + '/compra/additem/', item)
                .then( res => {
                    return res.data
                })

        }
    }catch (err){
        console.log(err)
    }
}

export const updateCompraItem = (item) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/compra/item/' +item.item_id, item)
                .then( res => {
                    return res.data
                })

        }
    }catch (err){
        console.log(err)
    }
}

// API TIPO_COMPRAS

export const getTipoCompras = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/tipocompras')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
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
export const getVentasSemana =(f1, f2) => {
    return axios
        .get(url_client + 'ventas/semana', {params: {f1: f1, f2: f2} })
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
    try{
        if(decoded){
            return axios.get(url_client + decoded.database +'/cuentasporpagar')
                .then(res => {
                    return res.data
                })
        }

    }catch(err){
        console.log(err)
    }
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
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/cuentasporcobrar')
                .then( res => {
                    return res.data
                })

        }
    } catch (err) {
        console.log(err)
    }
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
    try{
        if (decoded){
            return axios
                .get(url_client + 'balance/' + decoded.database)
                .then( res => {
                    return res.data.balance
                })
        }
    }catch (err) {
        console.log(err+ ' Desconectado?')
    }
}

// UNIDADES

export const getUnidades = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/unidads')
                .then( res => {
                    return res.data
                })
        }
    } catch(err){
        console.log(err)
    }
}

export const addUnidad = (unidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/unidad/save', unidad)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const delUnidad = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/unidad/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

// EMPAQUES

export const getEmpaques = () => {
    try{
        if(decoded){
            return axios
                .get( url_client + decoded.database + '/empaques')
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addEmpaque = (empaque) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/empaque/save', empaque)
                .then( res => {
                    return res.data
                })

        }
    }catch(err){
        console.log(err)
    }
}

export const delEmpaque = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/empaque/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

// CONCEPTOS

export const getConceptos = () => {
    try{
        if(decoded){
            return axios
                .get( url_client + decoded.database + '/conceptos')
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addConcepto = (concepto) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/concepto/save', concepto)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const delConcepto = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/concepto/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
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

    try{
        if (decoded){
            return axios
                .get( url_client + decoded.database + '/produccions')
                .then( res => {
                    return res.data
                })
        }

    }catch(err){
        console.log(err)
    }
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
