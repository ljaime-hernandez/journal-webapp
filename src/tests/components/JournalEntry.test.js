import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { JournalEntry } from "../../components/journal/JournalEntry";
import { activeNote } from "../../actions/notes";

/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'JournalEntry.test.js'
*/

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
    id: 23553,
    date: 10,
    title: 'Test Title',
    body: 'Test Body',
    url: 'https://something.com'
}

describe('tests on JournalEntry component', () => {

    // the journalEntry component should receive all the information in the
    // note object, the note ID will then be used as a reference whenever the
    // entry is clicked, for it to launch further actions in the store and the 
    // active note components
    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...note}/>
        </Provider>
    )

    test('should render properly', () => {
       
        expect(wrapper).toMatchSnapshot();
    });

    test('should activate note', () => {
      
        // the div containing the journal__entry class has a click property,
        // which should call the activeNote action and dispatch it to the store,
        // the dispatch does not need to be tested but we need to confirm it was called
        // appropriately with the respective information
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );
    });
})