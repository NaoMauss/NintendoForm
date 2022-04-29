import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login'
import Renseignements from './pages/Renseignements'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'
import Results from './pages/Results';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<p>Coucou</p>} />
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/Renseignement' element={<Renseignements/>} />
                    <Route path='/Resultats' element={<Results/>} />
                </Routes>
                <FooterBar/>
            </BrowserRouter>
        </div>
    );
}

export default App;
