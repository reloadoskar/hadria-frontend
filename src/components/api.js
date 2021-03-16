import axios from 'axios';
import Global from '../Global';
import jwt_decode from 'jwt-decode'
var decoded = false
if(localStorage.usertoken){
    const token = localStorage.usertoken
    decoded = jwt_decode(token)
}

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
    try{
        return axios
            .post(url + 'user/login' , user)
            .then( res => {
                localStorage.setItem('usertoken', res.data.token)
                return res.data
            })
            .catch(err => {
                err.message = "Error de red, no hay conexión con la base de datos";
                err.status = 'error'
                // console.log(err)
                return err
            })

    }catch (err) {
        console.log(err)
        return {
            message: "Error de conexión.",
            status: "error"
        }
    }
}

export const logout = () => {
    return axios
        .get(url + 'logout')
        .then(res => {
            return res.data
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

export const getUbicacion = (id) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/ubicacion/' + id)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
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

export const getUbicacionsSaldo = () =>{
    try {
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/ubicacions/saldo')
                .then(res => {
                    return res.data
                })
        }

    }catch(err){
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

export const createTipoCompra = (tipoCompra) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/tipocompra/create', tipoCompra)
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
    try{
        if (decoded) {
            return axios
                .get(url_client + decoded.database + '/inventario')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getInventarioBy = (ubicacion) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database +  `/inventario/${ubicacion}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getInventarioUbicacion = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database +  `/inventarioxubicacion/`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const moveInventario = (move) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database +  `/inventario/movimiento`, move)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// VENTAS
export const getVenta = (folio) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/venta/'+ folio)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getVentas = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/ventas')
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getVentasSemana =(f1, f2) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/ventas/semana', {params: {f1: f1, f2: f2} })
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const saveVenta = (venta) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/venta/save', venta)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const cancelVenta = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/venta/${id}`)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
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
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/cuentasporpagar/pago/save', pago)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// CUENTAS POR COBRAR

export const createCuentaPorCobrar = (cuenta) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database +  '/cuentasporcobrar/save', cuenta)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getCxcCliente = (id) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + `/cuentasporcobrar/cliente/${id}`)
                .then( res => {
                    return res.data
                })

        }
    }catch(err){
        console.log(err)
    }
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
export const getCxcPdv = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + '/cuentasporcobrar/pdv')
                .then( res => {
                    return res.data
                })

        }
    } catch (err) {
        console.log(err)
    }
}

export const savePagoACuentaPorCobrar = (pago) =>{
    try{
        if (decoded){
            return axios
                .post(url_client + decoded.database +  '/cuentasporcobrar/pago/save', pago)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
// API INGRESOS

export const saveIngreso = (ingreso) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database+  '/ingreso/save', ingreso)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getIngresos = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database+  '/ingresos')
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// RETIRO

export const saveRetiro = (retiro) => {
    try{
        if(decoded){
            return axios
                .post(url + decoded.database + '/retiro/save', retiro)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// API EGRESOS

export const saveEgreso = (egreso) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/egreso/save', egreso)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const getEgresos = () => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database+  '/egresos')
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// API CORTES

export const getDataFrom = (ubicacion, fecha) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + `/corte/${ubicacion}/${fecha}`)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const saveCorte = (corte) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database +  '/corte/save', corte)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const existCorte = (ubicacion, fecha) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + `/corte/exist/${ubicacion}/${fecha}`)
                .then( res => {
                    return res.data
                })
        
        }
    }catch (err){
        console.log(err)
    }
}

export const openCorte = (ubicacion, fecha) => {
    try{
        if(decoded){
            return axios
                .get(url_client + decoded.database + `/corte/open/${ubicacion}/${fecha}`)
                .then( res => {
                    return res.data
                })
        
        }
    }catch (err){
        console.log(err)
    }
}

export const getBalance = () => {
    try{
        if (decoded){
            return axios
                .get(url_client + decoded.database + '/balance/')
                .then( res => {
                    return res.data.balance
                })
        }
    }catch (err) {
        console.log(err+ ' Desconectado?')
    }
}
export const getDisponiblexUbicacion = () => {
    try{
        if (decoded){
            return axios
                .get(url_client + decoded.database + '/balance/disponiblexubicacion/')
                .then( res => {
                    return res.data.disp
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
    try{
        if(decoded){
            return axios
                .get( url + decoded.database + '/produccion/'+ id)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const createProduccion = () => {
    try{
        if(decoded){
            return axios
                .get( url_client + decoded.database + '/produccion/save')
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const delProduccion = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url_client + decoded.database + `/produccion/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const closeProduccion = (id) => {
    
}

export const getProduccionItems = (id) => {
    try{
        if(decoded){
            return axios
                .get( url + decoded.database + '/produccionitems/'+ id)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const delProduccionItem = (item) => {
    try{
        if(decoded){
            return axios
                .post(url_client + decoded.database + '/produccionitem/delete', item)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const subtractProduccionItemStock = (id, cantidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/produccionitem/subtract', {id, cantidad} )
                .then ( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addProduccionItemStock = () => {

}

export const addProduccionItem = (item) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/produccionitem/save', item)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

// INSUMOS

export const getCompraItems = () => {
    try{
        if(decoded){
            return axios
                .get( url + decoded.database + '/items')
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getInsumos = (produccion_id) => {
    try{
        if(decoded){
            return axios
                .get( url + decoded.database + '/insumos/'+ produccion_id)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const addInsumo = (insumo) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/insumo/save', insumo)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const delInsumo = (insumo) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/insumo/delete', insumo)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const subtractInsumoStock = (id, cantidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/insumo/subtract', {id, cantidad} )
                .then ( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}
export const addInsumoStock = (id, cantidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/insumo/add', {id, cantidad} )
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const subtractStock = (id, cantidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/items/subtract', {id, cantidad})
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addStock = (id, cantidad) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/items/add', {id, cantidad})
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const restartApp = () => {
    try{
        if(decoded){
            return axios
                .get( url_client + decoded.database + '/restartApp')
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

// EMPLEADOS

export const getEmpleados = () => {
    try{
        if(decoded){
            return axios
                .get( url_client + decoded.database + '/empleados')
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const addEmpleado = (empleado) => {
    try{
        if(decoded){
            return axios
                .post( url_client + decoded.database + '/empleados/add', empleado)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}
export const delEmpleado = (idEmpleado) => {
    try{
        if(decoded){
            return axios
                .delete( url_client + decoded.database + `/empleado/${idEmpleado}`)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}