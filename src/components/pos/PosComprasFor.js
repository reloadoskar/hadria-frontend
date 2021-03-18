import React from 'react';

import Typography from '@material-ui/core/Typography';
import CompraItem from '../compras/CompraItem';

export default function PosComprasFor({inventario, wantThisItem, showMessage}) {
	const iWantThisItem = (item, index, compraId) =>{
		if(item.stock === 0){
			showMessage("Inventario agotado.", 'warning' )
		}else{
			wantThisItem(item, index, compraId)
		}
	}

	return (
		<div>
			{
				inventario.length === 0 ?
					<Typography variant="h6" children="No se encontraron productos." align="center" />
				:
				inventario.map( (item, i) => {
					if(item.stock >= 1){
						return(
							<CompraItem elitem={item} key={i} action={iWantThisItem}/>
						)
					}
				}) 				
			}
		</div>
	);
}
