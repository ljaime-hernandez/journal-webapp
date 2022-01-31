import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [check, setCheck] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      
    firebase.auth().onAuthStateChanged((user) => {
        
        if(user?.uid){
            dispatch(login(user.uid, user.displayName));
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }

        setCheck(false);
    })
    }, [dispatch, setCheck, setIsLogged]);

    if(check){
        return(
            <h1>Wait</h1>
        )
    }

  return (
    <Router>
        <div>
            <Switch>

                <PublicRoute 
                    isAuthenticated={isLogged}
                    path="/auth"
                    component={AuthRouter}
                />
                <PrivateRoute 
                    exact
                    isAuthenticated={isLogged}
                    path="/"
                    component={JournalScreen}
                />

                <Redirect to="/auth/login"/>

            </Switch>
        </div>
    </Router>
  )
};
