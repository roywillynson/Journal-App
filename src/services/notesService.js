import { db } from '../firebase'

export const getNotes = async ( uid ) => {
    const notes = []
    
    try {
        const queryNotesSnap = await db.collection(`${uid}/journal/notes`).orderBy('date','desc').get();

        queryNotesSnap.forEach( ( noteSnap ) => {

            const note = {
                id: noteSnap.id, 
                ...noteSnap.data()
            }

            notes.push( note )
        });

    } catch (error) {
        console.log(error)        
    }

    return notes
}