import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    auth: {
        uid: "Test id",
        name: "Test name"
    }
});

describe('tests on notes actions', () => {

    test('should create a new note', async() => {
      
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        const {uid} = store.getState().auth;

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[1].payload.id;
        await db.doc(`${uid}/journal/notes/${docId}`).delete();
    });
})