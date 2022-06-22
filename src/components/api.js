import axios from 'axios';
import jwt from 'jsonwebtoken'
const URL = process.env.REACT_APP_API_URL
let token = false  
let decoded = false
if(localStorage.usertoken){
    token = localStorage.usertoken
}
if(token !== false){
    try{
        decoded = jwt.verify(token, "muffintop")
    }catch(err){
        console.log(err)
    }
}
const url = URL;

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
                return res
            })
            .catch(err => {
                err.message = "Error de red, no hay conexión con la base de datos";
                err.status = 'error'
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
                .get(url + decoded.database + '/productos')
                .then(res => {
                    return res.data
                })
        }

    }catch(err){
        console.log(err)
    }
}
export const getProductosMasVendidos = (year, month) => {
    try{
        if (decoded){
            return axios
                .get(url + decoded.database + '/productos/masvendidos/'+year+'/'+month)
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
                .post(url + decoded.database + '/producto/save', producto)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const updateProduct = (data) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/producto/update/', data)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const deleteProduct = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url + decoded.database + `/producto/${id}`)
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
                .get(url + decoded.database + '/clientes')
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}
export const getCuentasxCliente = () => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + '/cuentas/clientes')
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
                .post(url + decoded.database + '/cliente/save', cliente)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const updateCliente = (cliente) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/cliente/update', cliente)
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
                .delete(url + decoded.database +  `/cliente/${id}`)
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
                .get(url + decoded.database + '/provedors')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getComprasMesProvedor = (year, month) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + `/compras/provedor/${year}/${month}`)
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
                .post(url + decoded.database + '/provedor/save', provedor)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const updateProvedor = (productor) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/provedor/update/' , productor)
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
                .delete(url + decoded.database + `/provedor/${id}`)
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
                .get(url + decoded.database + '/ubicacion/' + id)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const updateUbicacion = (data) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/ubicacion/update/' + data._id, data)
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
                .get(url + decoded.database + '/ubicacions')
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
                .get(url + decoded.database + '/ubicacions/saldo')
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
                .post(url + decoded.database + '/ubicacion/save', ubicacion)
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
                .delete(url + decoded.database + `/ubicacion/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// API COMPRAS

export const getComprasActivas = () => {

    try{
        if (decoded){
            return axios
                .get(url + decoded.database +'/compras/activas')
                .then( res => {
                    return res.data
                })
        }
    }catch (err) {
        console.log(err+ ' Desconectado?')
    }
}

export const getCompras = (mes, year) => {

    try{
        if (decoded){
            return axios
                .get(url + decoded.database + '/compras/'+mes+'/'+year)
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
                .get(url + decoded.database +  `/compra/${id}`)
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
                .post(url + decoded.database + '/compra/save', compra)
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
                .delete(url + decoded.database + `/compra/${id}`)
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
                .put(url + decoded.database + `/close/compra/${id}`)
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

export const recuperaVentasCompra = (id) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + '/compra/recuperarVentas/' + id)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const recuperaGastosCompra = (id) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + '/compra/recuperarGastos/' + id)
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
                .get(url + decoded.database + '/tipocompras')
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
                .post(url + decoded.database + '/tipocompra/create', tipoCompra)
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
                .get(url + decoded.database + '/inventario')
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
                .get(url + decoded.database +  `/inventario/${ubicacion}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getInventarioxUbicacion = () => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database +  `/inventarioxubicacion/`)
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
                .post(url + decoded.database +  `/inventario/movimiento`, move)
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
                .get(url + decoded.database + '/venta/'+ folio)
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
                .get(url + decoded.database + '/ventas')
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
                .get(url + decoded.database + '/ventas/semana', {params: {f1: f1, f2: f2} })
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
                .post(url + decoded.database + '/venta/save', venta)
                .then(res => {
                    return res.data
                })
                .catch( error => {
                    return {
                        status: "error",
                        message:"Red ocupada, intentelo de nuevo más tarde. " + error
                        }
                })
        }
    }catch (err){
        console.log(err)
        return {
            status: "error",
            message:"Ocurrio un error."
        }
    }
}
export const cancelVenta = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url + decoded.database + `/venta/${id}`)
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
            return axios.get(url + decoded.database +'/cuentasporpagar')
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
                .post(url + decoded.database + '/cuentasporpagar/pago/save', pago)
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
                .post( url + decoded.database +  '/cuentasporcobrar/save', cuenta)
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
                .get(url + decoded.database + `/cuentasporcobrar/cliente/${id}`)
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
                .get(url + decoded.database + '/cuentasporcobrar')
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
                .get(url + decoded.database + '/cuentasporcobrar/pdv')
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
                .post(url + decoded.database +  '/cuentasporcobrar/pago/save', pago)
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
                .post(url + decoded.database+  '/ingreso/save', ingreso)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getIngresos = (fecha) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database+  '/ingresos/' + fecha)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}
export const getIngresosMonthYear = (month, year) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database+  '/ingresos/' + month + '/'+ year)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const delIngreso = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url + decoded.database + `/ingreso/${id}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const updateIngreso = (ingreso) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/ingreso/update/', ingreso)
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
                .post(url + decoded.database + '/egreso/save', egreso)
                .then(res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const getEgresos = (fecha) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database+  '/egresos/' + fecha)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getEgresosMonthYear = (month, year) =>{
    try {
        if(decoded){
            return axios
                .get(url + decoded.database + '/egresos/' + month + '/'+year)
                .then(res=>{
                    return res.data
                })
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteEgreso = (id) => {
    try{
        if(decoded){
            return axios
                .delete(url + decoded.database+  '/egreso/delete/' + id)
                .then( res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const updateEgreso = (egreso) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/egreso/update/', egreso)
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
                .get(url + decoded.database + `/corte/${ubicacion}/${fecha}`)
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
                .post(url + decoded.database +  '/corte/save', corte)
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
                .get(url + decoded.database + `/corte/exist/${ubicacion}/${fecha}`)
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
                .get(url + decoded.database + `/corte/open/${ubicacion}/${fecha}`)
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
                .get(url + decoded.database + '/balance/')
                .then( res => {
                    return res.data.balance
                })
        }
    }catch (err) {
        console.log(err+ ' Desconectado?')
    }
}
export const getDisponiblexUbicacion = (fecha) => {
    try{
        if (decoded){
            return axios
                .get(url + decoded.database + '/balance/disponiblexubicacion/' + fecha)
                .then( res => {
                    return res.data.disp
                })
        }
    }catch (err) {
        return {
            status: 'error',
            message: 'error de algo',
            err
        }
    }
}

// UNIDADES

export const getUnidades = () => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + '/unidads')
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
                .post( url + decoded.database + '/unidad/save', unidad)
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
                .delete(url + decoded.database + `/unidad/${id}`)
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
                .get( url + decoded.database + '/empaques')
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
                .post( url + decoded.database + '/empaque/save', empaque)
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
                .delete(url + decoded.database + `/empaque/${id}`)
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
                .get( url + decoded.database + '/conceptos')
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
                .post( url + decoded.database + '/concepto/save', concepto)
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
                .delete(url + decoded.database + `/concepto/${id}`)
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

export const ticketTraspaso = (traspaso) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/traspaso.php', traspaso)
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
                .get( url + decoded.database + '/produccions')
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
                .get( url + decoded.database + '/produccion/save')
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
                .delete(url + decoded.database + `/produccion/${id}`)
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
                .post(url + decoded.database + '/produccionitem/delete', item)
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
                .post( url + decoded.database + '/produccionitem/subtract', {id, cantidad} )
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
                .post( url + decoded.database + '/produccionitem/save', item)
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
                .post( url + decoded.database + '/insumo/save', insumo)
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
                .post( url + decoded.database + '/insumo/delete', insumo)
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
                .post( url + decoded.database + '/insumo/subtract', {id, cantidad} )
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
                .post( url + decoded.database + '/insumo/add', {id, cantidad} )
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
                .post( url + decoded.database + '/items/subtract', {id, cantidad})
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
                .post( url + decoded.database + '/items/add', {id, cantidad})
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
                .get( url + decoded.database + '/restartApp')
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
                .get( url + decoded.database + '/empleados')
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const saveEmpleado = (empleado) => {
    try{
        if(decoded){
            return axios
                .post( url + decoded.database + '/empleados/add', empleado)
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
                .delete( url + decoded.database + `/empleado/${idEmpleado}`)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const updateEmpleado = (empleado) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/empleado/update/',empleado)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// EMPRESA

export const getEmpresa = (bd) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + '/empresa/')
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const saveEmpresa = (empresa) => {
    try{
        if(decoded){
            return axios
                .post(url + decoded.database + '/empresa/save/', empresa)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const updateEmpresa = (empresa) => {
    try{
        if(decoded){
            return axios
                .put(url + decoded.database + '/empresa/update/',empresa)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

// INVERSIONES

export const saveInversion = (inversion) => {
    try{
        if(decoded){
            return axios
                .post(url + decoded.database + '/inversion/save/', inversion)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const getInversions = (mes, year) => {
    try{
        if(decoded){
            return axios
                .get(url + decoded.database + `/inversions/${mes}/${year}`)
                .then(res => {
                    return res.data
                })
        }
    }catch (err){
        console.log(err)
    }
}

export const deleteInversion = (id) => {
    try{
        if(decoded){
            return axios
                .delete( url + decoded.database + `/inversion/delete/${id}`)
                .then( res => {
                    return res.data
                })
        }
    }catch(err){
        console.log(err)
    }
}

export const updtInversion = async (inversion) => {
    try{
        if(decoded){
            const res = await axios
                .put(url + decoded.database + '/inversion/update/', inversion);
            return res.data;
        }
    }catch(err){
        console.log(err)
    }
}

// LIQUIDACION

export const saveLiquidacion = (liquidacion) => {
    if(decoded){
        try{
            return axios
                .post(url + decoded.database + '/liquidacion/save/', liquidacion)
                .then(res => {
                    return res.data
                })
                .catch(err=>{
                    return {
                        status:"error",
                        message: err.message
                    }
                })
            }catch (err){
                return {
                    status:"error",
                    message: err.message
                }
            }
        }
}