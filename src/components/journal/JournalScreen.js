import React from 'react';
import { NoteScreen } from '../notes/NoteScreen';
// import { EmptySelect } from './EmptySelect';
import { SideBar } from './SideBar';

export const JournalScreen = () => {
  return (
    <div className="journal__main-content"> 

        <SideBar/>

        <main>
            
            {/*<EmptySelect/>*/}
            <NoteScreen/>

        </main>

    </div>
  )
};
