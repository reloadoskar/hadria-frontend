import React from 'react';
import TopBar from './TopBar'
import DefaultDrawer from './DefaultDrawer'

import CssBaseline from '@material-ui/core/CssBaseline';

export default function Header(props){

    const {url, auth, open, toggle} = props

        return (
            <React.Fragment>
            
                <CssBaseline />

                <TopBar toggle={toggle} open={open} auth={auth}/>
                
                <DefaultDrawer url={url} toggle={toggle} open={open}/>
            
            </React.Fragment>
        )
    
}
