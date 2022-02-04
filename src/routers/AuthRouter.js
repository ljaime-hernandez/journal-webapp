import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
  return (
        // the divs in this router has classes which will affect both components
        // this way we can modulate the classes being used on this section accordingly,
        // none of the classes used in this section will affect the '/' or the main
        // component, as that route is one level upper to this route
        
        <div className='auth__main'>
            <div className='auth__box-container'>
                <Switch>

                    <Route
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                    />
                    
                    <Route
                        exact
                        path="/auth/register"
                        component={RegisterScreen}
                    />

                    <Redirect to="/auth/login"/>

                </Switch>
            </div>
        </div>
    )
};
