export const objectIsNull = (obj) => {
    let isNull = true
    for (const prop in obj){
        // console.log("a ver: "+prop+"="+obj[prop])
        if (obj[prop] === "" || obj[prop] === [] || obj[prop] === null){
            isNull = true;
        }else{
            isNull = false
        }

        
    }
    // console.log("faltan datos? "+isNull)
    return isNull
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// suma importe de un objeto

export const sumImporte = (list) => {
    let suma = 0

    list.forEach(function(item){
        suma += parseFloat(item.importe)
    })
    // console.log(suma)
    return suma
}

export const countCreditos = (list) => {
    let count = 0
    list.forEach(function(item){
        if(item.tipoPago === "CRÉDITO"){
            count++
        }
    })
    return count
}

export const sumSaldo = (list) => {
    let suma = 0

    list.forEach(function(item){
        // if(item.tipoPago === 'CRÉDITO'){
            suma += parseFloat(item.saldo)
        // }
    })

    return suma
}
export const sumSaldoList = (list) => {
    let suma = 0

    list.forEach(function(item){
        suma += parseFloat(item.saldo)
    })

    return suma
}

export const sumAcuenta = (list) => {
    let suma = 0
    list.forEach(function(item){
        if(item.tipoPago === 'CRÉDITO'){
            suma += parseFloat(item.acuenta)
        }
    })

    return suma
}
export const sumCantidad = (list) => {
    let suma = 0

    list.forEach(function(item){
        suma += parseFloat(item.cantidad)
    })
    // console.log(suma)
    return suma
}

export const sumStock = (list) => {
    let suma = 0
    list.forEach(function(item){
        suma += parseFloat(item.stock)
    })
    return suma
}

export const sumEmpStock = (list) => {
    let suma = 0
    list.forEach(function(item){
        suma += parseFloat(item.empaquesStock)
    })
    return suma
}

export const sumEmpaques = (list) => {
    let suma = 0

    list.forEach(function(item){
        suma += parseFloat(item.empaques)
    })
    // console.log(suma)
    return suma
}
export const sumTotal = (list) => {
    let suma = 0

    list.forEach(function(item){
        suma += parseFloat(item.total)
    })
    // console.log(suma)
    return suma
}

export const calcTotal = (ventas, creditos, acuenta, ingresos, egresos) => {
    let total = 0
    //var tcreditos = sumImporte(creditos)
    // var tventas = sumImporte(ventas)
    // var timp = sumImporte(ingresos)
    // var tegr = sumImporte(egresos)
    // var acuenta = sumAcuenta(creditos)
    
    //total = tventas + timp - creditos - tegr
    total = ventas + ingresos + acuenta - creditos - egresos


    return total
}

export const calcCostoInventario = (items) => {
    let costoInventario = 0
    items.forEach(function(item) {
        costoInventario += (item.stock * item.costo)
    })
    return costoInventario
}

export const calcVentasItem =(ventas, item) => {
    let ventasItem = ventas.filter( venta => {        
        if(venta.compraItem === item){
            return venta
        }
        return null
    })
    // console.log(ventasItem)
    let vendido = 0
    ventasItem.forEach(function(item){
        vendido += item.importe
    })

    return vendido
}

export const calcTotalPorCobrar = (ventas) =>{
    let saldo = 0
    let idVenta = null
    
        
        ventas.forEach(function (item){
            if(item.venta !== null){
                if(idVenta !== item.venta._id){
                    if(item.venta.tipoPago === "CRÉDITO"){
                        saldo += item.venta.saldo
                        idVenta = item.venta._id
                    }
                }
            }
        })
    

    return saldo
}

export const calcComision = (compra, ventas) => {
    let totalVenta = sumImporte(ventas)
    let comision = 0

    comision = (compra.provedor.comision * totalVenta) / 100
    return comision
}

export const formatNumber = (num, dec=0) => {
    return num.toFixed(dec).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }