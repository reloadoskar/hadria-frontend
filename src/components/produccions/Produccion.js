import React, {useState} from 'react'
import { Button, ButtonGroup, Dialog, AppBar, Toolbar, IconButton, Typography, Card, CardHeader, Zoom, CardContent, Avatar, Grid, LinearProgress, Box } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PostAddIcon from '@material-ui/icons/PostAdd';
// import ResumenVentas from './ResumenVentas'
// import DetalleGastos from './DetalleGastos'
// import DetalleInsumos from './DetalleInsumos'
import Insumos from './Insumos'
import Productos from './Productos'
import Procesar from './Procesar'
import AddInsumo from './AddInsumo'
import useInsumos from '../insumos/useInsumos'
import useStyles from '../hooks/useStyles'
import useCompraItems from '../hooks/useCompraItems'
import useProduccionItems from './useProduccionItems'
import moment from 'moment'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom in ref={ref} {...props} />;
});

export default function Produccion(props) {
    const {produccion, isOpen, handleClose, showMessage} = props
    const {insumos, add, del, restaInsumoStock, sumaInsumoStock} = useInsumos(produccion._id)
    const {produccionItems, addProduccionItem, delProduccionItem} = useProduccionItems(produccion._id)
    const {items, restaStock, sumaStock} = useCompraItems()
    const [showCrearproducto, setShowCrearProducto] = useState(false)
    const [showAddInsumo, setShowAddInsumo] = useState(false)
    const classes = useStyles()
    // var {insumos} = useInsumos()
    
    const closeDialog = () => {
        handleClose()
    }

    const crearProducto = (item) => {
        showMessage("Agregando Producto...", "info")
        // console.log(item)
        //restar stock
        item.insumos.forEach(op => {
            restaInsumoStock(op.insumo._id, op.cantidad).then(res=>{
                // console.log(res)
            })
        });
        addProduccionItem(item).then(res=> {
            showMessage(res.message, res.status)
        })
    }

    const eliminarProducto = (item) => {
        showMessage("Eliminando Producto...", "info")
        item.insumos.forEach(op => {
            sumaInsumoStock(op.insumo._id, op.cantidad).then(res=>{
                // console.log(res)
            })
        })
        delProduccionItem(item).then(res=>{
            showMessage(res.message, res.status)
        })
    }

    const agregarInsumo = (insumo) => {
        insumo.produccion = produccion._id
        showMessage("Agregando...", "info")
        add(insumo).then(res => {
            showMessage(res.message, res.status)
            restaStock(insumo.compraItem._id, insumo.cantidad)
        })
    }

    const eliminarInsumo = (insumo) => {
        showMessage("Eliminando...", "info")
        del(insumo).then(res=>{
            showMessage(res.message, res.status)
        })
        sumaStock(insumo.compraItem._id, insumo.cantidad)
    }

    const openCrearProducto = () => {
        setShowCrearProducto(true)
    }
    const closeCrearProducto = () => {
        setShowCrearProducto(false)
    }

    const openAddInsumo = () => {
        setShowAddInsumo(true)
    }

    const closeAddInsumo = () => {
        setShowAddInsumo(false)
    }

    return (
        <Dialog
            fullScreen
            scroll="body"
            open={isOpen}
            TransitionComponent={Transition}
            onClose={closeDialog}>

            { produccion === null ?
                <LinearProgress variant="query"
                />
                :
                <React.Fragment>
                    <Box>
                    <AppBar className={classes.produccionBar}>
                        <Toolbar >
                            <IconButton edge="start" onClick={handleClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        {produccion.folio}: {produccion.clave}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" align="center">
                                        {produccion.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    </Box>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {produccion.clave.charAt(0)}
                                </Avatar>
                            }
                            title={produccion.clave}
                            subheader={"Creado el: " + moment(produccion.fecha).format("YYYY-MM-DD")}
                            action={
                                <ButtonGroup variant="contained" size="small">
                                    <Button 
                                        onClick={() => openAddInsumo()}
                                        endIcon={<PostAddIcon/>}
                                        children="Agregar insumo"
                                    />
                                    <AddInsumo 
                                        open={showAddInsumo}
                                        close={closeAddInsumo}
                                        agregar={agregarInsumo}
                                        items={items}
                                        showMessage={showMessage} />
                                    <Button
                                        onClick={()=>openCrearProducto()}
                                        endIcon={<PostAddIcon/>}>
                                            Procesar
                                    </Button>
                                    <Procesar 
                                            open={showCrearproducto}
                                            close={closeCrearProducto}
                                            crear={crearProducto}
                                            insumos={insumos}
                                            produccion={produccion}
                                            showMessage={showMessage} />
                                </ButtonGroup>
                            }
                            
                        />
                        <CardContent>
                            <Grid container spacing={2}>

                                <Grid item xs={6} >
                                    <Insumos 
                                        insumos={insumos}
                                        eliminar={eliminarInsumo}
                                        produccion={produccion}
                                        showMessage={showMessage}/>
                                    
                                </Grid>

                                <Grid item xs={6}>
                                    <Productos 
                                        eliminar={eliminarProducto}
                                        productos={produccionItems}
                                        produccion={produccion}
                                        showMessage={showMessage} 
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <ResumenVentas 
                                        data={data.ventas}

                                    /> */}
                                </Grid>            
                                <Grid item xs={12}>
                                    {/* <DetalleGastos 
                                        gastos={data.egresos} 

                                    />                                      */}
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>

                </React.Fragment>
            }

        </Dialog>
    )
}