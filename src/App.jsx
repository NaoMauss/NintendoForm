import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Results from './pages/Results';
import ChatRoom from './pages/ChatRoom';
import Form from './pages/Form';
import { auth, getUserData } from './scripts/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import Profil from './pages/Profil';

function App() {
    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState(null);

    const toFormOrChatRoom = (userData ? <ChatRoom/> : <Form/> )
    const toChatRoom = (user ? toFormOrChatRoom : <Navigate to="/Login"/>)

    const toProfil = (user ? <Profil userData={userData} /> : <Navigate to="/Login"/>)

    useEffect(() => {
        getData()
        return () => {
            
        };
    }, [user]);
    const getData = async () => {
        if (user) {
            const [hasData, data] = await getUserData()
            setUserData(hasData ? data : null)
        }
    }

    console.log(user)

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={toProfil} />
                    <Route path='/Login' element={(!user ? <Login/> : <Navigate to="/"/>)} />
                    <Route path='/Resultats' element={<Results/>} />
                    <Route path='/ChatRoom' element={toChatRoom} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
