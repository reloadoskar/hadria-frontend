import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ children, auth, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={ ({location}) => auth.isAuthenticated() 
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