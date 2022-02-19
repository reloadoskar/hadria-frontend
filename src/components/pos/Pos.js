import React, {useState, useEffect, useContext} from 'react'
import { useSnackbar } from 'notistack';
import { Container, Backdrop, Typography } from '@material-ui/core'
import Acceso from './Acceso'
import useStyles from '../hooks/useStyles'
// import useInventario from '../inventario/useInventario'
import useCortes from '../cortes/useCortes'
import useClientes from '../clientes/useClientes'
// import useIngresos from '../ingresos/useIngresos'
import moment from 'moment'
import DialogPos from './DialogPos'
import { InventarioContext } from '../inventario/InventarioContext';
import { IngresoContext } from '../ingresos/IngresoContext'
import { UbicacionContext } from  '../ubicaciones/UbicacionContext'
export default function Pos({user}){
    const now = moment()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const {ubicacions} = useContext(UbicacionContext)
    const {loadInventarioUbicacion} = useContext(InventarioContext)
    const {addVenta, cxcPdv,  addPagoCxc} = useContext(IngresoContext)
    // const  = useIngresos()
    const {clientes} = useClientes()
    const cortes = useCortes()
    
    const [accesando, setAccesando] = useState(false)
    const [ubicacion, setUbicacion] = useState(null)
    const [fecha, setFecha] = useState(moment().format("YYYY-MM-DD"))
    
    const [dialogPos, setDialogPos] = useState(false)

    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    useEffect(()=>{
        setUbicacion(user.ubicacion)
    },[user]) //
    const handleChange = (type, value) => { 
        if(type === 'ubicacion'){            
            return setUbicacion(value)
        }
        if(type === 'fecha'){
            if(moment(value) > now){
                showMessage('No se puede ver el futuro.', 'warning')
            }else{
                var f = moment(value).format('YYYY-MM-DD')
                return setFecha(f)
            }
        }
    }
    const access = () => {
        setAccesando(true)
        cortes.existeCorte(ubicacion._id, fecha)
            .then(res => {
                setAccesando(false)
                if(res.corte.length === 0){
                    loadInventarioUbicacion(ubicacion._id)
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
                clientes={clientes}
                addVenta={addVenta}
                cxcPdv={cxcPdv}
                addPagoCxc={addPagoCxc}
            />
        </Container>
    )
}