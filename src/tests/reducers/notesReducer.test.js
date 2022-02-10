import { notesReducer } from '../../reducers/notesReducer';
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
9. to have a clearer view of this single js test file, press p. then type the file name 'notesReducer.test.js'
*/

describe('tests on notesReducer', () => {

    const initialState = {
        uid:"HTXx027Mr1U94zHwXIsXNpT0M843",
        displayName:"Miguel",
        notes: 
        [{
            id:"0efcoyBZ7SYIbAjzoQao",
            date:1643917476096,
            url:"https://res.cloudinary.com/dkns40h4i/image/upload/v1643917540/tnhe4cbuigpxglghhyk9.jpg",
            title:"Ramon Pic",
            body:"Ramon Note",
        },{
            id:"5vkj78dl4jfcwR6AOxaA",
            body:"",
            title:"",
            date:1644012783626,
        },{
            id:"5wmpD1SHujv9r5ASm6AJ",
            url:"https://res.cloudinary.com/dkns40h4i/image/upload/v1643928333/dachqyg6d344wl5l9her.jpg",
            body:"Beksinski pic",
            title:"Beksinski",
            date:1643928316969,
        },{
            id:"BXCuJeSEbrEa7Za0mI0Y",
            date:1643944564961,
            title:"Almost midnight",
            body:"New note to check CSS",
            url:"https://res.cloudinary.com/dkns40h4i/image/upload/v1643944608/bwmqsvdgbenh591kss8e.jpg",
        }],
        active: null}

    
    test('should return default values', () => {
      
        const state = notesReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('should return actual values and an active note', () => {
        
        const action = {
            type: types.notesActive,
            payload: initialState.notes[0]
        }

        const state = notesReducer(initialState, action);
        expect(state.active).toEqual(initialState.notes[0]);
    });

    test('should add a new note', () => {
      
        const uid = "23456785473";
        const newNote = {
            title: 'New note',
            body: 'New note',
            date: new Date().getTime()
        }

        const action = {
            type: types.notesAddNew,
            payload: {
                uid, 
                ...newNote
            }
        }

        const state = notesReducer(initialState, action);
        expect(state.notes[0]).toEqual({
            uid: "23456785473",
            title: 'New note',
            body: 'New note',
            date: newNote.date
        });
    });

    test('should load the notes', () => {

        const action = {
            type: types.notesLoad,
            payload: initialState.notes
        }

        const state = notesReducer(initialState, action);
        expect(state.notes).toEqual(initialState.notes);
    });
    
    test('should update a note', () => {

        const oldUid = "5vkj78dl4jfcwR6AOxaA";
        const newUid = "9876543";
        const updatedNote = {
            title: 'Updated note',
            body: 'Updated body',
            date: new Date().getTime(),
        }

        const action = {
            type: types.notesUpdate,
            payload: {
                oldUid,
                note: {
                    newUid,
                    ...updatedNote
                }
            }
        }

        const state = notesReducer(initialState, action);
        expect(state.notes[1]).toEqual(initialState.notes[1]);
    });
    
    test('should delete a note', () => {
      
        const oldUid = "5vkj78dl4jfcwR6AOxaA";
        const action = {
            type: types.notesDelete,
            payload: oldUid
        }

        const prevLength = initialState.notes.length;

        const state = notesReducer(initialState, action);
        expect(state.notes.length).toEqual(prevLength - 1);
    });

    test('should remove all notes', () => {
        
        const action = {
            type: types.notesLogoutClean
        };

        const state = notesReducer(initialState, action);
        expect(state.notes).toEqual([]);
    });
})
