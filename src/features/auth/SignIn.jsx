import React, { useContext } from "react";
import SignUpForm from "./SignUpForm";
import LogInMember from './LogInMember';
import { UserContext } from "../../contexts/user.context";
import { NavLink, useNavigate } from 'react-router-dom'
import { redirect } from "react-router-dom";
import './SignIn.styles.css';

export default function SignIn() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    if(currentUser) {
        // redirect("/events");
        navigate("/events");
    }
    return (
        <div className='authentication-container' style={{backgroundColor:'white' }}>
            <LogInMember />
            <SignUpForm />
        </div>
    )
}