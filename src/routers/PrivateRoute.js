import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    const { pathname, search } = rest.location

    localStorage.setItem('lastPath', `${pathname}${search}`);

    return (
        <Route {...rest} component={(props) => 
            ( isAuthenticated ) ?
                ( <Component {...props} /> ) : 
                ( <Redirect to="/auth/login" /> )
        } >

        </Route>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}


export default PrivateRoute
