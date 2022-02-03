import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { EmptySelect } from './EmptySelect';
import { SideBar } from './SideBar';

// the selector will retrieve the notes from the notesReducer
// and will verify if any of them is in an active state, if the
// state is true then it will render the information in the
// noteScreen component, if not then the EmptySelect component
// will be rendered, prompting the user to either click on any entry
// on the sidebar, or to create a new journal
export const JournalScreen = () => {

  const {active} = useSelector( state => state.notes );
  return (
    <div 
      className="journal__main-content animate__animated animate__fadeIn"> 

        <SideBar/>

        <main>
            
            {
            
              (active)
                ? <NoteScreen/>
                : <EmptySelect/>
            }

        </main>

    </div>
  )
};
