import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
// Hooks
import useForm from '../../hooks/useForm';
// Actions
import { basicLogin, googleLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

const LoginView = () => {

    const dispatch = useDispatch();
    
    const { msgError, loading } = useSelector(state => state.ui) // Extraer informacion con redux del store

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: '',
    })

    const { email, password } = formValues || {}

    const handleLogin = (e) => {
        e.preventDefault();
        
        if( isFormValid() ) dispatch( basicLogin(email, password) )
    }

    const isFormValid = () => {

        if( !validator.isEmail( email ) ) {
            dispatch( setError('Email isn\'t valid') )
            return false
        }

        dispatch( removeError() )
        return true
    }

    const handleGoogleLogin = () => {
        
        dispatch( googleLogin() )
    }


    return (
        <>
            <form className="fade-in" onSubmit={handleLogin} >
                <div className="field">
                    <h1 className="auth__title">Login</h1>
                </div>

                { 
                    msgError 
                    && 
                    (
                        <div className="auth__alert-error mb-2 fade-in">
                        { msgError }
                        </div>
                    )
                }

                <div className="field">
                    <input type="email" onChange={handleInputChange} value={email} autoComplete="off" className="auth__input" name="email" placeholder="Email" />
                </div>

                <div className="field">
                    <input type="password" onChange={handleInputChange} value={password} autoComplete="off" className="auth__input"  name="password" placeholder="Password" />
                </div>

                <div className="field">
                    <button type="submit" className="auth__button button is-primary" disabled={loading} >Login</button>
                </div>

                <hr className="dividing"/>

                <div className="field auth__social-networking">
                    <p>Login with Social networking</p>
                    <div className="google-btn" onClick={handleGoogleLogin} >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo"/>
                        </div>
                        <p className="btn-text"><b>Sign in with google</b></p>
                    </div>
                    
                </div>

                <Link className="link" to="/auth/signup">Create new acount</Link>

            </form>
        </>
    )
}

export default LoginView;
