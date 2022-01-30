import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const {msgError} = useSelector( state => state.ui );

  const [values, handleInputChange] = useForm({
    name: 'Miguel',
    email: 'email@email.com',
    password: '123456',
    password2: '123456',
  })

  const {name, email, password, password2} = values;

  const handleRegister = (e) => {
    e.preventDefault();

    if(isFormValid()){
      dispatch(startRegisterWithEmailPasswordName(email, password, name))
    }
  }

  const isFormValid = () => {

    if(name.trim().length === 0){
      dispatch(setError("The name input is incorrect"))
      return false;
    } else if ( !validator.isEmail(email)){
      dispatch(setError("The email input is incorrect"))
      return false;
    } else if( password !== password2 || password2.length < 5){
      dispatch(setError("Password should be longer than 4 characters"))
      return false;
    }

    dispatch(removeError())
    return true;
  }

  return (
    <>
    <h3 className="auth__title">Register</h3>

    <form onSubmit={handleRegister}>

      {
        msgError &&
        (<div className="auth__alert-error">
          {msgError}
        </div>)
      }

    <input
        type="text"
        placeholder="Name"
        name="name"
        className="auth__input"
        autoComplete="off"
        value={name}
        onChange={handleInputChange}
        
      />

      <input
        type="text"
        placeholder="Email"
        name="email"
        className="auth__input"
        autoComplete="off"
        value={email}
        onChange={handleInputChange}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="auth__input"
        value={password}
        onChange={handleInputChange}       
      />

<input
        type="password"
        placeholder="Confirm your Password"
        name="password2"
        className="auth__input"      
        value={password2}
        onChange={handleInputChange} 
      />

      <button
        type="submit"
        className="btn btn-primary btn-block mb-5"
      >
        Register
      </button>

      <Link 
        className="link"
        to="/auth/login"
      >
        Already registered?
      </Link>
    </form>
</>
  )
}
