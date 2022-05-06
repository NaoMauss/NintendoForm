import React from 'react';
import { auth, firestore } from '../scripts/firebase';

const Gif = (props) => {

    const {content_description, media, setGifVisible} = props;

    const sendGif = async (e) => {
        e.preventDefault()
        const { uid, photoURL, displayName } = auth.currentUser
        const messageRef = firestore.collection('messages')
        
        await messageRef.add({
            type:'gif',
            gif: media[0].gif.url,
            createdAt: Date.now(),
            uid,
            photoURL,
            displayName
        })
        
        setGifVisible(false)
    }

    const FavGif = [
        {
            content_description, media
        }
    ]

    return (
        <button onClick={sendGif} className='gif'>
            <div className="preview">
                <img src={media[0].gif.preview} alt="gif" />
            </div>
            <div className="real">
                <img src={media[0].gif.url} alt="gif" />
            </div>
            
            <div className="title"> {content_description} </div>
        </button>
    );
};

export default Gif;