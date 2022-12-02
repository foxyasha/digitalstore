import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../UI/firebaseConfig";


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  const [value, setValue] = useState('')



  return(

  <>
    <Header/>
    <div className="bg-image" >
      <Particle/>
      <div className={"center-blur"}>
        <div>
          <h3 className={"words-color"}>Create your account</h3>
          <form className={"form-style"}>
            <p>
              <label>Username</label><br/>
              <input type="text" placeholder="Enter username..." value={name} onChange={(e)=>setName(e.target.value)} required />
            </p>
            <p>
              <label>Store username</label><br/>
              <input type="text" value={value} onChange={event => setValue(event.target.value)} maxLength="8" placeholder="Enter username..."  required />
            </p>
            <p><span>https://payit.com/<span></span>{value}</span></p>
            <p>
              <label>Email address</label><br/>
              <input type="email" placeholder="Enter email address..." value={email} onChange={(e)=> setEmail(e.target.value)} required />
            </p>
            <p>
              <label>Password</label><br/>
              <input type="password" placeholder="Enter password..." value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </p>
            <p>
              <button id="sub_btn" onClick={register}>Register</button>
            </p>
          </form>
          <footer>
            <p className="words-color">Already have an account? <Link className="words-color" to="/login">Sign in</Link></p>
            <p><Link className="words-color" to="/">Back to Homepage</Link></p>
          </footer>
        </div>
      </div>
    </div>
  </>

  );
};

export default SignUp;