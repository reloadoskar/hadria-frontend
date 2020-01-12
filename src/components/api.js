import axios from 'axios';
import Global from './Global';

const url = Global.url;

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
        .get(url + 'productos')
        .then(res => {
            return res.data
        })
}

export const saveProduct = (producto) => {
    return axios
        .post(url + 'producto/save', producto)
        .then(res => {
            return res.data
        })
}

export const deleteProduct = (id) => {
    return axios
        .delete(url + `producto/${id}`)
        .then(res => {
            return res.data
        })
}

// API CLIENTES

export const getClientes = () => {
    return axios
        .get(url + 'clientes')
        .then(res => {
            return res.data
        })
}
export const saveCliente = (cliente) => {
    return axios
        .post(url + 'cliente/save', cliente)
        .then(res => {
            return res.data
        })
}

export const deleteCliente = (id) => {
    return axios
        .delete(url + `cliente/${id}`)
        .then(res => {
            return res.data
        })
}
// API PROVEEDORES

export const getProvedors = () => {
    return axios
        .get(url + 'provedors')
        .then(res => {
            return res.data
        })
}
export const saveProvedor = (provedor) => {
    return axios
        .post(url + 'provedor/save', provedor)
        .then(res => {
            return res.data
        })
}

export const deleteProvedor = (id) => {
    return axios
        .delete(url + `provedor/${id}`)
        .then(res => {
            return res.data
        })
}

// API UBICACIONES

export const getUbicacions = () => {
    return axios
        .get(url + 'ubicacions')
        .then(res => {
            return res.data
        })
}
export const saveUbicacion = (ubicacion) => {
    return axios
        .post(url + 'ubicacion/save', ubicacion)
        .then(res => {
            return res.data
        })
}

export const deleteUbicacion = (id) => {
    return axios
        .delete(url + `ubicacion/${id}`)
        .then(res => {
            return res.data
        })
}

// API COMPRAS

export const getComprasDash = () => {
    return axios
        .get(url + 'compras/dash')
        .then( res => {
            return res.data
        })
}

export const getCompras = () => {
    return axios
        .get(url + 'compras')
        .then(res => {
            return res.data
        })
}
export const getCompra = (id) => {
    return axios
        .get(url + `compra/${id}`)
        .then( res => {
            return res.data
        })
}
export const saveCompra = (compra) => {
    return axios
        .post(url + 'compra/save', compra)
        .then(res => {
            return res.data
        })
}

export const deleteCompra = (id) => {
    return axios
        .delete(url + `compra/${id}`)
        .then(res => {
            return res.data
        })
}

export const closeCompra = (id) => {
    return axios
        .put(url + `compra/${id}`)
        .then( res => {
            return res.data
        })
}

// API TIPO_COMPRAS

export const getTipoCompras = () => {
    return axios
        .get(url + 'tipocompras')
        .then(res => {
            return res.data
        })
}

// INVENTARIO

export const getInventario = () => {
    return axios
        .get(url + 'inventario')
        .then(res => {
            return res.data
        })
}

export const getInventarioBy = (ubicacion) => {
    return axios
        .get(url + `inventario/${ubicacion}`)
        .then(res => {
            return res.data
        })
}

// VENTAS
export const getVenta = (id) => {
    return axios
        .post(url + 'venta', id)
        .then( res => {
            return res.data
        })
}
export const getVentas = () => {
    return axios
        .get(url + 'ventas')
        .then( res => {
            return res.data
        })
}
export const saveVenta = (venta) => {
    return axios
        .post(url + 'venta/save', venta)
        .then(res => {
            return res.data
        })
}
export const cancelVenta = (id) => {
    return axios
        .delete(url + `venta/${id}`)
        .then( res => {
            return res.data
        })
}

// CUENTAS POR PAGAR

export const getCuentasPorPagar = () => {
    return axios.get(url + 'cuentasporpagar')
        .then(res => {
            return res.data
        })
}

export const savePagoACuentaPorPagar = (pago) =>{
    return axios
        .post(url + 'cuentasporpagar/pago/save', pago)
        .then(res => {
            return res.data
        })
}

// CUENTAS POR COBRAR

export const createCuentaPorCobrar = (cuenta) => {
    return axios
        .post( url + 'cuentasporcobrar/save', cuenta)
        .then( res => {
            return res.data
        })
}

export const getCuentasPorCobrar = () => {
    return axios
    .get(url + 'cuentasporcobrar')
    .then( res => {
        return res.data
    })
}

export const savePagoACuentaPorCobrar = (pago) =>{
    return axios
        .post(url + 'cuentasporcobrar/pago/save', pago)
        .then(res => {
            return res.data
        })
}
// API INGRESOS

export const saveIngreso = (ingreso) => {
    return axios
        .post(url + 'ingreso/save', ingreso)
        .then( res => {
            return res.data
        })
}

// API EGRESOS

export const saveEgreso = (egreso) => {
    return axios
        .post(url + 'egreso/save', egreso)
        .then(res => {
            return res.data
        })
}

// API CORTES

export const getDataFrom = (ubicacion, fecha) => {
    return axios
        .get(url + `corte/${ubicacion}/${fecha}`)
        .then( res => {
            return res.data
        })
}

export const saveCorte = (corte) => {
    return axios
        .post(url + 'corte/save', corte)
        .then( res => {
            return res.data
        })
}

export const existCorte = (ubicacion, fecha) => {
    return axios
        .get(url + `corte/exist/${ubicacion}/${fecha}`)
        .then( res => {
            return res.data
        })
}

export const getBalance = () => {
    return axios
    .get(url + 'balance')
    .then( res => {
        return res.data.balance
    })
}

// UNIDADES

export const getUnidades = () => {
    return axios
        .get(url + 'unidads')
        .then( res => {
            return res.data
        })
}

export const addUnidad = (unidad) => {
    return axios
        .post( url + 'unidad/save', unidad)
        .then( res => {
            return res.data
        })
}

export const delUnidad = (id) => {
    return axios
        .delete(url + `unidad/${id}`)
        .then(res => {
            return res.data
        })
}

// EMPAQUES

export const getEmpaques = () => {
    return axios
        .get( url + 'empaques')
        .then( res => {
            return res.data
        })
}

export const addEmpaque = (empaque) => {
    return axios
        .post( url + 'empaque/save', empaque)
        .then( res => {
            return res.data
        })
}

export const delEmpaque = (id) => {
    return axios
        .delete(url + `empaque/${id}`)
        .then(res => {
            return res.data
        })
}

// CONCEPTOS

export const getConceptos = () => {
    return axios
        .get( url + 'conceptos')
        .then( res => {
            return res.data
        })
}

export const addConcepto = (concepto) => {
    return axios
        .post( url + 'concepto/save', concepto)
        .then( res => {
            return res.data
        })
}

export const delConcepto = (id) => {
    return axios
        .delete(url + `concepto/${id}`)
        .then(res => {
            return res.data
        })
}

// TICKET

export const ticketCompra = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/', data)
}

export const ticketVenta = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/venta.php', data)
}

export const ticketCobranza = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/cobranza.php', data)
}

export const ticketEgreso = (data) => {
    return axios
        .post('http://localhost:8080/ticket-hadria/egreso.php', data)
}

// PRODUCCIONES

export const getProduccions = () => {
    return axios
        .get( url + 'produccions')
        .then( res => {
            return res.data
        })
}

export const createProduccion = () => {
    return axios
        .get( url + 'produccion/save')
        .then( res => {
            return res.data
        })
}

export const delProduccion = (id) => {
    return axios
        .delete(url + `produccion/${id}`)
        .then(res => {
            return res.data
        })
}
