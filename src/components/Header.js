import React from 'react';
import TopBar from './TopBar'
import DefaultDrawer from './DefaultDrawer'

import CssBaseline from '@material-ui/core/CssBaseline';

export default function Header(props){

    const {url, auth, logout, open, toggle , user} = props

        return (
            <React.Fragment>
            
                <CssBaseline />

                <TopBar toggle={toggle} logout={logout} open={open} auth={auth} user={user}/>
                
                <DefaultDrawer url={url} toggle={toggle} open={open} user={user}/>
            
            </React.Fragment>
        )
    
}
