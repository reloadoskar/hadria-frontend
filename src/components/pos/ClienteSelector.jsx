import React, {useContext, useState, useEffect} from 'react'
import { Grid, Typography, Button, Menu, MenuItem} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../hooks/useStyles'
import { ClienteContext } from '../clientes/ClienteContext'
import CrearCliente from '../clientes/CrearCliente'
export default function ClienteSelector({ubicacion}){
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const { clientes } = useContext(ClienteContext)
    const [cliente, setCliente] = useState('')
    const [verCrearCliente, setVerCrear] = useState(false)
    useEffect(() => {
		if (clientes) {
			setCliente(clientes[0])
		}
	}, [clientes])
    const closeSelect = () => {
		setAnchorEl(null)
	}
    const seleccionaCliente = (cliente) => {
		setCliente(cliente)
	}
    return clientes.length === 0 ? null :
        <Grid item xs={12} container>
            <Grid item xs={12}>
                <Typography align="center" className={classes.textoMiniFacheron}>Cliente</Typography>
                    <Button
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        fullWidth
                    >
                        {cliente.nombre ? cliente.nombre : "slecciona un cliente"}
                        <ExpandMoreIcon />
                    </Button>
                    <Menu
                        id="seleccionar-cliente"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={closeSelect}
                    >
                        {clientes
                            .filter(cl => cl.ubicacion === ubicacion._id || cl.ubicacion === undefined)
                            .map(cliente => (
                                <MenuItem
                                    key={cliente._id}
                                    onClick={() => {
                                        seleccionaCliente(cliente)
                                        closeSelect()
                                    }}
                                >
                                    {cliente.nombre}
                                </MenuItem>
                        ))}
                            <MenuItem onClick={()=>setVerCrear(true)}>
                                <Typography className={classes.textoMirame}>Nuevo cliente...</Typography>
                            </MenuItem>
						</Menu>
                        <CrearCliente open={verCrearCliente} close={()=>setVerCrear(false)}/>
					</Grid>
        </Grid>
}