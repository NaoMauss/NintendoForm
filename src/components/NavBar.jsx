import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../scripts/firebase';

const NavBar = () => {
    return (
        <div className='navbar'>
            {auth.currentUser ? 

            <div className="part left">
                <a href="/">Profil</a>
            </div>
            :
            null
            }
            <div className="mille">
                N
            </div>
            <div className="part right">
                {auth.currentUser ? 
                <>
                <NavLink to='/ChatRoom'>ChatRoom</NavLink>
                </>
                :    
                <NavLink to='/Login'>Login</NavLink>
                }
            </div>
        </div>
    );
};

export default NavBar;