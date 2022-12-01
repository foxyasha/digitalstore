import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import { Authorization } from '../UI/Authorization';



const SignIn = () => {
    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <form action="/home" className={"form-style"} >
                            <p>
                                <label>Email address/username</label><br/>
                                <input type="text" placeholder="Enter email/username..."  required />
                            </p>
                            <p >
                                <label>Password</label>
                                <br/>
                                <input type="password" placeholder="Enter password..."  required />
                            </p>
                            <p  >
                                <button id="sub_btn" type="submit">Login</button>
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