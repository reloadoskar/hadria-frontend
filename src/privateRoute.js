import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useAuth} from './components/auth/use_auth'

export const PrivateRoute = ({ children, ...rest}) => {
    let auth = useAuth()
    return (
        <Route 
            {...rest}
            render={ ({location}) => auth.user
                ? 
                    (
                        children
                    )
                :
                (
                    <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: location
                            }
                        }
                    } />
                )
            }
                
        />
    )
}