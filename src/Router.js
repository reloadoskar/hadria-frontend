import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Provedores from './components/Provedores';
import Ubicaciones from './components/Ubicaciones';
import Compras from './components/Compras';
import Inventario from './components/Inventario';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import Container from './components/pos/Container';
import ConceptosTabs from './components/conceptos/ConceptosTabs';
import { useHistory } from 'react-router-dom';
// import {PrivateRoute} from './privateRoute' 
// import Error from './components/Error'

import useStyles from './components/hooks/useStyles'

export default function Router({auth}){
    let { path, url } = useRouteMatch();
    let history = useHistory();
    const classes = useStyles()
    useEffect(()=> {
        if (!auth.isAuthenticated()){
            auth.logout(() => {
                history.push("/")
            })
        }
    }, [auth])
        return (
            <div className={classes.root}>

                    <Header url={url} auth={auth} />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            {/* <Route exact path={path} component={Dashboard}></Route> */}
                            <Route exact path={path} render={
                                (props) => ( 
                                        <Dashboard auth={auth} /> 
                                    )
                                }></Route>
                            <Route exact path={`${path}/productos`} component={Productos}></Route>
                            <Route exact path={`${path}/clientes`} component={Clientes}></Route>
                            <Route exact path={`${path}/provedores`} component={Provedores}></Route>
                            <Route exact path={`${path}/ubicaciones`} component={Ubicaciones}></Route>
                            <Route exact path={`${path}/compras`} component={Compras}></Route>
                            <Route exact path={`${path}/conceptos`} component={ConceptosTabs}></Route>
                            <Route exact path={`${path}/inventario`} component={Inventario}></Route>
                            <Route exact path={`${path}/pos`} component={Container}></Route>
                        </Switch>
                    </main>

            </div>
        )
    
}
