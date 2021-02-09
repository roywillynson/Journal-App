import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMoon, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

import JournalEntries from './JournalEntries';
import { startLogout } from '../actions/auth';
import { startNewNote } from '../actions/notes';

const Sidebar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout =  ( ) => {
        dispatch( startLogout() )
    }

    const handleAddNewNote = ( ) => {
        dispatch( startNewNote() )
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <div className="mt-5">
                    <Icon icon={ faMoon } className="mr-1"/> 
                    <span>{ name }</span>
                    
                </div>

                <button 
                    className="button mt-2"
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div className="journal__new-entry mt-6 is-clickable" onClick={ handleAddNewNote }>
                <Icon icon={ faCalendarPlus } size="5x" />
                <p className="mt-5">New Entry</p>
            </div>


            <JournalEntries />

        </aside>
    )
}

export default Sidebar
