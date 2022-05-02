import React, { useEffect, useState, useRef } from 'react';
import Message from '../components/Message';
import questions from '../datas/forms';
import { auth } from '../scripts/firebase';


const shuffle = (arr) => {
    return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)    
}

const Form = () => {

    let initial = [];
    for (let i = 0; i < questions.length; i++) {
        initial.push("vide")
    }
    const [resp, setResp] = useState(initial);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const [messages, setMessages] = useState([
        {text:questions[currentQuestion].title, displayName:'Bot', uid:null, createdAt:Date.now()}
    ]);

    const dummy = useRef()
    
    const goNext = ({text, who}, index) => {
        if (resp[initial]) return
        let newResp = resp
        newResp[currentQuestion] = who

        sendMessage(text, auth.currentUser.displayName, auth.currentUser.uid)
        setResp(newResp)
        console.log(resp)
        if (currentQuestion === questions.length-1) {
            
            // On envoie les données => setData
            
            // On renvoie vers le profil
            return
        }

        setCurrentQuestion(currentQuestion+1)
        sendMessage(questions[currentQuestion+1].title, 'Bot', null)
    }
    
    const sendMessage = (text, displayName, uid) => {
        let newMessages = messages
        newMessages.push({text, displayName, uid, createdAt:Date.now()})
        setMessages(newMessages)
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    // useEffect(() => {
    //     return () => {
    //     };
    // }, []);

    return (
        <div className='chatroom'>
            <div className="messages">
                {messages.map(mess => <Message {...mess} />)}
                <div ref={dummy}></div>
            </div>
            <div className='propos'>
                {/* <div className="question"> {questions[currentQuestion].title} </div> */}
                {shuffle(questions[currentQuestion].propos).map((pro) => {
                    return (<button onClick={() => goNext(pro)}>
                        {pro.text}
                    </button>)
                })}
            </div>
        </div>
    );
};

export default Form;