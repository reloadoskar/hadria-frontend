import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';
import Produccions from './components/produccions/Produccions'
import Empleados from './components/empleados/Empleados'
import Productos from './components/productos/Productos';
import Clientes from './components/clientes/Clientes';
import Productors from './components/productors/Productors';
import Ubicaciones from './components/ubicaciones/Ubicaciones';
import Compras from './components/compras/Compras';
import Inventario from './components/inventario/Inventario';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/Header';
import Pos from './components/pos/Pos';
import ConceptosTabs from './components/conceptos/ConceptosTabs';
import Ventas from './components/ventas/Ventas';
import useStyles from './components/hooks/useStyles'
import { useAuth } from "./components/auth/use_auth.js"
import Empresa from './components/empresa/Empresa';
import Inversions from './components/inversions/Inversions';

import { EmpresaContext } from './components/empresa/EmpresaContext';
import { UbicacionContext } from './components/ubicaciones/UbicacionContext';
import { ClienteContext } from './components/clientes/ClienteContext';
import { ProductorContext } from './components/productors/ProductorContext';
import VentaContextProvider from './components/ventas/VentaContext';

export default function Router() {
    const auth = useAuth()
    const { loadEmpresa } = useContext(EmpresaContext)
    const { loadUbicacions } = useContext(UbicacionContext)
    const { loadClientes } = useContext(ClienteContext)
    const { loadProductors } = useContext(ProductorContext)
    let { path, url } = useRouteMatch();
    const classes = useStyles()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const loadAll = async () => {
            const res = await Promise.all([
                loadEmpresa(),
                loadUbicacions(),
                loadClientes(),
                loadProductors()
            ])
            return res
        }
        loadAll()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const toggle = () => {
        setOpen(!open)
    };
    return (
        <div className={classes.root}>
            {auth.user === null ? null :
                <React.Fragment>
                    <Header url={url} auth={auth.autenticado} logout={auth.logout} open={open} toggle={toggle} user={auth.user} />
                    <main
                        className={
                            clsx(
                                classes.content,
                                { [classes.contentShift]: open, }
                            )
                        } >
                        <div className={classes.toolbar} />
                        <Switch>
                            {auth.user.level > 2 ? null :
                                <Route
                                    exact
                                    path={path}
                                    render={
                                        () => (
                                            <Dashboard />
                                        )
                                    }
                                />
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/productos`} component={Productos}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/produccions`} component={Produccions}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/inversions`} component={Inversions}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/clientes`} component={Clientes}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/productors`} component={Productors}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/ubicaciones`}>
                                    <Ubicaciones />
                                </Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/compras`}>
                                    <Compras />
                                </Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/conceptos`} 
                                    component={ConceptosTabs}></Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route 
                                    exact 
                                    path={`${path}/ventas`} 
                                    >
                                    <VentaContextProvider>
                                        <Ventas />
                                    </VentaContextProvider>
                                </Route>
                            }
                            {auth.user.level > 2 ? null :
                                <Route exact path={`${path}/empleados`} component={Empleados}></Route>
                            }
                            <Route exact path={`${path}/inventario`}>
                                <Inventario />
                            </Route>
                            <Route exact path={`${path}/pos`}>
                                <VentaContextProvider>
                                    <Pos />
                                </VentaContextProvider>
                            </Route>
                            <Route exact path={`${path}/configuracion`}>
                                <Empresa />
                            </Route>
                        </Switch>
                    </main>
                </React.Fragment>
            }
        </div>
    )
}