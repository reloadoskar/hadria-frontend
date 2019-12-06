import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Landing from './components/Landing'
import {PrivateRoute} from './privateRoute'

import auth from './auth'


function App() {

	return (
		<BrowserRouter>

            <Switch>
                <Route exact path="/">
                    <Landing auth={auth}/>
                </Route>
                <PrivateRoute path="/app" auth={auth} >
                    <Router auth={auth}/>
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