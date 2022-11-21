import React from "react";
import { signInWithGooglePopup } from "../../config/firebase";

export default function SignIn() {
    const logGoogleUser = async() => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <div>
            <h1>Sign Up Form</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </div>
    )
}