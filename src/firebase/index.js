import firebaseConfig from './firebase.config'
import firebase from 'firebase/app'
import 'firebase/firestore' // db
import 'firebase/auth' // authentication

// Initialize firebase
firebase.initializeApp(firebaseConfig)

// db
const db = firebase.firestore()

// Auth Providers
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {
    db,
    firebase,
    googleAuthProvider
}