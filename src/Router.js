import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Provedores from './components/Provedores';
import Ubicaciones from './components/Ubicaciones';
import Compras from './components/Compras';
import Inventario from './components/Inventario';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import PosContainer from './components/pos/PosContainer';
import ConceptosTabs from './components/conceptos/ConceptosTabs';
// import Error from './components/Error'

import useStyles from './components/hooks/useStyles'

export default function Router(){
    const classes = useStyles()
        return (
            <BrowserRouter>
                
                    <Header />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path='/dashboard' component={Dashboard}></Route>
                            <Route exact path='/productos' component={Productos}></Route>
                            <Route exact path='/clientes' component={Clientes}></Route>
                            <Route exact path='/provedores' component={Provedores}></Route>
                            <Route exact path='/ubicaciones' component={Ubicaciones}></Route>
                            <Route exact path='/compras' component={Compras}></Route>
                            <Route exact path='/conceptos' component={ConceptosTabs}></Route>
                            <Route exact path='/inventario' component={Inventario}></Route>
                            <Route exact path='/pos' component={PosContainer}></Route>
                        </Switch>
                    </main>
                
            </BrowserRouter>
        )
    
}
