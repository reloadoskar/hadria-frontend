import React, {useState} from 'react'
import { useSnackbar } from 'notistack';
import { Container, Backdrop, Typography } from '@material-ui/core'
import Acceso from './Acceso'
import useStyles from '../hooks/useStyles'
import useInventario from '../inventario/useInventario'
import useUbicacions from '../hooks/useUbicacions'
import moment from 'moment'
import useCortes from '../cortes/useCortes'
import useClientes from '../clientes/useClientes'
import useIngresos from '../ingresos/useIngresos'
import DialogPos from './DialogPos'
// import {sumImporte} from '../Tools'
export default function Pos(props){
    const {user}=props
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const {ubicacions} = useUbicacions()
    const inventario = useInventario()
    const {clientes} = useClientes()
    const {addVenta, cxcPdv, addPagoCxc} = useIngresos()
    const cortes = useCortes()
    
    const [accesando, setAccesando] = useState(false)
    const [ubicacion, setUbicacion] = useState("")
    const [fecha, setFecha] = useState("")
    
    const [dialogPos, setDialogPos] = useState(false)
    
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const handleChange = (type, value) => { 
        if(type === 'ubicacion'){            
            return setUbicacion(value)
        }
        if(type === 'fecha'){
            var f = moment(value).format('YYYY-MM-DD')
            return setFecha(f)
        }
    }
    const access = () => {
        setAccesando(true)
        cortes.existeCorte(ubicacion._id, fecha)
            .then(res => {
                setAccesando(false)
                if(res.corte.length === 0){
                    inventario.getInventarioUbicacion(ubicacion._id)
                    setDialogPos(true)
                }else{
                    showMessage('Fecha cerrada, para esta ubicación', 'error')                    
                }
            })
    }
    
    const closeDialogPos = () => {
        setDialogPos(false)
    }

    
    return(
        <Container>
            {user === null ?
                <Backdrop className={classes.backdrop} open={true} >
                    <Typography variant="h6" align="center" children="¡Hey!, ¿tú qué haces acá?, ¡Sáquese alv!" />
                </Backdrop>
            :
                <Acceso 
                    accesando={accesando}
                    user={user}
                    ubicacions = {ubicacions}
                    ubicacion={ubicacion} 
                    fecha={fecha} 
                    handleChange={handleChange}
                    access={access}
                />
            }
            <DialogPos 
                cortes={cortes}
                user={user}
                open={dialogPos}
                close={closeDialogPos}
                showMessage={showMessage}
                fecha={fecha}
                ubicacion={ubicacion}
                ubicacions={ubicacions}
                inventario={inventario}
                clientes={clientes}
                addVenta={addVenta}
                cxcPdv={cxcPdv}
                addPagoCxc={addPagoCxc}
            />


        </Container>
    )
}