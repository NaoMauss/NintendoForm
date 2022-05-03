import React, { useEffect, useState, useRef } from 'react';
import Message from '../components/Message';
import questions from '../datas/forms';
import { auth, setData } from '../scripts/firebase';
import { useNavigate } from 'react-router-dom';


const shuffle = (arr) => {
    return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)    
}

const occur = (arr) => {
    return arr.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
}

const Form = () => {

    let n = useNavigate()

    let initial = [];
    for (let i = 0; i < questions.length; i++) {
        initial.push("vide")
    }
    const [resp, setResp] = useState(initial);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const [messages, setMessages] = useState([
        {text:questions[currentQuestion].title, displayName:'Bot', uid:null, createdAt:Date.now()}
    ]);

    const dummy = useRef();
    
    const goNext = async ({text, who}, index) => {
        if (resp[initial]) return
        let newResp = resp
        newResp[currentQuestion] = who

        sendMessage(text, auth.currentUser.displayName, auth.currentUser.uid)
        setResp(newResp)
        if (currentQuestion === questions.length-1) {
            // On envoie les données => setData
            let perc = occur(newResp)
            for (let p in perc) {
                perc[p] = Math.floor((perc[p] / 7) * 100)
            }
            await setData({...perc, valid:true})

            // On renvoie vers le profil
            window.location = '/'
            return
        }

        setCurrentQuestion(currentQuestion+1)
        sendMessage(questions[currentQuestion+1].title, 'Bot', null)
    }
    
    const sendMessage = (text, displayName, uid) => {
        let newMessages = messages
        newMessages.push({text, displayName, uid, createdAt:Date.now()})
        setMessages(newMessages)
    }

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        return () => {
        };
    }, [currentQuestion, messages]);

    return (
        <div className='chatroom'>
            <div className="messages">
                {messages.map((mess, i) => <Message {...mess} key={i} />)}
                <div className='dummy' ref={dummy}></div>
            </div>
            <div className='propos'>
                {/* <div className="question"> {questions[currentQuestion].title} </div> */}
                {shuffle(questions[currentQuestion].propos).map((pro, i) => {
                    return (<button key={i} onClick={() => goNext(pro)}>
                        {pro.text}
                    </button>)
                })}
            </div>
        </div>
    );
};

export default Form;