import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    email: 'email@email.com',
    password: '123456'
  })

  const {email, password} = values;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(1234, 'Luis'))
  }

  return (
  <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>

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
        >
          Login
        </button>

        {/*div containing copied button we will use to authorize an user with their google account */}
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div 
              className="google-btn"
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
  </>
  )
};
