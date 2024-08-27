// src/LoginPage.js
"use client";


import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleClick(e){
        if (email === '' || password === '') {
            setError('Please fill in all fields.');
        } else {
            setError('');
            alert(`*Email: ${email}\n*Password: ${password}`)
        }
    }

    return (
        <div className="gaming-login-container">
            <h2>Login</h2>
            <div className="form-group">
                <label>Email:</label>
                <input
                    id='email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <LoginButton func={handleClick} />
        </div>
    );
}

function LoginButton({ func }){
    return ( 
        <button onClick={func} className='loginButtonSus'>Login</button>
    )
}

export default LoginPage
