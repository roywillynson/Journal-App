import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { removeError } from '../actions/ui';

// Views
import LoginView from '../views/auth/LoginView';
import SignupView from '../views/auth/SignupView';


const AuthRouter = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( removeError() )
    }, [dispatch])

    return (
        <div className="auth__main">

            <div className="auth__box-container">
                <Switch>

                    <Route exact path="/auth/login" component={ LoginView } />
                    <Route exact path="/auth/signup" component={ SignupView } /> 

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
            
        </div>
    )
}

export default AuthRouter
