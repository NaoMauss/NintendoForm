import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../scripts/firebase'; 
import Message from '../components/Message';
import Sender from '../components/Sender';

const ChatRoom = () => {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt', 'desc').limit(25);

    const [messages, setMessages] = useState([]);

    
    
    const dummy = useRef()
    
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        return () => {
        };
    }, [messages]);

    useEffect(() => {
        const obs = query.onSnapshot(querySnapshot => {
            setMessages(querySnapshot.docs)
        })
        return () => {
        };
    }, []);

    let prevAuthor = 'default'

    let revMessage = []

    for (let m of messages) {
        revMessage.unshift(m)
    }

    return (
        <div className='chatroom'>
            <div className="messages">
                {messages && revMessage.map(doc => {
                    let msg = {...doc.data(), deleteDoc: () => doc.ref.delete(), prevAuthor:prevAuthor}
                    prevAuthor = msg?.uid
                    return (<Message key={msg.createdAt} {...msg} />)
                })}
                <div ref={dummy}></div>
            </div>
            <Sender />
        </div>
    );
};

export default ChatRoom;