import types from '../types';
import { firebase, googleAuthProvider, } from '../firebase/index';
import { nodesLogout } from './notes';
import { finishLoading, setError, startLoading } from './ui';


export const googleLogin = () =>{

    return (dispatch) => {

        firebase.auth()
            .signInWithPopup(googleAuthProvider)
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) )
            })
            .catch(console.log)

    }
}

export const basicLogin = ( email, password ) => {
    return ( dispatch ) =>{
       
        // Start loading
        dispatch( startLoading( ) )

        // Realizar autenticacion
        firebase.auth()
            .signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) ) //logear
            })
            .catch( ( error ) => {
                dispatch( setError( error.message ))
            }) // error
            .finally( ( ) => {
                dispatch( finishLoading( ) ) // Ahora terminar con la carga
            })
        
    }
}

export const basicRegister = ( email, password, username ) => {
     return ( dispatch ) => {
        
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => { // User Credentials
                
                await user.updateProfile({
                    displayName: username
                })

                dispatch( login( user.uid, user.displayName ) )

            })
            .catch( error => dispatch( setError( error.message ) ) )

     }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async ( dispatch ) => {

        await firebase.auth().signOut()

        dispatch( logout() )
        dispatch( nodesLogout() )
    }
}

export const logout = ( ) => ({
    type: types.logout
})