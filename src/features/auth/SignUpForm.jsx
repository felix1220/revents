import React from "react";
import { useState } from "react";
import { createAuthUserWithEmailPassword, createUserDocumentFromAuth } from '../../config/firebase';
import { FormInput } from '../formInput/FormInput';
import { Button } from "../../layout/Button";
import './SignUpForm.styles.css';

const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            return;
        }
        try {
           const { user } = await createAuthUserWithEmailPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        }catch(e) {
            if(e.code === 'auth/email-already-in-use'){
                alert('Email already in use!');
            }
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>

                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;