import React from 'react';
import { useSelector } from 'react-redux';
import NothingSelected from '../../components/NothingSelected';
import Sidebar from '../../components/Sidebar';
import NoteView from '../notes/NoteView';

const JournalView = () => {

    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <Sidebar />

            <main>
            
                {
                    active ? (
                        <NoteView />
                    ) : (
                        <NothingSelected />
                    )
                } 
                
            </main>
            
        </div>
    )
};

export default JournalView;
