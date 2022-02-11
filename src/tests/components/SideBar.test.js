import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { SideBar } from "../../components/journal/SideBar";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";

jest.mock('../../actions/auth', () => ({
    startLogout: jest.fn()
}))
jest.mock('../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
    auth: {
        uid:"HTXx027Mr1U94zHwXIsXNpT0M843",
        displayName:"Miguel"
    },
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

describe('tests on SideBar component', () => {

    beforeEach(()=> {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <SideBar/>
            </MemoryRouter>
        </Provider>
        );
    test('should render properly', () => {
      
        expect(wrapper).toMatchSnapshot();
    });

    test('should call logout', () => {
      
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });
    
    test('should call startNewNote', () => {
      
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    });
    
})