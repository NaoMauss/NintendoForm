import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Gif from './Gif';

const GifSearcher = (props) => {
    const {gifVisible, setGifVisible} = props
    const [gifs, setGifs] = useState({results:[]});
    const [inputValue, setInputValue] = useState('');

    const getData = async (e) => {
        e.preventDefault()
        let apikey = "OZ6PQN598POS"
        let lmt = 10
        let url = "https://g.tenor.com/v1/search?q=" + inputValue + "&key=" + apikey + "&limit=" + lmt;
        let response = await fetch(url)

        let res = await response.json()

        setGifs(res)
    }
    
    
    const preSetGif = (e) => {
        e.preventDefault()
        setGifVisible(false)
    }

    return (
        <div className={"gif-enca " + gifVisible}>
            <form className="searchbar" onSubmit={getData}>
                <input onChange={(e) => setInputValue(e.target.value)} className='bar' placeholder='Quelque chose de drôle...' type="text" />
                <button className='close' onClick={getData}> <FontAwesomeIcon icon={faSearch}/> </button>
                <button className='close' onClick={preSetGif}> <FontAwesomeIcon icon={faXmark}/> </button>
            </form>
            <div className="results">
                {gifs.results.map(g => <Gif setGifVisible={setGifVisible} key={g.id} {...g} /> )}
                {!gifs.results.length ? <div className="empty"> Il faut chercher quelque chose ! 🧐 </div> : null}
            </div>
        </div>
    );
};

export default GifSearcher;