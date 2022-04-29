import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <div className='navbar'>
            
            <a href="/">HOME</a>
            <NavLink to='/Login'>Login</NavLink>
            <NavLink to='/Renseignement'>Renseignement</NavLink>
        </div>
    );
};

export default NavBar;