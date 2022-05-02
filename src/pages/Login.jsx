import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithGoogle } from '../scripts/firebase';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    return (
        <div className="page login">
            <h1>Connectez vous pour savoir quel champion de l'univers Nintendo vous êtes</h1>
            <button onClick={signInWithGoogle}> <FontAwesomeIcon icon={faArrowRightToBracket}/> <FontAwesomeIcon icon={faGoogle}/> </button>

        </div>
    );
};

export default Login;