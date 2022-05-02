import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { auth } from '../scripts/firebase';

const Message = (props) => {
    
    const {text, createdAt, uid, photoURL, displayName, deleteDoc, prevAuthor, type, gif} = props

    const timestamp = new Date(createdAt);
    let hours = timestamp.getHours() + "";
    hours = hours.length === 2 ? hours : "0" + hours;
    let minutes = timestamp.getMinutes() + "";
    minutes = minutes.length === 2 ? minutes : "0" + minutes;

    return (
        <div className={'message ' + (auth.currentUser.uid === uid ? 'mine' : '') + (!uid ? 'bot' : '')}>
            <div className="enca">
                { prevAuthor !== uid ?
                <div className="username"> <div className="dyn"> {displayName} </div> </div>
                :
                null
                }
                <div className="msg">
                    <div className="date"> <div className="time">{hours + ":" + minutes} </div> </div>
                    {type !== 'gif' ? <div className="text"> {text} </div> : <img src={gif} alt="" /> }
                </div>
            </div>
            { uid === auth.currentUser.uid && <button className='delete' onClick={deleteDoc}> <FontAwesomeIcon icon={faXmark}/> </button> }
        </div>
    );
};

export default Message;