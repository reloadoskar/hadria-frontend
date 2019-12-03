import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getUbicacions, saveUbicacion, deleteUbicacion } from '../api'
const useUbicacions = () => {
	const [ubicacions, setUbicacions] = useState([])
	const { enqueueSnackbar } = useSnackbar()
	useEffect(() => {
		async function loadData() {
			const res = await getUbicacions()
			setUbicacions(res.ubicacions);
		}
		loadData()
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


	return {
		ubicacions,
		add,
		del
	}
};

export default useUbicacions;