/**
 * @jest-environment node
 */
import * as fs from 'fs';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fileUploading, startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
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
9. to have a clearer view of this single js test file, press p. then type the file name 'notes.test.js'
*/

// we need to make the fileUpload a mock as the logic behind it is tested in the helpers folder and
// it requires specific file parsing parameters
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

// the test requires a mockStore as the auth file requires dispatch actions onto our store,
// the mockstore should have a middleware which can be used for testing purposes
// as well 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// the mockstore should have an authorized user by default for this tests as the 
// actions tested belong to the private routes
let store = mockStore({
    auth: {
        uid: "Test id",
        name: "Test name"
    }
});

describe('tests on notes actions', () => {

    // the user and active note by defaut in this mock are set by default
    // before each function
    beforeEach(() => {
        store = mockStore({
            auth: {
                uid: "Test id",
                name: "Test name"
            },
            notes: {
                active: {
                    id: '4uYdvoDYCJ7BV6zbKVuB',
                    title: 'Hello',
                    body: 'World'
                }
            }
        })
    });

    test('should create a new note', async() => {
      
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        const {uid} = store.getState().auth;

        // once the startNewNote functions is used, the database creates it on the 
        // users collection and the note becomes active as well on the notes reducer
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // the second action dispatched shows the form on the webpage which will
        // allow us to save the information on the users collection
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // on this last 2 lines i retrieve the id of the note just created and
        // make a request to the firebase database for it to be deleted as soon as the
        // function is done, so we dont create redundant information
        const docId = actions[1].payload.id;
        await db.doc(`${uid}/journal/notes/${docId}`).delete();
    });

    test('should start loading notes', async() => {
      
        const {uid} = store.getState().auth;
        await store.dispatch(startLoadingNotes(uid));

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('should save note', async() => {
      
        const {uid} = store.getState().auth;
        const note = {
            id: '4uYdvoDYCJ7BV6zbKVuB',
            title: 'title',
            body: 'body',
        }

        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdate);

        const docRef = await db.doc(`${uid}/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    });

    test('should upload a file in the note', async() => {
      
        const {uid} = store.getState().auth;
        fileUpload.mockReturnValue('https://hello-world.com')
        fs.writeFileSync('picture.jpg', '')
        const file = fs.readFileSync('picture.jpg')
        await store.dispatch(fileUploading(file));
 
        const docRef = await db.doc(`/${uid}/journal/notes/4uYdvoDYCJ7BV6zbKVuB`).get()
        expect(docRef.data().url).toBe('https://hello-world.com')
    });
});