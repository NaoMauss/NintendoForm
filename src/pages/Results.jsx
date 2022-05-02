import React from 'react';
import { useLocation } from 'react-router-dom';


const Results = () => {

    const location = useLocation();

    const result = location.state ? location.state : []

    let pourcentages = {}

    for (let indiv of new Set([...result])) {
        pourcentages[indiv] = result.filter(ch => ch === indiv).length
    }
    console.log(pourcentages)

    return (
        <div>
            {Object.keys(pourcentages).map((pourcKey, index) => {
                return ( <p key={index}>Vous êtes à {pourcentages[pourcKey]}/7 {pourcKey}</p> )
            })}
            
            
        </div>
    );
};

export default Results;