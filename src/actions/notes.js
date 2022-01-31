import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async(dispatch, getState) => {

        // retrieves the user id from the store
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        // asynchronous function pushing a new note into the users journal
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id, newNote));
    }
}

// sets the note into an active state, used in the NoteScreen component
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
})

// uses the loadNotes helper to retrieve an array of notes from the 
// users collection for it to be rendered on the sidebar
export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    } 
}

// sends an array of notes to the notesReducer for them to be loaded
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})
