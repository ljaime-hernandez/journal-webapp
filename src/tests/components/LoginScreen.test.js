import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginScreen } from '../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

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
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))


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
store.dispatch = jest.fn();

describe('tests on LoginScreen component', () => {

    beforeEach(()=> {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });
    
    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
    );

    test('should render Logins screen properly', () => {
      
        expect(wrapper).toMatchSnapshot();
    });

    test('should launch startGoogleLogin', () => {
      
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('should launch startLoginEmailPassword', () => {
        
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLoginEmailPassword).toHaveBeenCalledWith('email@email.com', '123456');
    });
    
})