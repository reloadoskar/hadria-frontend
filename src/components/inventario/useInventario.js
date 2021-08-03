import { useState, useEffect } from 'react';
import { getInventario, getInventarioBy, 
    getInventarioxUbicacion,
    moveInventario } from '../api'
// import { sumImporte, sumStock } from '../Tools'
const useInventario = () => {
    const [inventario, setInventario] = useState(null)
    const [inventarioGeneral, setInventarioGeneral] = useState(null)
    // const [inventarioUbicacion, setInventarioUbicacion] = useState(null)
    const [inventarioXub, setInventarioXub] = useState(null)
    const [totalInventario, setTotalInventario] = useState(0)
    const [updating, setUpdating] = useState(false)

    const getInventarioGeneral = async () => {
        try {
            const res = await getInventario();
            setInventarioGeneral(res.inventario);
            return res
        } catch (err) {
            return false;
        }
    }

    const getInventarioUbicacion = (ubicacion_id) => {
        getInventarioBy(ubicacion_id)
            .then(res => {
                setInventario(res.inventario)
            })
            .catch(err => {
                return false
            })
    }

    const getInventarioXUbic = async () => {
        try {
            const res = await getInventarioxUbicacion();
            setInventarioXub(res.inventario);
            return res
        } catch (err) {
            return false;
        }
    }

	useEffect(() => {
		if(inventarioGeneral !== null){
			var tti = 0
			inventarioGeneral.map(compra => {
				return compra.items.map(itm=>{
					return tti += itm.stock * itm.costo
				})
			})
			setTotalInventario(tti)
		}

		return () => setTotalInventario(0)
	},[inventarioGeneral])

// 	useEffect(() => {
// 		if(inventario !== null){
// 			getInventarioUbicacion().then(res => {
// 				setInvxubic(res.inventario)
// 			})
// 		}
// 		return () => setInvxubic(null)
// 	}, [inventario])

// 	const getInvUbic = (ubic) => {
// 		return getInventarioBy(ubic).then(res => {
// 			setInvUbic(res.inventario)
// 			return res.inventario
// 		})
// 	}

	const mover = (movimiento) => {
		// setUpdating(!updating)
		return moveInventario(movimiento).then(res=>{
			setUpdating(!updating)
			return res
		})
	}

	return {
        inventario,
        inventarioGeneral,
        getInventarioGeneral,
        getInventarioUbicacion,
        inventarioXub,
        getInventarioXUbic,
		// invUbic,
		// invxubic,
		// getInvUbic,
		totalInventario,
		mover, 
		// updating,
		// setUpdating
	}
};

export default useInventario;