import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';
import { auth } from '../scripts/firebase';

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className="part left">
                <a href="/">HOME</a>
            </div>
            <div className="part right">
                {auth.currentUser ? 
                <>
                <NavLink to='/ChatRoom'>Message</NavLink>
                </>
                :    
                <NavLink to='/Login'>Login</NavLink>
                }
            </div>
        </div>
    );
};

export default NavBar;