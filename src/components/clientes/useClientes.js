import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { getClientes, saveCliente, deleteCliente } from '../api'
const useClientes = () => {
	const [clientes, setClientes] = useState([])
	const { enqueueSnackbar } = useSnackbar()

	
	useEffect(() => {
		async function loadClientes() {
			const res = await getClientes()
			setClientes(res.clientes);
		}
		loadClientes()
		return () => setClientes([])
	}, [])

	function crearCliente(cliente) {
		saveCliente(cliente).then(res => {
			if (res.status === 'success') {
				const newCliente = [res.cliente, ...clientes];  
				setClientes(newCliente)
			}
			enqueueSnackbar(res.message, { variant: res.status })
		})
	}

	function eliminarCliente(index, clienteId) {
		deleteCliente(clienteId).then(res => {
			if(res.status === 'success'){
				const newClientes = [...clientes];
                newClientes.splice(index,1);
                setClientes(newClientes);
			}
			enqueueSnackbar(res.message, { variant: res.status });
		})
	}


	return {
		clientes,
		crearCliente,
		eliminarCliente,

	}
};

export default useClientes;