import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Produccions from './components/Produccions'
import Empleados from './components/empleados/Empleados'
import Productos from './components/productos/Productos';
import Clientes from './components/Clientes';
import Provedores from './components/Provedores';
import Ubicaciones from './components/Ubicaciones';
import Compras from './components/compras/Compras';
import Inventario from './components/inventario/Inventario';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import Container from './components/pos/Container';
import ConceptosTabs from './components/conceptos/ConceptosTabs';
import Ventas from './components/ventas/Ventas';
// import {PrivateRoute} from './privateRoute' 
// import Error from './components/Error'

import useUser from './components/hooks/useUser'
import useCompras from './components/hooks/useCompras'
import useUbicacions from './components/hooks/useUbicacions'
import useCortes from './components/hooks/useCortes'
import useBalance from './components/hooks/useBalance'

import useStyles from './components/hooks/useStyles'
import useInventario from './components/hooks/useInventario';


export default function Router({auth}){
    let { path, url } = useRouteMatch();
    let history = useHistory();
    const classes = useStyles()
    
    const {user} = useUser()
    const {compras, crearCompra, cancelarCompra, cerrarCompra} = useCompras()
    const {ubicacions} = useUbicacions()
    const { invxubic, inventario, mover } = useInventario()
    const {getCorte} = useCortes()
    const {balance, disp, totalCxc, addPagoCxc, cuentasxCobrar, addIngreso, addEgreso, 
        cuentasxPagar, 
        totalCxp, 
        addPagoCxp,} = useBalance()

    const [open, setOpen] = useState(false)
    useEffect(()=> {
        if (!auth.isAuthenticated()){
            auth.logout(() => {
                history.push("/")
            })
        }
    }, [auth, history])

    useEffect(()=>{
        if(user !== null){
            if(user.level === 3){
                history.push('/app/inventario')
            }
            if(user.level === 4){
                history.push(`/app/pos`)
            }
        }
    },[user, history])

    const toggle = () => {
        setOpen(!open)
    };
        return (
            <div className={classes.root}>
                <Header url={url} auth={auth} open={open} toggle={toggle} user={user} />
                    <main 
                        className={
                            clsx(
                                classes.content, 
                                { [classes.contentShift]: open, }
                            )
                        } >
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route 
                                exact 
                                path={path} 
                                render={
                                    (props) => ( 
                                        <Dashboard auth={auth}  
                                            user={user}
                                            ubicacions={ubicacions}
                                            crearCompra={crearCompra} 
                                            cancelarCompra={cancelarCompra} 
                                            cerrarCompra={cerrarCompra} 
                                            compras={compras}
                                            getCorte={getCorte}
                                            balance={balance}
                                            disp={disp}
                                            addIngreso={addIngreso}
                                            cuentasxCobrar={cuentasxCobrar} 
                                            addPagoCxc={addPagoCxc} 
                                            totalCxc={totalCxc} 
                                            addEgreso={addEgreso}
                                            cuentasxPagar={cuentasxPagar} 
                                            totalCxp={totalCxp} 
                                            addPagoCxp={addPagoCxp}
                                        /> 
                                    )
                                }
                            />
                            <Route exact path={`${path}/productos`} component={Productos}></Route>
                            <Route exact path={`${path}/produccions`} component={Produccions}></Route>
                            <Route exact path={`${path}/clientes`} component={Clientes}></Route>
                            <Route exact path={`${path}/provedores`} component={Provedores}></Route>
                            <Route exact path={`${path}/ubicaciones`} component={Ubicaciones}></Route>
                            <Route exact path={`${path}/compras`}>
                                <Compras 
                                    crearCompra={crearCompra} 
                                    cancelarCompra={cancelarCompra} 
                                    cerrarCompra={cerrarCompra} 
                                    compras={compras} 
                                />
                            </Route>
                            <Route exact path={`${path}/conceptos`} component={ConceptosTabs}></Route>
                            <Route exact path={`${path}/inventario`}>
                                <Inventario 
                                    ubicacions={ubicacions}
                                    invxubic={invxubic}
                                    inventario={inventario}
                                    mover={mover}
                                    />
                            </Route>
                            <Route exact path={`${path}/pos`} component={Container}></Route>
                            <Route exact path={`${path}/ventas`} component={Ventas}></Route>
                            <Route exact path={`${path}/empleados`} component={Empleados}></Route>
                        </Switch>
                    </main>

            </div>
        )
    
}
