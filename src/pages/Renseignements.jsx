import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Renseignements.scss';


const Renseignements = () => {

    const navigate = useNavigate()

    let questions = [
        {
            title:"Ton être aimé s'est fait kidnapper, que fais-tu ?",
            propos: [
                {text:'Il n’y a que les bananes dans ma vie', who:"DK"},
                {text:"J’aspire celui qui a fait ça", who:"Kirby"},
                {text:"Je vais traverser des mondes entiers pour le retrouver", who:"Mario"},
                {text:"Je lui montre mes animaux de compagnie", who:"Sasha"}
            ]
        },
        {
            title:"Que détestes-tu ?",
            propos: [
                {text:"Les tortues", who:"Mario"},
                {text:"Les crocodiles", who:"Kirby"},
                {text:"Le roi", who:"DK"},
                {text:"La Team des terroRistes", who:"Sasha"},
            ]
        },
        {
            title:"Quel est ton métier ?",
            propos: [
                {text:"Plombier", who:"Mario"},
                {text:"Enfant", who:"Sasha"},
                {text:"Mangeur de bananes", who:"DK"},
                {text:"Bouffeur de tout", who:"Kirby"},
            ]
        },
        {
            title:"Pour midi, tu manges ?",
            propos: [
                {text:"Je me répète mais des bananes sans hésiter", who:"DK"},
                {text:"Des ptits champis", who:"Mario"},
                {text:"Tout ce qui passe", who:"Kirby"},
                {text:"Mes animaux", who:"Sasha"},
            ]
        },
        {
            title:"Qui aimes-tu ?",
            propos: [
                {text:"Mes animaux", who:"Sasha"},
                {text:"Ma princesse / Mon prince", who:"Mario"},
                {text:"Mes tonneaux", who:"DK"},
                {text:"Le mec mystérieux avec une épée", who:"Kirby"},
            ]
        },
        {
            title:"Quelle est ta principale qualité ?",
            propos: [
                {text:"Ma bouche", who:"Kirby"},
                {text:"Mes bras", who:"DK"},
                {text:"Ma tête", who:"Mario"},
                {text:"Mes animaux", who:"Sasha"},
            ]
        },
        {
            title:"Quel est ton pire défaut ?",
            propos: [
                {text:"Mon amour pour les combats illégaux d’animaux en captivité", who:"Sasha"},
                {text:"Ma folie meurtrière, je tue ce que j’avale", who:"Kirby"},
                {text:"Ma folie meurtrière, je saute sur les gens pour les tuer de manière “accidentelle”", who:"Mario"},
                {text:"Ma folie, j’envoie mes neveux et nièces se battre à ma place", who:"DK"},
            ]
        }
    ]
    
    let initial = [];
    for (let i = 0; i < questions.length; i++) {
        initial.push("vide")
    }
    const [choices, setChoices] = useState(initial);

    const superSetChoices = (index, ch) => {
        let oldChoices = choices
        oldChoices[index] = ch
        setChoices(oldChoices)
    }
    
    const shuffle = (arr) => {
        return arr.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
    }

    const goToResult = (e) => {
        e.preventDefault()
        if (choices.includes('vide')) return;

        navigate('/Resultats', {state:choices})
    }

    useEffect(() => {
        return () => {
            
        };
    }, []);

    return (
        <div className="page renseignements">
            <form onSubmit={goToResult}>
                {questions.map((question, index) => {
                    return (
                        <div key={index}>
                        <h1> {question.title} </h1>
                            <div className="choices">

                            {shuffle(question.propos).map((propo, index2) => {
                                // console.log(propo)
                                return (
                                    <div className='choice' key={index2}>
                                        <input type="radio" name={"Choix"+index} id={"Choix"+index+index2} onChange={() => superSetChoices(index, propo.who)} required />
                                        <label htmlFor={"Choix"+index+index2}> {propo.text} </label>
                                    </div>

                                )
                            })}
                            </div>
                        </div>
                    )
                })}
                <input type="submit" value="J'ai terminé" />
            </form>
        </div>
    );
};

export default Renseignements;