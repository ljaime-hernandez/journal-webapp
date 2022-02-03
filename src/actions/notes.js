import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
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
        dispatch(addNewNote(doc.id, newNote));
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

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
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

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    } 
}

export const refreshNote = (id, note) => ({

    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const fileUploading = (file) => {
    return async (dispatch, getState) => {
        
        const {active:activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading... please wait',
            text: 'Please wait...',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))

        Swal.close();
    }
}

export const startDelete = (id) => {
    return async(dispatch, getState) => {

        const uid =  getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => {
    
    return {
        type: types.notesLogoutClean
    }
}