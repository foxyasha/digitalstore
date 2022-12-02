import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../UI/firebaseConfig";


const SignUp = () => {
  const [value, setValue] = useState('')
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const register = async () =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user)
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
          <h3 className={"words-color"}>Create your account</h3>
          <form action="/dashboard" className={"form-style"}>
            <p>
              <label>Username</label><br/>
              <input type="text" placeholder="Enter username..." required />
            </p>
            <p>
              <label>Store username</label><br/>
              <input type="text" value={value} onChange={event => setValue(event.target.value)} maxLength="8" placeholder="Enter username..."  required />
            </p>
            <p><span>https://payit.com/<span></span>{value}</span></p>
            <p>
              <label>Email address</label><br/>
              <input type="email" placeholder="Enter email address..." onChange={(event)=>{
                setRegisterEmail(event.target.value);
              }} required />
            </p>
            <p>
              <label>Password</label><br/>
              <input type="password" placeholder="Enter password..." onChange={(event)=>{
                setRegisterPassword(event.target.value);
              }}  required />
            </p>
            <p>
              <button id="sub_btn" type={"submit"} onClick={register} >Register</button>
            </p>
          </form>
          <footer>
            <p><Link className="words-color" to="/login">Sign in</Link></p>
            <p><Link className="words-color" to="/">Back to Homepage</Link>.</p>
          </footer>
        </div>
      </div>
    </div>
  </>

  );
};

export default SignUp;