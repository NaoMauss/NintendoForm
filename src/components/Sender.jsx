import { faFilm, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { auth, firestore } from '../scripts/firebase';
import GifSearcher from './GifSearcher';
import {getTime, deleteAllInCollection} from '../scripts/firebase'


const Sender = () => {

    const [inputValue, setInputValue] = useState('');
    const [gifVisible, setGifVisible] = useState(false);
    const input = useRef()
    
    const { uid, photoURL, displayName } = auth.currentUser
    const sendMessage = async (e) => {
        e.preventDefault()
        
        if (!inputValue) {
            return
        }

        let mess = inputValue
        input.current.value = ''
        const messageRef = firestore.collection('messages')
        
        
        await messageRef.add({
            text: mess,
            // createdAt: getTime(),
            createdAt: Date.now(),
            uid,
            photoURL,
            displayName
        })
        
        setInputValue('')
    }

    
    const preSetGif = (e) => {
        e.preventDefault()
        setGifVisible(true)
    }

    return (
        <>
            <GifSearcher gifVisible={gifVisible} setGifVisible={setGifVisible} />
            {/* <div className="user"> Envoyer en tant que {displayName} </div> */}
            <form className='sender' onSubmit={inputValue ? sendMessage : void 0}>
                <input placeholder='Envoyer un message...' ref={input} type="text" onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={sendMessage} className='send'> <FontAwesomeIcon icon={faPlay} /> </button>
                <button onClick={preSetGif} className='gif'> <FontAwesomeIcon icon={faFilm} /> </button>
                {/* <button onClick={(e) => {e.preventDefault();deleteAllInCollection('messages')}} className='gif'> <FontAwesomeIcon icon={faFilm} /> E </button> */}
            </form>
        </>
    );
};

export default Sender;