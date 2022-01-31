import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {

  const {active:note} = useSelector( state => state.notes );
  const [values, handleInputChange] = useForm(note);

  console.log(values, handleInputChange);

  return (
    <div className="notes__main-content">

        <NoteAppBar/>

        <div className="notes__content">

        <input
            type="text"
            placeholder={values.title}
            className="notes__title-input"
            autoComplete="off"
            onChange={handleInputChange}
        />
        
        <textarea
            placeholder={values.body}
            className="notes__textarea"
            onChange={handleInputChange}
        >   
        </textarea>

        {
          (values.url) &&
          <div className="notes__image">

          <img
              src="https://media.istockphoto.com/photos/panorama-of-the-foggy-winter-mountains-picture-id455011625?k=20&m=455011625&s=612x612&w=0&h=jkwMCTarHeDUvp3P1sD0dZ8hUrLMrDX3ICbBqP_E4FY="
              alt="landscape"
          />
          </div>
        }

        </div>
    </div>
  )
};
