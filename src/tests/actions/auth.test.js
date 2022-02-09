/**  * @jest-environment node  */ 
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

let store = mockStore(initialState);

describe('tests on auth actions', () => {

    beforeEach(()=> {
        store = mockStore(initialState);
    });

    test('login and logout should call proper actions', () => {
      
        const uid = '123456';
        const displayName = 'Miguel';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('should execute startLogout properly', async() => {
        
        await store.dispatch(startLogout());
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
        await store.dispatch(startLoginEmailPassword(email, password));
        const actions = store.getActions();
        
        expect(actions[2]).toEqual({
            type: types.login,
            payload: {
                uid: 'hUTHd6NeIHXoOBaWkPPNXZmLEhI3',
                displayName: null
            }
        });
    });
});