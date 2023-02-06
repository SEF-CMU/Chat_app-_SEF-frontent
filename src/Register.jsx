import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const registered = {
            name: name,
            email: email,
            phone: phone,
            password: pass,
            passwordConfirm: passConfirm
        }
        // connect to api
        axios.post('http://127.0.0.1:5000/api/v1/users/signup', registered)
        .then(response => console.log(response.data))
        
        

        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            {/* <label htmlFor="name">Full name</label> */}
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Name" />
            {/* <label htmlFor="email">email</label> */}
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Email" id="email" name="email" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)}type="text" placeholder="Phone Number" id="phone" name="phone" />
            {/* <label htmlFor="password">password</label> */}
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
            {/* <label htmlFor="passwordConfirm">confirm password</label> */}
            <input value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} type="password" placeholder="Confirm Password" id="passwordConfirm" name="passwordConfirm" />
            <button type="submit" className="sub-btn">Sign Up</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login <font color="red">here</font></button>
    </div>
    )
}
