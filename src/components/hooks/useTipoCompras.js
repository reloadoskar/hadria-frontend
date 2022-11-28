import { useState, createContext, useContext } from 'react';
import { getTipoCompras, createTipoCompra } from '../api'

export const TipoComprasContext = createContext()

export const useTipoCompras = () =>{
	return useContext(TipoComprasContext)
}
export const TipoComprasProvider = ({children}) => {
    const [tipoCompras, setTipoCompras] = useState([])
        
	async function loadTipoCompras(user) {
		const res = await getTipoCompras(user)
		setTipoCompras(res.tipoCompras);
	}
	
	function addTipoCompra(user, tipoCompra) {
		return createTipoCompra(user, tipoCompra).then(res => {
			if (res.status === 'success') {
				const newTipoCompras = [...tipoCompras, res.tipocompra];  
				setTipoCompras(newTipoCompras)
				return res
			}
		})
	}

  return (
	<TipoComprasContext.Provider value={{
		tipoCompras,
		addTipoCompra,
		loadTipoCompras
	}}>
		{children}
	</TipoComprasContext.Provider>
  )
};