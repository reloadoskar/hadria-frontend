import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Landing from './components/Landing'
import Register from './components/Register'
import {PrivateRoute} from './privateRoute'
import IsLoading from './IsLoading'

import auth from './auth'


function App() {

    const [isLoading, setIsLoading] = useState(false)

    const openLoading = () => {
        setIsLoading(!isLoading)
    }

    const closeLoading = () => {
        setIsLoading(false)
    }

	return (
		<BrowserRouter>
            <IsLoading isLoading={isLoading} openLoading={openLoading}/>

            <Switch>
                <Route exact path="/">
                    <Landing auth={auth} isLoading={isLoading} openLoading={openLoading} closeLoading={closeLoading}/>
                </Route>
                <Route exact path="/register">
                    <Register auth={auth} isLoading={isLoading} openLoading={openLoading} closeLoading={closeLoading}/>
                </Route>
                <PrivateRoute path="/app" auth={auth} >
                    <Router auth={auth} isLoading={isLoading} openLoading={openLoading} closeLoading={closeLoading}/>
                </PrivateRoute>
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
            
		</BrowserRouter>
			
	)
}

//export default App;


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