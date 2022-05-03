import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import { auth, SignOut, deleteUserDocument } from '../scripts/firebase';
import { useNavigate, NavLink } from 'react-router-dom';

const Profil = (props) => {
    const {userData} = props
    const [user] = useAuthState(auth)
    
    const n = useNavigate();

    const suppresData = async () => {
        await deleteUserDocument()
        window.location = "/ChatRoom"
    }
    return (
        <div className='datas'>
            <div className='infos'>
                {user?.displayName} <SignOut/>
            </div>
            {userData && Object.keys(userData).map((val, i) => {
                if (val === 'valid') return;
                return ( <div key={i} className='perso'>
                    <div className={val + ' img'}></div> <div className='perc'> {userData[val]}% </div>
                </div> )
            })}
            {userData ? 
            <button onClick={suppresData}>Supprimer les données</button>
            :
            <NavLink to='/ChatRoom'>Faire le questionnaire</NavLink>
            }
        </div>
    );
};

export default Profil;