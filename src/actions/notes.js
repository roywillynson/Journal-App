import Swal from 'sweetalert2';
import { db } from '../firebase';
import { fileUpload } from '../services/cloudinaryService';
import { getNotes } from '../services/notesService';
import types from '../types';



export const startNewNote = ( ) =>  {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth; // state

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const noteDocRef = await db.collection(`${ uid }/journal/notes`).add( newNote )

        dispatch( activeNote( noteDocRef.id, newNote ) );
        dispatch( startLoadingNotes( uid ) )
    } 
}

export const activeNote = ( id , note ) => ({ 
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await getNotes( uid )
        dispatch( setNotes( notes ) )

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth


        if(!note?.url){
            delete note.url
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id
    
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )

        dispatch( refreshNote( note.id, noteToFirestore ) )

        Swal.fire('Note Saved', 'This note was saved sucessfully!', 'success')
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note
    }

})


export const startToUploadImage = ( file ) => {

    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading Image...',
            text: 'Please, wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
        

    }

}


export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete()

        dispatch(deleteNote(id));
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
    
})

export const nodesLogout = () => ({
    type: types.notesLogoutCleanUp
})