import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch,
    Redirect 
} from 'react-router-dom';
import { firebase } from '../firebase';

import JournalView from "../views/journal/JournalView";
import ViewLoading from '../components/ViewLoading';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthRouter from "./AuthRouter";
import { startLoadingNotes } from '../actions/notes';

const RouterApp = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => { // user

            if (user?.uid) { 
                dispatch( login( user.uid, user.displayName ) ); 

                setIsLoggedIn( true)

                dispatch( startLoadingNotes( user.uid ) )

            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        })

    }, [dispatch])


    return checking ? 
    ( 
        <ViewLoading /> 
    ) : 
    (
        <Router>

            <Switch>

                <PrivateRoute 
                    exact 
                    path="/" 
                    component={ JournalView } 
                    isAuthenticated={ isLoggedIn } 
                />

                <PublicRoute 
                    path="/auth" 
                    component={ AuthRouter } 
                    isAuthenticated={ isLoggedIn } 
                />

                <Redirect to="/" />

            </Switch>
        
            
        </Router>
    )
}

export default RouterApp
