import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id, ...note}) => {

    const dispatch = useDispatch();
    const {date, title, url, body} = note;

    // variable taking the date information by using the moment
    // library which will allow us to render the information of the 
    // date accordingly.
    const noteDate = moment(date);

    // clicking on an individual entry will launch a dispatch to the
    // notesReducer which will add the note into an active state,
    // launching the NoteScreen component which will render the note
    // information into it for us to be able to either read its content
    // properly or to modify it.
    const handleEntryClick = () => {
        dispatch(activeNote(id, {...note}))
    }

  return (
    <div 
        className="journal__entry pointer"
        onClick={handleEntryClick}        
    >
        {
            // if the user updated an image, this block of elements
            // will be rendered on our journal entries, if not, the
            // image block will be empty
            (url)
                &&   <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                    >
                    </div>      
        }
    
        <div className="journal__entry-body">
            <p className="journal__entry-title">
                {title}
            </p>
            <p className="journal__entry-content">
                {body}
            </p>
        </div>

        <div className="journal__entry-date-box">
            <span>{noteDate.format('MMMM')}</span>
            <span>{noteDate.format('dddd')}</span>
            <span>{noteDate.format('Do')}</span>
        </div>
    </div>
  )
};
