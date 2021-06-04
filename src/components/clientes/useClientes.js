import { useState, useEffect } from 'react';

import { getClientes, saveCliente, deleteCliente } from '../api'
const useClientes = () => {
	const [clientes, setClientes] = useState([])

	useEffect(() => {
		async function loadClientes() {
			const res = await getClientes()
			setClientes(res.clientes);
		}
		loadClientes()
		return () => setClientes([])
	}, [])

	function crearCliente(cliente) {
		return saveCliente(cliente).then(res => {
			if (res.status === 'success') {
				const newCliente = [res.cliente, ...clientes];  
				setClientes(newCliente)
			}
			return res
		})
	}

	function eliminarCliente(index, clienteId) {
		deleteCliente(clienteId).then(res => {
			if(res.status === 'success'){
				const newClientes = [...clientes];
                newClientes.splice(index,1);
                setClientes(newClientes);
			}
		})
	}


	return {
		clientes,
		crearCliente,
		eliminarCliente,

	}
};

export default useClientes;