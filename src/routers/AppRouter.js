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
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    // we added the dispatch hook so we can let the login information persist
    // along with the useEffect hook 
    const dispatch = useDispatch();

    // state created just as a brief element demonstration of the page loading
    // the users login or logout state
    const [check, setCheck] = useState(true);
    // state created to send a boolean value to both the public and private 
    // routers of the webapp, with it we will know which pages will the user
    // have access to or not
    const [isLogged, setIsLogged] = useState(false);

    // as the onAuthStateChanged method works as a callback from the firebase,
    // the function will be launched every time the user access to the webapp.
    // we will either render private pages if the user information is persisted
    // in the webpage and the user exists in our database, or remain on public
    // pages if the user is not authenticated or not existant on the database.
    useEffect(() => {
      
    firebase.auth().onAuthStateChanged(async(user) => {
        
        if(user?.uid){
            dispatch(login(user.uid, user.displayName));
            setIsLogged(true);
            dispatch(startLoadingNotes(user.uid));
        } else {
            setIsLogged(false);
        }

        setCheck(false);
    })
    }, [dispatch, setCheck, setIsLogged]);

    if(check){
        return(
            <h1>Please Wait</h1>
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
