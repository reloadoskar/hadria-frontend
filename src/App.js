import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import Landing from './components/Landing'
import {ProtectedRoute} from './protectedRoute'
import useStyles from './components/hooks/useStyles'

function App() {
	const classes = useStyles();
	return (
		<div className={classes.root}>

            <Router />
            {/* <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} /> 
                    <Route exact path="/" component={Router} />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </BrowserRouter> */}

		</div>
			
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