import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginScreen } from '../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

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