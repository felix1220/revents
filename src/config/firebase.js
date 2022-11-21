import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/storage';

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

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
    {
        prompt: "select_account"
    }
)
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export default firebase;