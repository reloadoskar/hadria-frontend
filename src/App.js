import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Home from './components/Home'
import Register from './components/Register'
import NotFound from './components/404'
import {PrivateRoute} from './privateRoute'
import { ProvideAuth } from "./components/auth/use_auth"
import ProductorContextProvider from './components/productors/ProductorContext';
import InversionContextProvider from './components/inversions/InversionContext';
import EgresoContextProvider  from './components/egresos/EgresoContext';
function App() {
    
	return (
        <ProvideAuth>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <ProductorContextProvider>
                    <InversionContextProvider>
                        <EgresoContextProvider>
                        <PrivateRoute path="/app" >
                            <Router />
                        </PrivateRoute>
                        </EgresoContextProvider>
                    </InversionContextProvider>
                    </ProductorContextProvider>
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