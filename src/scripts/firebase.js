import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { setDoc } from 'firebase/firestore';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { deleteDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const firebaseConfig = {
    apiKey: "AIzaSyCexX4P9O_MBBuBBZJeQkkMh2-geXOcZr8",
    authDomain: "nintenwho.firebaseapp.com",
    projectId: "nintenwho",
    storageBucket: "nintenwho.appspot.com",
    messagingSenderId: "428499765307",
    appId: "1:428499765307:web:ebe273fb2d9fac20c5341e"
};
// Changer les infos ici

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export const SignOut = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}> <FontAwesomeIcon icon={faArrowRightFromBracket} /> </button>
    )
}

export const deleteAllInCollection = async (path) => {
    const snap = await firestore.collection(path).get()
    snap.docs.map(doc => {
        doc.ref.delete()
    })
}

export const deleteUserDocument = async () => {
    return new Promise(async (resolve) => {
        const res = await firestore.collection('userInfo').doc(auth.currentUser.uid).delete();
        console.log("c'est supprimé")
        resolve()
    })
}

export const getTime = () => {
    return firebase.firestore.Timestamp.now().toDate();
};

export const getUserData = () => {
    return new Promise((resolve, reject) => {
        const userData = firestore.collection('userInfo');
        userData.doc(auth.currentUser.uid).get().then(data => {
            try {
                if (Object.keys(data.data()).length === 0) throw 'error';
                if (!data.data().valid) throw 'error';
                // Vérifier si il y a bien une donnée particulière
                resolve([true, data.data()])
            } catch {
                resolve([false, null]);
            }
        })
    })
}

export const setData = (datas) => {
    return new Promise(async (resolve) => {

        const userInfoRef = firestore.collection('userInfo');
        const userRef = userInfoRef.doc(auth.currentUser.uid);
        setDoc(userRef, datas, {merge: true})
        setTimeout(() => {
            resolve()
        }, 1000);
    })

}