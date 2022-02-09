import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { RegisterScreen } from "../../components/auth/RegisterScreen";

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

    beforeEach(()=> {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('should render properly', () => {
        
        expect(wrapper).toMatchSnapshot();
    });

    test('should dispatch actions accordingly', () => {
      
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        console.log(actions);

    });
    
    
})