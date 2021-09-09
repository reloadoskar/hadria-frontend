import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
// import moment from 'moment'
import {
    Button,
    Container,
    Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import useCompras from '../compras/useCompras';
import useProducts from '../productos/useProducts'
import useProvedors from '../hooks/useProvedors';
// import useUbicacions from '../hooks/useUbicacions';
import useTipoCompras from '../hooks/useTipoCompras';
import Buscador from './Buscador'
import useStyles from '../hooks/useStyles'
import CrearCompra from './CrearCompra';
import ConfirmDialog from './ConfirmDialog'
import Compra from './Compra';
import ListaCompras from './ListaCompras';
import DetalleCompra from './DetalleCompra'

var meses = []
meses[0] = "";
meses[1] = "Enero";
meses[2] = "Febrero";
meses[3] = "Marzo";
meses[4] = "Abril";
meses[5] = "Mayo";
meses[6] = "Junio";
meses[7] = "Julio";
meses[8] = "Agosto";
meses[9] = "Septiembre";
meses[10] = "Octubre";
meses[11] = "Noviembre";
meses[12] = "Diciembre";

function Compras({ubicacions}) {
    const compras = useCompras()
    const {products, addProduct } = useProducts()
    const {provedors, addProvedor} = useProvedors()
    // const {ubicacions} = useUbicacions();
    const {tipoCompras, addTipoCompra} = useTipoCompras();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()

    const [showDialog, setShowDialog] = useState(false)
    const [showDialogP, setShowDialogP] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    const [compra, setCompra] = useState(null)
    const [verCompra, setVerCompra] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    let now = new Date()
    
    const [month, setMonth] = useState(now.getMonth() + 1)

    useEffect(()=>{
        compras.loadCompras(month)
    },[month])

    
    const crear = (compra) => {
        return compras.crearCompra(compra).then(res => {
            closeDialog()
            return res
        })
    }
    const openDialog = () => {
        setShowDialog(true)
    }

    const closeDialog = () => {
        setShowDialog(false)
    }
    const openDialogP = () => {
        setShowDialogP(true)
    }

    const closeDialogP = () => {
        setShowDialogP(false)
    }

    const editCompra = (compra) => {
        setCompra(compra)
        setDetCompra(true)
    }

    const closeCompra = () => {
        setDetCompra(false)
        setCompra(null)
    }

    function cancelar(){
        compras.cancelarCompra(compra._id).then(res => {
            closeConfirm()
            if (res.status === 'error') {
            } else {
                showMessage(res.message, res.status)
            }
        })
    }
    // function openConfirm(compra){
    //     setCompra(compra)
    //     setConfirm(true)
    // }
    function closeConfirm(){
        setCompra(null)
        setConfirm(false)
    }

    function closeVerCompra(){
        setCompra(null)
        setVerCompra(!verCompra)
    }

    function showVerCompra(compra){
        setCompra(compra)
        setVerCompra(true)
    }

    const onChangeMonth = (mes) => {
        setMonth(mes)
    }
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Buscador />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button className={classes.botonSimplon} fullWidth onClick={() => openDialog('comprasDialog')}>
                        <AddIcon /> Crear Compra
      		        </Button>
                    <CrearCompra
                        open={showDialog}
                        dialogP={showDialogP}
                        close={closeDialog}
                        openP={openDialogP}
                        closeP={closeDialogP}
                        showMessage={showMessage}
                        crear={crear}
                        products={products}
                        addProduct={addProduct}
                        provedors={provedors}
                        tipoCompras={tipoCompras}
                        ubicacions={ubicacions}
                        addTipoCompra={addTipoCompra}
                        addProvedor={addProvedor}
                    />
                </Grid>
                {/* <Grid item xs={4}>
                        <Button 
                            fullWidth
                            onClick={handleClick}
                            className={classes.botonsoteGenerico} 
                            children={
                                meses[month]
                        }/>
                        <Menu 
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            onClose={handleClose}
                        >
                            {meses.map((mes,i)=>(
                                <MenuItem onClick={()=>onChangeMonth(i)} key={i}>{mes}</MenuItem>
                            ))}
                        </Menu>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2">{compras.compras ? compras.compras.length : 0}</Typography>
                </Grid> */}
                <ListaCompras 
                    compras={compras.compras} 
                    editCompra={editCompra} 
                    verCompra={showVerCompra} 
                    recuperarVentas={compras.recuperarVentas} 
                    recuperarGastos={compras.recuperarGastos}
                    meses={meses}
                    month={month}
                    onChangeMonth={onChangeMonth}
                    />

            </Grid>
            <DetalleCompra 
                compra={compra} 
                open={detCompra} 
                close={closeCompra} 
                showMessage={showMessage} 
                ubicacions={ubicacions}
                products={products}
                provedors={provedors}
            />
            <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelar}/>
            <Compra compra={compra} open={verCompra} close={closeVerCompra} compras={compras} />
        </Container>
    )
}

export default Compras