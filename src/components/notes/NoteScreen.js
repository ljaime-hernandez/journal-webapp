import React from 'react';
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">

        <NoteAppBar/>

        <div className="notes__content">

        <input
            type="text"
            placeholder="Title of your journal"
            className="notes__title-input"
            autoComplete="off"
        />
        
        <textarea
            placeholder="What happened today?"
            className="notes__textarea"
        >   
        </textarea>

        <div className="notes__image">

        <img
            src="https://media.istockphoto.com/photos/panorama-of-the-foggy-winter-mountains-picture-id455011625?k=20&m=455011625&s=612x612&w=0&h=jkwMCTarHeDUvp3P1sD0dZ8hUrLMrDX3ICbBqP_E4FY="
            alt="landscape"
        />
        </div>

        </div>
    </div>
  )
};
