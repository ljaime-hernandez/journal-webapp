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
9. to have a clearer view of this single js test file, press p. then type the file name 'AppRouter.test.js'
*/

// the mock will make sure the function was called with the respective arguments by using the
// expect method on the test
jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// the initialState for this test requires the notes reducer to contain an active note, 
// for it to work we just need to add a value on the id for the active note
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
// the dispatch for the store is launched automatically with the useEffect if theres user
// information in the store, therefore we need to make a mock for it as we did for the login action
store.dispatch = jest.fn();

describe('Tests on AppRouter', () => {

    test('should call login function if the user is already authenticated', async() => {
      
        // we use the act method for the insertion of the user information into the
        // mockStore, this method will emulate the react events for the outcome to be
        // tested without doing a real insertion. The function will do a request to
        // the firebase DB so the function must be asynchronous
        await act(async() => {

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'testemail2@email.com', '123456');

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
                );
        });
        // the arguments in the test include the users ID and the displayName, which its
        // value is null on this example
        expect(login).toHaveBeenCalledWith("F87JPziRlwTYFMqTVll8uyooA7Y2", null);
    });
    
})