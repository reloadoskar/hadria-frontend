import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getUbicacion, getUbicacions, saveUbicacion, deleteUbicacion } from '../api'
const useUbicacions = () => {
	const [ubicacions, setUbicacions] = useState([])
	// const [ubicacionsSaldo, setUbicacionsSaldo] = useState([])
	const { enqueueSnackbar } = useSnackbar()
	useEffect(() => {
		async function loadData() {
			const res = await getUbicacions()
			setUbicacions(res.ubicacions)
			// const saldo = await getUbicacionsSaldo()
			// setUbicacionsSaldo(saldo.data)
		}
		loadData()

		return () => setUbicacions([])
	}, [])

	function add(ubicacion) {
		saveUbicacion(ubicacion).then(res => {
			if (res.status === 'success') {
				const newUbicacion = [res.ubicacion, ...ubicacions];
				setUbicacions(newUbicacion)
			}
			enqueueSnackbar(res.message, { variant: res.status })
		})
	}

	function del(index, ubicacionId) {
		deleteUbicacion(ubicacionId).then(res => {
			if (res.status === 'success') {
				const newUbicacions = [...ubicacions];
				newUbicacions.splice(index, 1);
				setUbicacions(newUbicacions);
			}
			enqueueSnackbar(res.message, { variant: res.status });
		})
	}

	function verUbicacion(id) {
		if(id === undefined){console.log("quepedote")}
		getUbicacion(id).then(res => {
			// console.log(res)
			return res
		})
	}


	return {
		ubicacions,
		// ubicacionsSaldo,
		verUbicacion,
		add,
		del
	}
};

export default useUbicacions;