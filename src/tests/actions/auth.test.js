/**  * @jest-environment node  */ 
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'auth.test.js'
*/

// the test requires a mockStore as the auth file requires dispatch actions onto our store,
// the mockstore should have a middleware which can be used for testing for testing purposes
// as well
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

let store = mockStore(initialState);

describe('tests on auth actions', () => {

    // the mockstore might store the actions and the changes made to the state, creating
    // some conflicts when doing the tests, so we include a beforeEach method to set its
    // state to default
    beforeEach(()=> {
        store = mockStore(initialState);
    });

    test('login and logout should call proper actions', () => {
      
        const uid = '123456';
        const displayName = 'Miguel';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        // the login action returns both parameters passed as its payload, along with the
        // login type on it to be used in the proper action dispatch
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
        // the logout action should only return the logout type, as its meant to clear the
        // user object on the store
        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('should execute startLogout properly', async() => {
        
        // our startLogout function does a request to our firebase db, as it requires
        // external information then the function needs to be asynchronous.
        await store.dispatch(startLogout());

        // the actions returned after the user logs out should be an empty state for the
        // user reducer, empty state for the notes reducer and a null value for the
        // ui reducer, all tested out below
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.logout
        });

        expect(actions[0]).toEqual({
            type: types.notesLogoutClean
        });
    });

    test('should login with email and password', async() => {
      
        const email = 'testemail@email.com';
        const password = 'testpassword';
        // same as with the logout action, the login with email and password
        // function requires authentication with firebase, so we need to make this
        // test asynchronous
        await store.dispatch(startLoginEmailPassword(email, password));
        const actions = store.getActions();
        // the login action should return the users unique id and the display name
        // if possible, the user created for this test dont have a name so the return is 
        // null
        expect(actions[2]).toEqual({
            type: types.login,
            payload: {
                uid: 'hUTHd6NeIHXoOBaWkPPNXZmLEhI3',
                displayName: null
            }
        });
    });
});