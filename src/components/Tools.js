import moment from "moment";

export const objectIsNull = (obj) => {
    let isNull = true
    for (const prop in obj){
        if (obj[prop] === "" || obj[prop] === [] || obj[prop] === null){
            isNull = true;
        }else{
            isNull = false
        }

        
    }
    return isNull
}

export const generadorDeClaves = (longitud)=>{	
	var resultado           = '';
	var caracteres       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var longitudCaracteres = caracteres.length;
	for ( var i = 0; i < longitud; i++ ) {
		resultado += caracteres.charAt(Math.floor(Math.random() * 
	longitudCaracteres));
	}
	return resultado;
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// suma importe de un objeto

export const sumImporte = (list) => {
    let suma = 0
    if( list === [] || list === undefined){
        return suma
    }else{
        list.forEach(function(item){
            suma += parseFloat(item.importe)
        })
        return suma
    }
}
export const sumSueldo = (list) => {
    let suma = 0
    if( list === [] || list === undefined){
        return suma
    }else{
        list.forEach(function(item){
            if(item.sueldo){
                suma += parseFloat(item.sueldo)
            }
        })
        return suma
    }
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
        suma += parseFloat(item.saldo)
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
    if(items !== null){
        items.forEach(function(item) {
            costoInventario += (item.stock * item.costo)
        })
        return costoInventario
    }
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
    try {
        return num.toFixed(dec).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }catch{

        return num 
    }
}

export const reduceNumber = (number, dec=1) => {
    let formatedNumber = ''
    if(number > 1000000){

        formatedNumber = formatNumber( (number / 1000000) , dec ) + " M"
    }else{
        formatedNumber = formatNumber((number / 1000),dec) + " K"
    }

    return formatedNumber
}

export const searchBy = (field, search, array) => {
    var found = []
    if (array ){
        if (search.length > 0){
            for (var i=0; i < array.length; i++) {
                var el = array[i]
                if(el[field].indexOf(search) !== -1){
                    // console.log(el[field])
                    found.push( el )
                }
            }
        }
    }
    return found
}

export function esEntero(n){
    return Number(n) === n && n % 1 === 0;
}

export function esDecimal(n){
    return Number(n) === n && n % 1 !== 0;
}

// export function groupBy(arr, key){
//     return arr.reduce(function(storage, item){
//         var group = item[key]
//         // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
//         storage[group] = storage[group] || [];
    
//         // add this item to its group within `storage`
//         storage[group].push(item);
    
//         // return the updated storage to the reduce function, which will then loop through the next 
//         return storage
//     },{})
// }

// export function agrupaVentas(array, prop) {
//     return array.reduce(function(groups, item) {
//         var val = item[prop];
//         groups[val] = groups[val] || 
//         {
//             folio: item.venta.folio, 
//             fecha: item.fecha,
//             cliente: item.venta.cliente,
//             items: [],
//             tipoPago: item.venta.tipoPago,
//             importe: 0
//         };
//         groups[val].importe += item.importe;
//         groups[val].items.push(item);
//         return groups;
//     }, []);

export function agrupaVentas(ventas, filtro) {
    let reduce = ventas.reduce(function(grupos, venta) {
        (grupos[venta[filtro]] = grupos[venta[filtro]] || {[filtro]: venta[filtro], timporte:0, tcantidad:0,tempaques:0})        
        grupos[venta[filtro]].timporte += venta.importe
        grupos[venta[filtro]].tcantidad += venta.cantidad
        grupos[venta[filtro]].tempaques += venta.empaques
        return grupos;
    }, []);

    return Object.keys(reduce).map(key => reduce[key])
}

export function agrupaItems(items, filtro){
    if(filtro === "producto"){
        let reduce = items.reduce(function(grupo, item){
            (grupo[item.producto._id] = grupo[item.producto._id] || { id: item.producto._id, [filtro] : item[filtro], stock:0, cantidad:0, empaques:0, empaquesStock:0, costo: item.costo})
            grupo[item.producto._id].stock += item.stock
            grupo[item.producto._id].cantidad += item.cantidad
            grupo[item.producto._id].empaques += item.empaques
            grupo[item.producto._id].empaquesStock += item.empaquesStock
            return grupo
        }, {})

        return Object.keys(reduce).map(key => reduce[key])
    }
}
export function agruparPor(arreglo, filtro){
    let reduce = arreglo.reduce((grupo, item)=>{
        (grupo[item[filtro]] =  grupo[item[filtro]] || {
            [filtro] : item[filtro],
            producto: item.producto,
            compra: item.compra,
            importe : 0,
            saldo: 0
        })
        grupo[item[filtro]].importe += item.importe
        if(item.saldo !== undefined){
            grupo[item[filtro]].saldo += item.saldo
        }
        return grupo
    },[])
    return Object.keys(reduce).map(key => reduce[key])
}
export function agruparPorObjeto(arreglo, objeto){
    let reduce = arreglo.reduce((grupo, item)=>{
        let guardado = grupo.find(itm=> itm._id === item[objeto]._id)
        if(guardado){
            guardado.stockGlobal += parseFloat(item.stock)
            guardado.empaquesStockGlobal += parseFloat(item.empaquesStock)

            let existeItem = guardado.items.find(itm=> itm._id === item._id)
            if(existeItem && existeItem.compra === item.compra){
                existeItem.stock += item.stock
                existeItem.empaquesStock += item.empaquesStock
            }else{
                guardado.items.push(item)
            }
        }else{
            grupo.push({
                _id: item[objeto]._id,
                [objeto] : item[objeto],
                items: [item],
                stockGlobal:item.stock,
                empaquesStockGlobal: item.empaquesStock,
                producto: item.producto,
                compra: item.compra
            })
        }
        return grupo
    },[])
    return Object.keys(reduce).map(key => reduce[key])
}
export function agruparPorHora(arreglo){
    let reduce = arreglo.reduce((grupo, item)=>{
        (grupo[moment(item.createdAt).format("HH")] =  grupo[moment(item.createdAt).format("HH")] || {
            hora : moment(item.createdAt).format("HH"),
            cantidad:0,
            importe : 0,
            empaques: 0
        })
        grupo[moment(item.createdAt).format("HH")].importe += item.importe
        grupo[moment(item.createdAt).format("HH")].cantidad += item.cantidad
        grupo[moment(item.createdAt).format("HH")].empaques += item.empaques

        return grupo
    },[])
    return Object.keys(reduce).map(key => reduce[key])
}