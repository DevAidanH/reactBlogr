import React, { useState } from "react";
import {auth, provider} from "../firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({setIsAuth}){

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState("");

    const signInWithEmail = () =>{
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        }).catch((error) => {
            setLoginError(getFriendlyError(error.code));
        })
    }

    //Parse default Firebase errors for UI
    const getFriendlyError = (code) => {
        switch (code) {
            case "auth/user-not-found":
                return "No account found with this email.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/invalid-credential":
                return "Invalid credentials. Please try again";
            case "auth/too-many-requests":
                return "Too many attempts. Please try again later.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };
    

    return <div className="loginPage">
        <Link to="/">Home</Link>
        <h1>Admin Log In</h1>
        <label>Email</label>
        <input placeholder="Email..." onChange={(event) => {setEmail(event.target.value)}}/><br/>
        <label>Password</label>
        <input placeholder="Password..." type="password" onChange={(event) => {setPassword(event.target.value)}}/>
        <button onClick={signInWithEmail}>
            Log in
        </button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>;
}

export default Login;