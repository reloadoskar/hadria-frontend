import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getProvedors, saveProvedor, deleteProvedor } from '../api'
const useProvedors = () => {
	const [provedors, setProvedors] = useState([])
	const { enqueueSnackbar } = useSnackbar()
	useEffect(() => {
		async function loadProvedors() {
			const res = await getProvedors()
			setProvedors(res.provedors);
		}
		loadProvedors()
		return () => setProvedors([])
	}, [])

	function addProvedor(provedor) {
		saveProvedor(provedor).then(res => {
			if (res.status === 'success') {
				const newProvedor = [res.provedor, ...provedors];  
				setProvedors(newProvedor)
			}
			enqueueSnackbar(res.message, { variant: res.status })
		})
	}

	function del(index, provedorId) {
		deleteProvedor(provedorId).then(res => {
			if(res.status === 'success'){
				const newProvedors = [...provedors];
                newProvedors.splice(index,1);
                setProvedors(newProvedors);
			}
			enqueueSnackbar(res.message, { variant: res.status });
		})
	}

	return {
		provedors,
		addProvedor,
		del
	}
};

export default useProvedors;