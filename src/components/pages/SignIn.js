import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import { auth, logInWithEmailAndPassword } from "../UI/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";


function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <h3 className={"words-color"}>Login into your account</h3>
                        <form  className={"form-style"} >
                            <p>
                                <label>Email address</label><br/>
                                <input type="text"
                                 placeholder="Enter email..." value={email} onChange={(e)=> setEmail(e.target.value)}
                                       required />
                            </p>
                            <p >
                                <label>Password</label>
                                <br/>
                                <input type="password" placeholder="Enter password..." value={password} onChange={(e)=> setPassword(e.target.value)}
                                       required />
                            </p>
                            <p>
                                <button id="sub_btn" onClick={()=> logInWithEmailAndPassword(email, password)}>Login</button>
                            </p>
                        </form >
                        <footer>
                            <p className="words-color">Forgot your password? <Link to="/reset" className="words-color">Reset Password</Link></p>
                            <p className="words-color">First time? <Link to="/reg" className="words-color">Create an account</Link></p>
                        </footer>
                    </div>
                </div>
            </div>


        </>

    );
};

export default SignIn;

