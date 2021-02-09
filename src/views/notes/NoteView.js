import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import NotesAppBar from '../../components/NotesAppBar';
import useForm from '../../hooks/useForm';

const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm( note )
    const { body, title, id } = formValues

    const activeId = useRef( note.id )

    useEffect(() => {
        
        if(note.id !== activeId.current) {
            reset( note )
            activeId.current = note.id
        }
        
    }, [note, reset])

    useEffect(() => {

        dispatch( activeNote(formValues.id, {...formValues}))

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(id) )
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text" 
                    name="title"
                    autoFocus={true}
                    value={ title }
                    onChange={ handleInputChange }
                    placeholder="Some awesome title" 
                    className="notes__title-input" 
                    autoComplete="off"
                />

                <textarea 
                    name="body" 
                    id="description" 
                    value={ body }
                    onChange={ handleInputChange }
                    placeholder="What happened today?"
                    className="notes__textarea"
                    cols="30" 
                    rows="10"
                ></textarea>

                {
                    note.url && 
                    (
                        <div className="notes__image">
                            <img src={ note.url } alt="imagen" />
                        </div>
                    )
                }

                <button className="button is-danger" onClick={handleDelete}>
                    Delete
                </button>

            </div>
        </div>
    )
};

export default NoteView;
