import { initializeApp } from 'firebase/app';
import  {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithRedirect, signInWithPopup, 
    GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBVwsW2M8GNq2ujD_UIw_z9s8czhE8hKNU",
    authDomain: "heartstonelib-eed48.firebaseapp.com",
    databaseURL: "https://heartstonelib-eed48.firebaseio.com",
    projectId: "heartstonelib-eed48",
    storageBucket: "heartstonelib-eed48.appspot.com",
    messagingSenderId: "85042552113",
    appId: "1:85042552113:web:034be8f8c73c00b7",
    measurementId: "G-TD8NFHS66Y"
}

const firebaseApp = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);
//firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
    {
        prompt: "select_account"
    }
)
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
//export default firebase;
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(e) {
           console.log('User entry error =>', e)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailPassword = async(email, password) => {
    if(!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailPassword = async(email, password) => {
    if(!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth, email, password)
}