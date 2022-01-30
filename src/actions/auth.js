import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { startLoading, finishLoading } from './ui';
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(finishLoading());
            dispatch(login(user.uid, user.displayName));
        }).catch( e => {
            dispatch(finishLoading());
        })
    }
}

export const startGoogleLogin = () => {

    // as this function is a callback, the dispatch will be sent back to 
    return (dispatch) => {

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
    
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name});

            dispatch(login(user.uid, user.displayName))
        }).catch( e => {
            console.log(e);
        })
    }
}

