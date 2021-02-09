import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startToUploadImage } from '../actions/notes';
import { getDateExtend } from '../helpers/date';

const NotesAppBar = () => {
    
    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes)

    const handleSaveNote = () => {
        dispatch( startSaveNote( note ) )
    }

    const handlePictureClick = () => {
        document.getElementById('file-image').click();
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0]

        if( file ) {
            dispatch( startToUploadImage( file ) )
        }
    }

    return (
        <div className="notes__appbar">
            <span>{getDateExtend(note.date)}</span>

            <input 
                id="file-image" 
                name="file" 
                type="file" 
                style={{ display: 'none' }}
                onChange={ handleFileChange } 
            />

            <div>
                <button className="button" onClick={ handlePictureClick }>
                    Picture
                </button>

                <button className="button" onClick={ handleSaveNote }>
                    Save
                </button>

            </div>
            
        </div>
    )
}

export default NotesAppBar
