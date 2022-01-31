import { db } from "../firebase/firebaseConfig"

// asynchronous function fetching information from the users journal
// which will be then assigned an id and pushed into a notes array, 
// for it to be dispatched to the store with the notesReducer
export const loadNotes = async (uid) => {

   const notesSnap = await db.collection(`${uid}/journal/notes`).get();
   const notes = [];

   notesSnap.forEach(snap => {
        notes.push({
            id: snap.id,
            ...snap.data()
        })
   });
 
   return notes;
}