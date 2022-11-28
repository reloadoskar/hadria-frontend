import React, {useState, useEffect, useContext} from 'react'
import { useSnackbar } from 'notistack';
import { Container, Backdrop, Typography } from '@material-ui/core'
import Acceso from './Acceso'
import useStyles from '../hooks/useStyles'
import {useCortes} from '../cortes/useCortes'
import moment from 'moment'
import DialogPos from './DialogPos'
import { InventarioContext } from '../inventario/InventarioContext';
import { UbicacionContext } from  '../ubicaciones/UbicacionContext'
import PesadasContextProvider from '../inventario/PesadasContext'
// import PosContainer from './PosContainer';
import { useAuth } from '../auth/use_auth';

export default function Pos(){
    const {user} = useAuth()
    const now = moment()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const {ubicacions} = useContext(UbicacionContext)
    const {loadInventarioUbicacion} = useContext(InventarioContext)
    
    const {existeCorte} = useCortes()
    
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
        existeCorte(user, ubicacion._id, fecha)
            .then(res => {
                if(res.corte.length === 0){
                    loadInventarioUbicacion(user, ubicacion._id)
                    .then(()=>{
                        setAccesando(false)
                        setDialogPos(true)
                    })
                }else{
                    setAccesando(false)
                    showMessage('Fecha cerrada, para esta ubicación', 'error')                    
                }
            }).catch(err=>{
                setAccesando(false)
                showMessage(err.message, 'error')
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
                    user={user}
                    ubicacions = {ubicacions}
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
            {/* <PosContainer
                open={dialogPos}
                close={closeDialogPos}
                fecha={fecha}
                ubicacion={ubicacion}
            /> */}
        </Container>
        </PesadasContextProvider>
    )
}