import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileUploading, startSaveNote } from '../../actions/notes';

export const NoteAppBar = () => {

  const dispatch = useDispatch();
  const {active} = useSelector(state => state.notes);

  const handleSave = () => {
    
    dispatch(startSaveNote(active))
  }

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if(file) {
      dispatch(fileUploading(file));
    }
  }

  return (
    <div className="notes__appbar">
        <span>Sept 19 1992</span>

        <input
          id="fileSelector"
          type="file"
          name="file"
          style={{display: 'none'}}
          onChange={handleFileChange}
        />

        <div>
            <button 
              className="btn"
              onClick={handlePictureUpload}
            >
                Picture    
            </button>
            
            <button 
              className="btn"
              onClick={handleSave}   
            >
                Save    
            </button>
        </div>
    </div>
  )
};
