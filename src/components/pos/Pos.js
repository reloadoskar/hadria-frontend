import React, {useState, useEffect, useContext} from 'react'
import { useSnackbar } from 'notistack';
import { Container, Backdrop, Typography } from '@material-ui/core'
import Acceso from './Acceso'
import useStyles from '../hooks/useStyles'
import useCortes from '../cortes/useCortes'
import moment from 'moment'
import DialogPos from './DialogPos'
import { InventarioContext } from '../inventario/InventarioContext';
import { useAuth } from "../auth/use_auth"

import PesadasContextProvider from '../inventario/PesadasContext'
export default function Pos(){
    const auth = useAuth()
    const user = auth.user
    const now = moment()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    
    const {loadInventarioUbicacion, resetInventario} = useContext(InventarioContext)
    resetInventario()
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
                if(res.corte.length === 0){
                    loadInventarioUbicacion(ubicacion._id)
                    .then(()=>{
                        setAccesando(false)
                        setDialogPos(true)
                    })
                }else{
                    showMessage('Fecha cerrada, para esta ubicación', 'error')                    
                }
            })
    }
    
    const closeDialogPos = () => {
        setDialogPos(false)
    }

    return(
        <PesadasContextProvider>
        <Container>
            {user === null ?
                <Backdrop className={classes.backdrop} open={true} >
                    <Typography variant="h6" align="center" children="¡Hey!, ¿tú qué haces acá?, ¡Sáquese alv!" />
                </Backdrop>
            :
                <Acceso 
                    accesando={accesando}
                    ubicacion={ubicacion} 
                    fecha={fecha} 
                    handleChange={handleChange}
                    access={access}
                />
            }
            <DialogPos 
                open={dialogPos}
                close={closeDialogPos}
                ubicacion={ubicacion}
                fecha={fecha}                
            />
        </Container>
        </PesadasContextProvider>
    )
}