import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login'
import Renseignements from './pages/Renseignements'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'
import Results from './pages/Results';
import ChatRoom from './pages/ChatRoom';
import Form from './pages/Form';
import { auth, getUserData } from './scripts/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';


function App() {
    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState(null);

    const toFormOrChatRoom = (userData ? <ChatRoom/> : <Form/> )
    // true => est-ce que l'utilisateur a des données
    const toChatRoom = (user ? toFormOrChatRoom : <Navigate to="/Login"/>)

    useEffect(() => {
        getData()
        return () => {
            
        };
    }, [user]);
    const getData = async () => {
        if (user) {
            const [hasData, data] = await getUserData()
            console.log(hasData, data)
            setUserData(hasData ? data : null)
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<p>Coucou</p>} />
                    <Route path='/Login' element={(!user ? <Login/> : <Navigate to="/ChatRoom"/>)} />
                    <Route path='/Resultats' element={<Results/>} />
                    <Route path='/ChatRoom' element={toChatRoom} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
