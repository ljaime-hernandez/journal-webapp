import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { RegisterScreen } from "../../components/auth/RegisterScreen";
import { types } from '../../types/types';

/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'RegisterScreen.test.js'
*/

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};
let store = mockStore(initialState);

describe('tests on RegisterScreen component', () => {


    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen/>
            </MemoryRouter>
        </Provider>
        );

    // beforeEach(()=> {
    //     store = mockStore(initialState);
    //     jest.clearAllMocks();
    // });

    test('should render properly', () => {
        
        expect(wrapper).toMatchSnapshot();
    });

    test('should dispatch actions accordingly', () => {
      
        const emailField = wrapper.find('input[name="email"]');
        
        // default value in the email input is set on the Register screen
        // i use the change event to set it ut as an empty string
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        // the submit event should trigger a message error as the email input is
        // empty.
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: "The email input is incorrect"
        })
    });

    test('should render alert div with error message', () => {
      
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Error message test'
            }
        };

        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
    });
})