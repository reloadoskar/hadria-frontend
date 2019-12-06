import React, { useReducer } from 'react';
import TopBar from './TopBar'
import DefaultDrawer from './DefaultDrawer'

import CssBaseline from '@material-ui/core/CssBaseline';

import reducer from './reducers/AppReducer'

export default function Header({url, auth}){

    
    const [values, dispatch] = useReducer(reducer, {
        toggled: false, expanded: false
    })
    const toggle = () => {
            dispatch({type: 'toggled', value: !values.toggled})
        };

        const handleCollapse = () => {
            dispatch({type: 'expanded', value: !values.expanded})
        };

        return (
            <React.Fragment>
            
                <CssBaseline />

                <TopBar toggle={toggle} open={values.toggled} auth={auth}/>
                
                <DefaultDrawer url={url} toggle={toggle} toggled={values.toggled} handleCollapse={handleCollapse} expanded={values.expanded}/>
            
            </React.Fragment>
        )
    
}
