import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../UI/firebaseConfig";


const SignIn = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () =>{
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
    }   catch (error){
        console.log(error.message);
    }
    };

    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <form action="/dashboard" className={"form-style"} >
                            <p>
                                <label>Email address</label><br/>
                                <input type="text"
                                 placeholder="Enter email..." onChange={(event) =>{
                                     setLoginEmail(event.target.value);
                                }} required />
                            </p>
                            <p >
                                <label>Password</label>
                                <br/>
                                <input type="password" placeholder="Enter password..." onChange={(event) =>{
                                    setLoginPassword(event.target.value);
                                }}  required />
                            </p>
                            <p>
                                <button id="sub_btn" type="submit" onClick={login}>Login</button>
                            </p>
                        </form >
                        <footer>
                            <p className="words-color">First time? <Link to="/reg" className="words-color">Create an account</Link></p>
                        </footer>
                    </div>
                </div>
            </div>


        </>

    );
};

export default SignIn;


/***                 <div className="bg-image"/>
 <Particle/> ***/