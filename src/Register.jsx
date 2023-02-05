import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const registered = {
            name: name,
            email: email,
            password: pass,
            passwordConfirm: passConfirm
        }

        axios.post('http://127.0.0.1:5000/api/v1/users/signup', registered)
        .then(response => console.log(response.data)).then(props.onFormSwitch('login'));
        
        

        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="passwordConfirm">confirm password</label>
            <input value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} type="password" placeholder="********" id="passwordConfirm" name="passwordConfirm" />
            <button type="submit">Sign Up</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
