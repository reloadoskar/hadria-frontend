import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, TextField, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { useInventario } from '../inventario/InventarioContext'
import { useAuth } from '../auth/use_auth'

export default function RecibirCambio({open, close, cambioSelected}){
    const {user} = useAuth()
    const classes = useStyles()
    const {aceptarCambio} = useInventario()
    const [firma, setFirma] = useState({aceptado: false, comentario:"", fecha:Date(), })
    const [enviando, setEnviando] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        setEnviando(true)
        cambioSelected.firma = firma
        cambioSelected.status = "TERMINADO"
        aceptarCambio(user, cambioSelected).then(res=>{
            setEnviando(false)
            setFirma({aceptado: false, comentario:"", fecha:Date(), })
            close()
        }).catch(err=>{
            console.log(err)
            setEnviando(false)
        })

        
    }
    return !cambioSelected ? null :
        <Dialog open={open} onClose={close}>
            {enviando ? <Typography variant="h6" align="center">Enviando...</Typography> :
                <form onSubmit={handleSubmit}>                
                <DialogContent>
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={firma.aceptado}
                                onChange={(e)=>setFirma({...firma, aceptado: e.target.checked})}
                                name="Aceptado"
                            />
                        }
                        label="Acepto:"
                    />
                    <Typography align="center" variant="h4">{cambioSelected.piezas}pzs</Typography>
                    <Typography align="center" >{cambioSelected.respuesta.compraItem.compra.folio}-{cambioSelected.respuesta.compraItem.producto.descripcion} {cambioSelected.respuesta.compraItem.clasificacion}</Typography>
                    <Typography align="center" >Entrega: {cambioSelected.respuesta.empleado.nombre}</Typography>
                    <TextField 
                        fullWidth
                        id="coment" 
                        type="text"
                        multiline
                        maxRows={4}
                        value={firma.comentario}
                        label="Agregar comentario"
                        onChange={(e)=>setFirma({...firma, comentario: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>close()} className={classes.botonSimplon}>Salir</Button>
                    <Button className={classes.botonCosmico} type="submit">Aceptar</Button>
                </DialogActions>
                </form>            
            }
        </Dialog>
}