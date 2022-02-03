import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // uses the information on the store for us to
    // render the existent notes in the users account on 
    // the sidebar, if not, the sidebar will still have a 
    // new entry button for the user to create it.
    const {notes} = useSelector( state => state.notes );

  return (
    <div className="journal__entries animate__animated animate__fadeInLeft">

        {
            notes.map(note => (
                <JournalEntry
                    key={note.id}
                    {...note}
                />
            ))
        }
    </div>
  )
};
