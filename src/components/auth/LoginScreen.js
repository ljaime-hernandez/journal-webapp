import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const {ui} = useSelector(state => state);

  // we use the selector to retrieve the ui state from the store,
  // the ui is composed of a loading boolean and an error message, both set to
  // false and null by default, the boolean will disable the submission button
  // until the input boxes on the form are filled accordingly, before the boolean
  // is set to true, the isLoginValid function will verify the information placed on
  // it and will then execute an action for the boolean to turn true when the input
  // is correct
  const {msgError, loading} = ui;

  // information is set by default for training and quick access purposes
  const [values, handleInputChange] = useForm({
    email: 'email@email.com',
    password: '123456'
  })

  const {email, password} = values;

  // after the validation is correct, the dispatch of a login action is sent to
  // the store for the user to be authenticated and access to its account
  const handleLogin = (e) => {
    e.preventDefault();

    if(isLoginValid()){
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  // the google login logic is properly described in the notes action file
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  // for simplocity purposes i included a validator dependency which will
  // verify if the email imput is indeed a correct email, the password must
  // be simply more than 4 characters
  const isLoginValid = () => {

    if ( !validator.isEmail(email)){
      dispatch(setError("The email input is incorrect"))
      return false;
    } else if( password < 5){
      dispatch(setError("Password should be longer than 4 characters"))
      return false;
    }

    dispatch(removeError())
    return true;
  }

  return (

      <div>
        <h3 className="auth__title">Login</h3>

        <form 
          onSubmit={handleLogin}
          className='animate__animated animate__fadeIn'  
        >

        {
          msgError &&
          (<div className="auth__alert-error">
            {msgError}
          </div>)
        }

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

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            Login
          </button>

          {/*div containing copied button we will use to authorize an user with their google account */}
          <div className="auth__social-networks">
            <p>Login with social networks</p>

            <div 
                className="google-btn"
                onClick={handleGoogleLogin}
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>

          </div>

          <Link 
            className="link"
            to="/auth/register"
          >
            Create new account
          </Link>
        </form>
      </div>
  )
};
