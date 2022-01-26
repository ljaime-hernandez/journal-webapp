import React from 'react';
import { SideBar } from './SideBar';

export const JournalScreen = () => {
  return (
    <div className="journal__main-content"> 
        <SideBar/>

        <main>
            <h1>Main content</h1>
        </main>
    </div>)
};
