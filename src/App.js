import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Home from './components/Home'
import Register from './components/Register'
import NotFound from './components/404'
import { PrivateRoute } from './privateRoute'
import { ProvideAuth } from "./components/auth/use_auth"
import ProductorContextProvider from './components/productors/ProductorContext';
import InversionContextProvider from './components/inversions/InversionContext';
import EgresoContextProvider from './components/egresos/EgresoContext';
import UbicacionContextProvider from './components/ubicaciones/UbicacionContext';
import ComprasContextProvider from './components/compras/CompraContext';
import ProductosContextProvider from './components/productos/ProductosContext';
import EmpleadoContextProvider from './components/empleados/EmpleadoContext';
import ProductoContextProvider from './components/productos/ProductoContext'
import ClienteContextProvider from './components/clientes/ClienteContext'
import EmpresaContextProvider from './components/empresa/EmpresaContext'
import IngresoContextProvider from './components/ingresos/IngresoContext'
// import InventarioContextProvider from './components/inventario/InventarioContext';
import CuentasPorPagarContextProvider from './components/cxp/CuentasPorPagarContext';
function App() {

    return (
        <ProvideAuth>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <PrivateRoute path="/app" >
                        <EmpresaContextProvider>
                            <UbicacionContextProvider>
                                <ProductorContextProvider>
                                    <InversionContextProvider>
                                        <IngresoContextProvider>
                                            <EgresoContextProvider>
                                                <ComprasContextProvider>
                                                    <ProductosContextProvider>
                                                        <EmpleadoContextProvider>
                                                            <ProductoContextProvider>
                                                                <ClienteContextProvider>
                                                                    {/* <InventarioContextProvider> */}
                                                                        <CuentasPorPagarContextProvider>
                                                                            <Router />
                                                                        </CuentasPorPagarContextProvider>
                                                                    {/* </InventarioContextProvider> */}
                                                                </ClienteContextProvider>
                                                            </ProductoContextProvider>
                                                        </EmpleadoContextProvider>
                                                    </ProductosContextProvider>
                                                </ComprasContextProvider>
                                            </EgresoContextProvider>
                                        </IngresoContextProvider>
                                    </InversionContextProvider>
                                </ProductorContextProvider>
                            </UbicacionContextProvider>
                        </EmpresaContextProvider>
                    </PrivateRoute>
                    <Route path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ProvideAuth>
    )
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
            <App />
        </SnackbarProvider>
    );
}