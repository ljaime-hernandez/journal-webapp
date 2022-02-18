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

        // we both assign the new note as active on our notesReducer and set it
        // ready on the notesScreen component for us to input the information
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

        // to save the note we retrieve the uid from the actual state on the
        // user store, as some users will forget or wont include a picture
        // on the note, then we make a small condition eliminating the
        // url value from the note
        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }

        // we declare the new note saving on a new variable, then proceeding for us to
        // delete the id, this is done so we reuse the previous note id to update it as
        // the note exists
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        // we make the request to the firebase db using the users uid, the note id and updating
        // all the items on its document with the update method
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        // the refresh note will trigger an update on all the existing notes so they are
        // arranged accordingly and they also display the appropriate information on the screen,
        // afterwards sending us a screen popup with Swal to confirm the note was succesfully saved
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
        
        // the fileUploading action can be called only on an active note, either it is
        // a new note or an existing one, so we use the getState method to retrieve
        // the active note information from the store
        const {active:activeNote} = getState().notes;

        // a quick pop up will show using Swal with a loading spinner, while the
        // file is being uploaded using the fileUpload helper which will return the URL
        // where the file is uploaded, followed we call the startSaveNote action which
        // will save the whole note to our firebase collection and finally the
        // pop up will close after the process is done
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

        // similar to our previous actions, we use the getState method to retrieve the
        // user uid, then we use both the note id and the user uid to access to its
        // collection in firebase and trigger the delete method, deleting the document
        // stored on it
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