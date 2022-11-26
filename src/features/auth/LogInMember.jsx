import React from "react";
import { useState, useContext } from "react";
import { createAuthUserWithEmailPassword, createUserDocumentFromAuth, 
    signInWithGooglePopup, signInAuthUserWithEmailPassword } from '../../config/firebase';
import { FormInput } from '../formInput/FormInput';
import { Button } from "../../layout/Button";
import { UserContext } from "../../contexts/user.context";
import './LogInMember.styles.css';


const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}

export default function LogInMember() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        
        try {
            const { user } = await signInAuthUserWithEmailPassword(email, password)
            setCurrentUser(user);
            resetFormFields();

        } catch(e) {
           if(e.code === 'auth/wrong-password') {
            alert('Incorrect password for this user')
           } else if(e.code === 'auth/user-not-found') {
             alert('User not found')
           }
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    const signInWithGoogleUser = async() => {
        const { user }= await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with Email and Password</span>
            <form onSubmit={handleSubmit}>

               

                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogleUser}>Sign In With Google</Button>
                </div>
                

            </form>
        </div>
    )
}