import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const SideBar = () => {

    // useSelector retrieves the auth object from the store to render it in the
    // sidebar
    const {name} = useSelector( state => state.auth );
    // dispatch will run all our functions to the store using the respective
    // reducer
    const dispatch = useDispatch();
    // the dispatch will use an action which will delete the users
    // information on the reducer
    const handleLogout = () => {
        dispatch(startLogout());
    }
    // the new note will connect to the firebase database, then to the
    // user collection and then will create a document with the respective
    // journal information
    const handleAddNew = () => {
        dispatch(startNewNote());
    }

  return (
    <aside className="journal__sidebar">
        
        <div className="journal__sidebar-navbar">
            <h3 className="mt-5">
                <i className="far fa-moon"/>
                <span>{name}</span>
            </h3>

            <button
                className="btn" 
                onClick={handleLogout}   
            >
                Logout
            </button>
        </div>

        <div
            className="journal__new-entry"    
            onClick={handleAddNew}
        >
            <i className="far fa-calendar-plus fa-5x"></i>
            <p className="mt-5"></p>
            <p>New Entry</p>
            
        </div>

        <JournalEntries/>
    </aside>
  )
};
