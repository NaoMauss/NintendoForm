import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { auth, firestore } from '../scripts/firebase';

const Gif = (props) => {

    const {content_description, media, setGifVisible, allGifSaved, updateAllGifSaved} = props;

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


    const [buttonState, SetbuttonState] = useState(false) 

    const FavGif = {media, content_description}
    

    return (

        <div>
        <button onClick={sendGif} className='gif'>
            <div className="preview">
                <img src={media[0].gif.preview} alt="gif" />
            </div>
            <div className="real">
                <img src={media[0].gif.url} alt="gif" />
            </div>
            
            <div className="title"> {content_description} </div>
            
        </button>
        <button className={'fav' + (allGifSaved.includes(FavGif) ? 'filled' : '')} onClick={() => updateAllGifSaved(FavGif)} value={buttonState}>
                <FontAwesomeIcon className='fav-ico' icon={faStar} />
            </button>
        </div>
        
    );
};

export default Gif;