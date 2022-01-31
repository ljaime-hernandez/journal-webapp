import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id, ...note}) => {

    const dispatch = useDispatch();
    // variable taking the date information which will allow us to 
    // render the information of the date accordingly.
    const {date, title, url, body} = note;
    const noteDate = moment(date);

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
            <span>{noteDate.format('dddd')}</span>
            <span>{noteDate.format('Do')}</span>
        </div>
    </div>
  )
};
