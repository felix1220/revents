import React from "react";
import SignUpForm from "./SignUpForm";
import LogInMember from './LogInMember';
import './SignIn.styles.css';

export default function SignIn() {
   
    return (
        <div className='authentication-container' style={{backgroundColor:'white' }}>
            <LogInMember />
            <SignUpForm />
        </div>
    )
}