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
import useUser from './components/hooks/useUser'
// import {PrivateRoute} from './privateRoute' 
// import Error from './components/Error'

import useStyles from './components/hooks/useStyles'
// import useCompras from './components/hooks/useCompras';

export default function Router({auth}){
    let { path, url } = useRouteMatch();
    let history = useHistory();
    const classes = useStyles()
    const {user} = useUser()
    const [open, setOpen] = useState(false)
    // const {compras, crearCompra, cancelarCompra, cerrarCompra} = useCompras()
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
                                        <Dashboard auth={auth} /> 
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
                                // compras={compras} 
                                // crear={crearCompra} 
                                // cancelar={cancelarCompra} 
                                // cerrar={cerrarCompra} 
                                />
                            </Route>
                            <Route exact path={`${path}/conceptos`} component={ConceptosTabs}></Route>
                            <Route exact path={`${path}/inventario`} component={Inventario}></Route>
                            <Route exact path={`${path}/pos`} component={Container}></Route>
                            <Route exact path={`${path}/ventas`} component={Ventas}></Route>
                            <Route exact path={`${path}/empleados`} component={Empleados}></Route>
                        </Switch>
                    </main>

            </div>
        )
    
}
