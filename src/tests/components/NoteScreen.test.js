import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { NoteScreen } from "../../components/notes/NoteScreen";
import { activeNote } from "../../actions/notes";

jest.mock('../../actions/notes', () => ({
    activeNote: jest.fn()
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
            id: 'ABCDE',
            title: 'Test Title',
            body: 'Test Body',
            date: 0
        }
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('tests on NoteScreen component', () => {

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <NoteScreen/>
            </MemoryRouter>
        </Provider>
        );

    test('should render properly', () => {
      
        expect(wrapper).toMatchSnapshot();
    });

    test('should launch the active note', () => {
      
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Title 2'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            "ABCDE",
            {
                id: 'ABCDE',
                title: 'Title 2',
                body: 'Test Body',
                date: 0
            }
        );
    });
})