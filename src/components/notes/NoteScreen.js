import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active:note} = useSelector( state => state.notes );
  const [values, handleInputChange, reset] = useForm(note);

  const activeId = useRef(note.id);

  // useEffect required when the active note changes in the NoteScreen,
  // we use the useRef to reference the actual note id, the effect will be 
  // then triggered once its changed, calling the reset method from our
  // custom useForm hook, the reset is meant to change all the values we display 
  // in the NoteScreen retrieved from the actual note object, which will then
  // rendered on the component, once the reset is done, the new reference will
  // the new note id, this will happen every time we click on a different
  // journal from our SideBar list
  useEffect(() => {

    if (note.id !== activeId.current){
      reset(note);
      activeId.current = note.id;
    }

  }, [note, reset]);
  

  useEffect(() => {

    dispatch(activeNote(values.id, {...values}));

  }, [values, dispatch]);

  const handleDelete = () => {
    dispatch(startDelete(note.id));
  }
  

  return (
    <div className="notes__main-content">

        <NoteAppBar/>

        <div className="notes__content">

        <input
            type="text"
            placeholder={ note.title ? note.title : 'Add a title' }
            className="notes__title-input"
            autoComplete="off"
            name="title"
            onChange={handleInputChange}
        />
        
        <textarea
            placeholder={ note.body ? note.body : 'Add your note' }
            className="notes__textarea"
            name="body"
            onChange={handleInputChange}
        >   
        </textarea>

        {
          (note.url) &&
          <div className="notes__image">

          <img
              src={note.url}
              alt="landscape"
          />
          </div>
        }

        </div>

        <button
          className='btn btn-danger'
          onClick={handleDelete}
        >
          Delete
        </button>
    </div>
  )
};
