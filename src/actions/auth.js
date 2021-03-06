import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { startLoading, finishLoading } from './ui';
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {

    // the dispatch contains functions from different reducers, but the useDispatch hook
    // is linked to redux, using the environment developed in the store file along with
    // our redux functions, the reducers are contained in the combineReducer method, allowing
    // us to dispatch several actions at once
    return (dispatch) => {

        dispatch(startLoading());

        // account authentication from regular email accounts, it returns a callback which we will
        // use to dispatch the login action from our auth reducer and, either it goes thru or not
        // will also dispatch the finishLoading function to enable the LoginScreen button for login
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(finishLoading());
            dispatch(login(user.uid, user.displayName));
        }).catch( e => {
            dispatch(finishLoading());
            Swal.fire('Error', e.message,'error');
        })
    }
}

export const startGoogleLogin = () => {

    // as this function is a callback, the dispatch will be sent back to our authReducer
    // environment for it to handle user login status
    return (dispatch) => {

        // the googleAuthProvider is an authentication method returned from our firebase
        // db, along with the signInWithPopup the user will be able to use its google
        // original account to create an account in our webpage, and for us to
        // use the information for authentication and also render a proper user interface
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
        }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

// the logout action will sign the user out from the firebase account,
// will delete the notes array used on the store and will set the user
// auth reducer onto an empty initial state
export const startLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        dispatch(noteLogout());
        dispatch(logout());
    }
}
    
// this action will use the firebase auth method creating a user using its
// input email and password, as the function is sending the respective information 
// on a http request we set the promise resolved from that function as asynchronous,
// which will return the user created information, additional to it we use the returned
// information to request an additional information post including the user name.
// finally we use the dispatch to login the user based on its uid and the
// displayName recently updated
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name});

            dispatch(login(user.uid, user.displayName))
        }).catch( e => {
            console.log(e);
            // alert displaying an error message if theres errors on the user input
            // or if the email exists
            Swal.fire('Error', e.message,'error');
        })
    }
}

