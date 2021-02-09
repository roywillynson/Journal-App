import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { basicRegister } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import useForm from '../../hooks/useForm';

const SignupView = () => {

  const { msgError } = useSelector(state => state.ui) // Extraer informacion con redux del store

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
      email: '',
      username: '',
      password: '',
      password2:''
  })

  const { email, username, password, password2 } = formValues

  const handleSignUp = (e) => {
    e.preventDefault()

    if(isFormValid()){
      dispatch( basicRegister( email, password, username ) )
    }

  }

  const isFormValid = () => {

    if( validator.isEmpty(username) ) {

      dispatch( setError('Name is required') )
      return false
    }
    
    if( !validator.isEmail(email) ) { 

      dispatch( setError('Email isn\'t valid') )
      return false
    }
    
    if( !Object.is( password, password2 ) || password.length < 5 ) {

      dispatch( setError('Password should be at least 6 characters and match other password') )
      return false
    }

    // Remover error despues de insertar datos
    dispatch( removeError() )
    return true
  }



  return (
    <>
      <form className="fade-in" onSubmit={handleSignUp}>
        <div className="field">
          <h1 className="auth__title">Sign Up</h1>
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
          <input
            type="email"
            autoComplete="off"
            autoFocus
            className="auth__input"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <input
            type="text"
            autoComplete="off"
            className="auth__input"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <input
            type="password"
            className="auth__input"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <input
            type="password"
            className="auth__input"
            name="password2"
            placeholder="Confirm password"
            value={password2}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <button type="submit" className="auth__button button is-primary">
            Register
          </button>
        </div>

        <Link className="link mt-5" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default SignupView;
