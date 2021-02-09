import React from 'react'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { activeNote } from '../actions/notes';
import { useDispatch } from 'react-redux';
import { getDayString, getCardinalDay } from '../helpers/date';

const JournalEntry = ({ id, title, body, date, url }) => {

    const dispatch = useDispatch();

    const handleEntryActive = () => {

        const note = {
            title,
            body,
            date,
            url
        }

        dispatch( activeNote(id, note))
    }

    return (
        <div className="journal__entry is-clickable fade-in" onClick={ handleEntryActive }>

        
            <article className="journal__entry-picture is-64x64">
                {
                    url ? ( 
                        <img src={url} alt="Journal" /> 
                    ):(
                        <Icon icon={faImage} size="lg" />
                    )
                }
            </article>
            

            <div className="journal__entry-body">
                <h2 className="journal__entry-title is-capitalize mb-1">
                    { title }
                </h2>

                <p className="journal__entry-content is-capitalize">
                    {  
                        (body.length < 40) 
                            ? body : 
                            `${ body.slice( 0, 40 ) }...` 
                    } 
                </p>

            </div>

            <div className="journal__entry-date">
                <span className="journal__entry-date-month is-capitalize">{ getDayString(date) }</span>
                <span className="journal__entry-date-day">{ getCardinalDay(date) }</span>
            </div>
            
        </div>
    )
}

export default JournalEntry
