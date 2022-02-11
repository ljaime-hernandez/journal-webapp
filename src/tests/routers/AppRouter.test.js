import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from '@testing-library/react';
/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'LoginScreen.test.js'
*/

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: {
            id: 'ABDCE',
            notes: []
        }
    }
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Tests on AppRouter', () => {

    test('should call login function if the user is already authenticated', async() => {
      
        let user;
        await act(async() => {

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'testemail2@email.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
                );
        });
        
        expect(login).toHaveBeenCalledWith("F87JPziRlwTYFMqTVll8uyooA7Y2", null);
    });
    
})