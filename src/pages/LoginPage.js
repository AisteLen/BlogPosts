import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const LoginPage = ({setLog}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const nav = useNavigate()

    function loginUser() {

        const userData = {
            name: userName,
            password: password
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }

        fetch("http://167.99.138.67:1111/login", options)
            .then(res => res.json())
            .then(res => {
                console.log(res)

                if (res.success) {
                    localStorage.setItem("secretKey", res.secretKey);
                    localStorage.setItem("name", userName);
                    setLog(userData.name)
                    nav('/')
                } else {
                    setErrorMessage(res.message);
                }

            })

    }
    return (
        <div>
            <div className="form text-center">
                <h2>Login</h2>
                <input type="text" placeholder="Enter Your Name"
                       value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Create password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <div>{errorMessage}</div>
                <button onClick={loginUser}>Login</button>

            </div>
        </div>
    );
};

export default LoginPage;
