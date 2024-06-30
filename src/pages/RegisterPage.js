import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate()

    function registerUser() {

        const userData = {
            name: userName,
            passwordOne: password,
            passwordTwo: passwordConfirmation
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }

        fetch("http://167.99.138.67:1111/createaccount", options)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setErrorMessage(res.message);
            })

    }
    return (
        <div>
            <div className="form text-center p-3">
                <h2>Register</h2>
                <input type="text" placeholder="Enter Your Name"
                       value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Create password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Repeat Your password"
                       value={passwordConfirmation}
                       onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                <div>{errorMessage}</div>
                <button onClick={registerUser}>Register</button>
            </div>
        </div>
    );
};

export default RegisterPage;