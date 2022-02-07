import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { LoginScreen } from '../../components/auth/LoginScreen';

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

describe('tests on LoginScreen component', () => {

    beforeEach(()=> {
        store = mockStore(initialState);
    });

    test('should render Logins screen properly', () => {
      
        const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen/>
            </MemoryRouter>
        </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
})