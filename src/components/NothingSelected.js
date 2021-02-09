import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <p>
                <span>Select something or create an entry</span> 
                <br />
                <Icon className="mt-1" icon={faStar} size={'3x'}/>
            </p>

            
        </div>
    )
}

export default NothingSelected
