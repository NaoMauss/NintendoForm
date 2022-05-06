import { faSearch, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Gif from './Gif';

const GifSearcher = (props) => {
    const {gifVisible, setGifVisible} = props
    const [gifs, setGifs] = useState({results:[], type:''});
    const [inputValue, setInputValue] = useState('');
    const [allGifSaved, setAllGifSaved] = useState([]);


    const getData = async (e) => {
        e.preventDefault()
        let apikey = "OZ6PQN598POS"
        let lmt = 10
        let url = "https://g.tenor.com/v1/search?q=" + inputValue + "&key=" + apikey + "&limit=" + lmt;
        let response = await fetch(url)

        let res = await response.json()
        console.log('gifs', res)
        setGifs(res)
    }
    
    
    const preSetGif = (e) => {
        e.preventDefault()
        setGifVisible(false)
    }
    
    useEffect(() => {
        // On recup le local storage et on le stock dans un state
        let allFavGif = localStorage.getItem("AllFavGif")
        if (allFavGif) {
            console.log("useeffect", allFavGif)
            setAllGifSaved(JSON.parse(allFavGif))
            console.log("allgiftsaved", allGifSaved)
        } else {
            localStorage.setItem("AllFavGif", JSON.stringify([]))
        }
    }, []);

    const updateAllGifSaved = (newGif) => {
        // On modifie le local storage
        // On ajoute le  newGif a notre state
        let newAllGifSaved = [...allGifSaved]
        console.log("debug 46", newAllGifSaved, typeof newAllGifSaved)
        console.log("debug 47", allGifSaved, typeof allGifSaved)
        let include = false
        let pass = []
        for (let g of newAllGifSaved) {
            if (newGif.content_description === g.content_description) {
                console.log('remove')
                include = true
            } else {
                pass.push(g)
            }
        }
        if (!include) {
            pass.push(newGif)
            console.log('add')
        }
        localStorage.setItem("AllFavGif", JSON.stringify(pass))
        if (gifs.type === "fav") setGifs({results:pass, type:'fav'});
        setAllGifSaved(pass)
    }

    const getFavs = () => {
        // On stocke allGifSaved dans gifs
        setGifs({results:allGifSaved, type:'fav'})
        // pq => On affiche gifs à l'écran, et on a les favs dans allGifSaved
    }

    return (
        <div className={"gif-enca " + gifVisible}>
            <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e) => setInputValue(e.target.value)} className='bar' placeholder='Quelque chose de drôle...' type="text" />
                <button className='close' onClick={getData}> <FontAwesomeIcon icon={faSearch}/> </button>
                <button className='close' onClick={getFavs}> <FontAwesomeIcon icon={faStar}/> </button>
                <button className='close' onClick={preSetGif}> <FontAwesomeIcon icon={faXmark}/> </button>
            </form>
            <div className="results">
                {!gifs.results.length ? <div className="empty"> Il faut chercher quelque chose ! 🧐 </div> : gifs.results.map((g, index) => <Gif allGifSaved={allGifSaved} updateAllGifSaved={updateAllGifSaved} setGifVisible={setGifVisible} key={index} {...g} /> )}
            </div>
        </div>
    );
};

export default GifSearcher;