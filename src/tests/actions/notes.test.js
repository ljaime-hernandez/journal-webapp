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

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore({
    auth: {
        uid: "Test id",
        name: "Test name"
    }
});

describe('tests on notes actions', () => {

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